import supabase from '../../src/lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('Lounges').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
