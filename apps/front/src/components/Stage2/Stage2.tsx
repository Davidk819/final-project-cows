import React, { useEffect, useState } from 'react';

import ImageBoard from '../ImageBoard/ImageBoard';
import Table from '../Table/Table';
import { trpc } from '../../trpcClient';
// import { CowNumber } from '../typs';

export default function Stage2() {
  const [numberInput, setNumberInput] = useState<string>('');
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [KosherList, setKosherList] = useState<number[]>([]);
  const [KosherList1, setKosherList1] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await trpc.getAllByStage.query(2);
        if (newData) setKosherList(newData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [KosherList1]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberInput(event.target.value);
    setSelectedNumber(parseInt(event.target.value));
  };

  const handleSetT = async () => {
    if (selectedNumber) {
      await trpc.setTaref.mutate({ stage: 2, cow_num: selectedNumber });
      setKosherList1(!KosherList1);
      setSelectedNumber(0);
    }
  };
  const handleKPllus = async () => {
    if (selectedNumber) {
      await trpc.setFinalStatus.mutate({
        status: 'kPlus',
        cow_num: selectedNumber,
      });
      setKosherList1(!KosherList1);
      setSelectedNumber(0);
    }
  };
  const handleK = async () => {
    if (selectedNumber) {
      await trpc.setFinalStatus.mutate({
        status: 'k',
        cow_num: selectedNumber,
      });
      setKosherList1(!KosherList1);
      setSelectedNumber(0);
    }
  };
  const handlSave = async () => {
    if (selectedNumber !== 0) {
      await trpc.moveStage.mutate({
        cow_num: selectedNumber,
        stage: 3,
        image: imageUrl,
      });
      setKosherList1(!KosherList1);
      setImageUrl('');
      setSelectedNumber(0);
    }
  };
  const handlenumberClick = async (number: number) => {
    try {
      const data = await trpc.getCowData.mutate(number);
      if (data) {
        setStatus(data.status);
        console.log(data.status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="w-full max-w-md">
        <label
          htmlFor="number"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Number
        </label>
        <input
          type="number"
          name="number"
          id="number"
          value={numberInput}
          onChange={handleInputChange}
          className="w-1/2 sm:w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 mt-2 mb-4"
        />
      </div>
      <Table
        selectedNumber={selectedNumber}
        KosherNumbers={KosherList}
        setNum={setSelectedNumber}
        handlenumberClick={handlenumberClick}
      ></Table>
      {selectedNumber !== 0 && (
        <ImageBoard
          handleSave={handlSave}
          setImageUrl={setImageUrl}
        ></ImageBoard>
      )}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={handleSetT}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-red transition duration-300"
        >
          T
        </button>
        <button
          onClick={handlSave}
          className="bg-teal-400		 hover:bg-teal-600	 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue transition duration-300"
        >
          Move to stage 3
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
