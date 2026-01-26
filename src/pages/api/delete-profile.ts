import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_id } = req.query;

    if (!user_id || typeof user_id !== 'string') {
      console.error('Delete profile error: No user_id provided');
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Delete from profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user_id);

    if (profileError) {
      console.error('Delete profile error:', profileError);
      return res.status(500).json({ error: 'Failed to delete profile' });
    }

    // Delete the user from auth.users
    const { error: authError } = await supabase.auth.admin.deleteUser(user_id);

    if (authError) {
      console.error('Delete auth user error:', authError);
      return res.status(500).json({ error: 'Failed to delete user authentication' });
    }

    return res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Delete profile error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}