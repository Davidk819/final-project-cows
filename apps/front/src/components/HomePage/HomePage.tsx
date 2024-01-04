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
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  if (!data) return <div>err</div>;

  return (
    <>
      <Headers2></Headers2>
      <div className=" flex flex-col">
        <div>{data[0].caw_num}</div>
        <div className="flex-1 flex flex-wrap justify-center ">
          {data.map((num) => (
            <div key={num.enter_time}>
              <CowCard key={num.enter_time} cowProps={num}></CowCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
  
}
