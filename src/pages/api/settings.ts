import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      user_id,
      profile_type,
      wife_lastname_preference,
      ...profileData
    } = req.body;

    if (!user_id || !profile_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Update profile in Supabase
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: user_id,
        profile_type,
        wife_lastname_preference, // Use the correct variable name
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    return res.status(200).json({ data });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}