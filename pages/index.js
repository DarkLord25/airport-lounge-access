import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [lounges, setLounges] = useState([]);

  useEffect(() => {
    axios.get('/api/lounges').then((res) => setLounges(res.data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Airport Lounges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lounges.map((lounge) => (
          <div key={lounge.id} className="border p-4 rounded shadow">
            <h2 className="text-xl">{lounge.name}</h2>
            <p>{lounge.airport} - ${lounge.price}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
