import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import Header from '@/components/Header'
import Messages from '@/components/Messages'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function MessagesPage() {
  const router = useRouter()
  const { userId } = router.query
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth')
        return
      }
      setCurrentUser(session.user.id)
    }

    checkAuth()
  }, [router])

  if (!currentUser || !userId || typeof userId !== 'string') {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-primary/10 to-primary/20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Messages 
          recipientId={userId} 
          currentUserId={currentUser}
        />
      </main>
    </div>
  )
}