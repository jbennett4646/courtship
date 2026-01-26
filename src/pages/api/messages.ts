import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const { data: messages, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        return res.status(200).json(messages)
      } catch (error) {
        return res.status(500).json({ error: 'Error fetching messages' })
      }

    case 'POST':
      try {
        const { recipient_id, content } = req.body
        const { data: userSession } = await supabase.auth.getSession()
        
        if (!userSession?.session?.user?.id) {
          return res.status(401).json({ error: 'Unauthorized' })
        }

        const { data, error } = await supabase
          .from('messages')
          .insert([
            {
              sender_id: userSession.session.user.id,
              recipient_id,
              content,
            }
          ])
          .select()

        if (error) throw error
        return res.status(200).json(data)
      } catch (error) {
        return res.status(500).json({ error: 'Error sending message' })
      }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}