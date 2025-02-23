import supabase from '../../src/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { loungeId, date } = req.body;
    const { user } = await supabase.auth.getUser(req.headers.authorization);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { data, error } = await supabase
      .from('Bookings')
      .insert({ user_id: user.id, lounge_id: loungeId, date });
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ message: 'Booking created' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
