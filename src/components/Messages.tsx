import { useState, useEffect, useRef } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Message {
  id: string
  sender_id: string
  recipient_id: string
  content: string
  created_at: string
  read_at: string | null
}

interface Profile {
  id: string
  first_name: string
  last_name: string
  profile_image?: string
}

interface MessagesProps {
  recipientId: string
  currentUserId: string
}

export default function Messages({ recipientId, currentUserId }: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(null)
  const [recipientProfile, setRecipientProfile] = useState<Profile | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const fetchProfiles = async () => {
    try {
      // Fetch both profiles in parallel
      const [currentUserResult, recipientResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('id, first_name, last_name, profile_image')
          .eq('id', currentUserId)
          .single(),
        supabase
          .from('profiles')
          .select('id, first_name, last_name, profile_image')
          .eq('id', recipientId)
          .single()
      ])

      if (currentUserResult.error) throw currentUserResult.error
      if (recipientResult.error) throw recipientResult.error

      setCurrentUserProfile(currentUserResult.data)
      setRecipientProfile(recipientResult.data)
    } catch (error) {
      console.error('Error fetching profiles:', error)
    }
  }

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(
          'and(sender_id.eq.' + currentUserId + ',recipient_id.eq.' + recipientId + '),' +
          'and(sender_id.eq.' + recipientId + ',recipient_id.eq.' + currentUserId + ')'
        )
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])
      // Scroll to bottom after messages are loaded
      setTimeout(scrollToBottom, 100)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  useEffect(() => {
    fetchMessages()
    fetchProfiles()

    // Subscribe to new messages
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `recipient_id=eq.${currentUserId}`
        }, 
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message])
          // Scroll to bottom when new message arrives
          setTimeout(scrollToBottom, 100)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [currentUserId, recipientId])

  // Effect to scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: currentUserId,
            recipient_id: recipientId,
            content: newMessage.trim(),
          }
        ])

      if (error) throw error
      setNewMessage('')
      fetchMessages()
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (profile: Profile | null) => {
    if (!profile) return '??'
    return `${profile.first_name[0]}${profile.last_name[0]}`
  }

  return (
    <Card className="w-full max-w-2xl mx-auto p-4">
      <ScrollArea className="h-[400px] mb-4 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                message.sender_id === currentUserId ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <Avatar className="h-8 w-8">
                {message.sender_id === currentUserId ? (
                  currentUserProfile?.profile_image ? (
                    <AvatarImage 
                      src={currentUserProfile.profile_image} 
                      alt={`${currentUserProfile.first_name}'s profile`}
                    />
                  ) : (
                    <AvatarFallback>{getInitials(currentUserProfile)}</AvatarFallback>
                  )
                ) : (
                  recipientProfile?.profile_image ? (
                    <AvatarImage 
                      src={recipientProfile.profile_image} 
                      alt={`${recipientProfile.first_name}'s profile`}
                    />
                  ) : (
                    <AvatarFallback>{getInitials(recipientProfile)}</AvatarFallback>
                  )
                )}
              </Avatar>
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender_id === currentUserId
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{message.content}</p>
                <span className="text-xs opacity-70">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
        </div>
      </ScrollArea>
      
      <form onSubmit={sendMessage} className="flex gap-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          Send
        </Button>
      </form>
    </Card>
  )
}