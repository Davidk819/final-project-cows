import '../../styles.css';
import { useEffect, useState } from 'react';
import { trpc } from '../../trpcClient';
import Table from '../Table/Table';

export default function Stage3() {
  const [list, setList] = useState<number[]>([]);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [KosherList1, setKosherList1] = useState(true);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await trpc.getAllByStage.query(3);
        console.log(newData);
        if(newData)
        setList(newData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [KosherList1]);

  const handlenumberClick = async (number: number) => {
    try {
      const data = await trpc.getCowData.mutate(number);
      if (data) {
        setImageUrl(data.img);
        setStatus(data.status);
        console.log(data.status);
        
      } else {
        setImageUrl('');
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSetT = async () => {
    await trpc.setTaref.mutate({ stage: 3, cow_num: selectedNumber });
    setKosherList1(!KosherList1);
    setImageUrl('');
  };
  const handleKPllus = async () => {
    await trpc.setFinalStatus.mutate({
      status: 'kPlus',
      cow_num: selectedNumber,
    });
    setKosherList1(!KosherList1);
    setImageUrl('');
  };
  const handleK = async () => {
    await trpc.setFinalStatus.mutate({
      status: 'k',
      cow_num: selectedNumber,
    });
    setKosherList1(!KosherList1);
    setImageUrl('');
  };

  return (
    <div>
 
      <Table
        selectedNumber={selectedNumber}
        KosherNumbers={list}
        setNum={setSelectedNumber}
        handlenumberClick={handlenumberClick}
      ></Table>

      <div className="flex justify-center items-center gap-4 border-2">
        stage2
      </div>
      {imageUrl && <img src={imageUrl} alt="תמונה" />}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={handleSetT}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-red transition duration-300"
        >
          T
        </button>
        <button
          onClick={handleK}
          className="bg-cyan-400	 hover:bg-cyan-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue transition duration-300"
        >
          K
        </button>
        {status === 'kPlus' && (
          <button
            onClick={handleKPllus}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue transition duration-300"
          >
            K+
          </button>
        )}
      </div>
    </div>
  );
}
