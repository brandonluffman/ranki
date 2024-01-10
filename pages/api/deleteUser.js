// pages/api/deleteUser.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  const { userId } = req.body;

  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      throw error;
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: error.message });
  }
}
