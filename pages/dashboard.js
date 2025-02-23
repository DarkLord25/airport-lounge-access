import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../src/lib/supabase';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return router.push('/login');
      const { data, error } = await supabase
        .from('Bookings')
        .select('*, Lounges(name)')
        .eq('user_id', user.user.id);
      if (!error) setBookings(data);
    };
    fetchBookings();
  }, [router]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Bookings</h1>
      {bookings.map((booking) => (
        <div key={booking.id} className="border p-4 mb-2 rounded">
          <p>Lounge: {booking.Lounges.name}</p>
          <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
