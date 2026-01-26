import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import Header from '@/components/Header'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Conversation {
  profile_id: string
  profile_type: string
  first_name: string
  last_name: string
  last_message: string
  last_message_time: string
  profile_image?: string
}

export default function MessagesPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth')
        return
      }
      setCurrentUser(session.user.id)
      fetchConversations(session.user.id)
    }

    checkAuth()
  }, [router])

  const fetchConversations = async (userId: string) => {
    try {
      // Get all messages where the current user is either sender or recipient
      // First, get all messages with their sender and recipient information
      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          sender_id,
          recipient_id
        `)
        .or('sender_id.eq.' + userId + ',recipient_id.eq.' + userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Get unique user IDs from messages
      const uniqueUserIds = new Set<string>()
      messages?.forEach(message => {
        if (message.sender_id !== userId) uniqueUserIds.add(message.sender_id)
        if (message.recipient_id !== userId) uniqueUserIds.add(message.recipient_id)
      })

      // Fetch profiles for all users in conversations
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id,
          type,
          first_name,
          last_name,
          profile_image
        `)
        .in('id', Array.from(uniqueUserIds))

      if (profilesError) throw profilesError

      // Create a map of profiles for easy lookup
      const profilesMap = new Map(profiles?.map(profile => [profile.id, profile]))

      // Process messages to get unique conversations
      const conversationsMap = new Map()
      
      messages?.forEach(message => {
        const otherUserId = message.sender_id === userId ? message.recipient_id : message.sender_id
        const profile = profilesMap.get(otherUserId)

        if (!conversationsMap.has(otherUserId) && profile) {
          conversationsMap.set(otherUserId, {
            profile_id: otherUserId,
            profile_type: profile.type,
            first_name: profile.first_name,
            last_name: profile.last_name,
            last_message: message.content,
            last_message_time: message.created_at,
            profile_image: profile.profile_image
          })
        }
      })

      setConversations(Array.from(conversationsMap.values()))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching conversations:', error)
      setLoading(false)
    }
  }

  if (!currentUser || loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-primary/10 to-primary/20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Messages</h2>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {conversations.map((conversation) => (
                <Button
                  key={conversation.profile_id}
                  variant="ghost"
                  className="w-full justify-start p-4 hover:bg-primary/5"
                  onClick={() => router.push(`/messages/${conversation.profile_id}`)}
                >
                  <div className="flex items-center gap-4 w-full">
                    <Avatar className="h-12 w-12 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {conversation.profile_image ? (
                          <AvatarImage 
                            src={conversation.profile_image} 
                            alt={`${conversation.first_name}'s profile`}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <AvatarFallback>
                            {conversation.first_name[0]}
                            {conversation.last_name[0]}
                          </AvatarFallback>
                        )}
                      </div>
                    </Avatar>
                    <div className="flex-1 min-w-0 grid grid-cols-[1fr,auto] gap-x-2 items-center">
                      <h3 className="font-semibold truncate">
                        {conversation.first_name} {conversation.last_name}
                      </h3>
                      <span className="text-xs text-muted-foreground row-span-2 self-center">
                        {new Date(conversation.last_message_time).toLocaleDateString()}
                      </span>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.last_message}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
              {conversations.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No messages yet. Start a conversation by browsing profiles!
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </main>
    </div>
  )
}