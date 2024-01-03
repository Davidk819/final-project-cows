import { useEffect, useState } from 'react';
import { trpc } from '../../trpcClient';
import Headers2 from '../Headers2/Headers2';
import { CowNumber } from '../typs';
import CowCard from '../CawCard/CawCard';



export default function HomePage() {
  const [data, setData] = useState<CowNumber[]>([] || null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = (await trpc.getAll.query()) as unknown as CowNumber[];
        console.log(newData);
        if (newData) {
          setData(newData);
        }
      } catch {}
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Headers2></Headers2>
      <CowCard cowProps={data[0]} ></CowCard>

      <div className="flex-1 flex justify-center items-center">
        {data.map((num) => (
          <div
            key={num.cow_id}
            className="flex-col border border-solid border-black p-4 bg-slate-100 m-8"
          >
            <h1>Number: {num.cow_num}</h1>
            <h2>Status: {num.status}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
