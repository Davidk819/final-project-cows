import React, {  useEffect, useState } from 'react';

import ImageBoard from '../ImageBoard/ImageBoard';
import Headers2 from '../Headers2/Headers2';
import Table from '../Table/Table';
import { trpc } from '../../trpcClient';
// import { CowNumber } from '../typs';

export default function Stage2() {
  const [numberInput, setNumberInput] = useState<string>('');
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [KosherList, setKosherList] = useState<number[]>([])
  const [KosherList1, setKosherList1] = useState(true)
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await trpc.getAllByStage.query(2);
        console.log(newData);
        setKosherList(newData)

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [KosherList1]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberInput(event.target.value);
    setSelectedNumber(parseInt(event.target.value))
  };

  const handleSetT = async () => {
    await trpc.setTaref.mutate({stage: 2, cow_num: selectedNumber})
    setKosherList1(!KosherList1)
  }
  const handleKPllus = async () => {
    await trpc.setFinalStatus.mutate({status: 'kPlus', cow_num: selectedNumber})
    setKosherList1(!KosherList1)
  }
  const handlSave = async () => {
    console.log(imageUrl,"sdsd");
    
    await trpc.moveStage.mutate({status: 'kPlus', cow_num: selectedNumber, stage:3, image: imageUrl})
  }
  
  return (
    <div>
      <Headers2></Headers2>
      {imageUrl}
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
      <div className="flex space-x-4">

    </div>
      <Table selectedNumber={selectedNumber} KosherNumbers={KosherList} setNum={setSelectedNumber}></Table>
      <ImageBoard handleSave={handlSave} setImageUrl={setImageUrl}></ImageBoard>
      <button onClick={handleSetT} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-red">
        T
      </button>
      <button onClick={handleKPllus} className="bg-blue-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-red">
        K+
      </button>
    </div>
  );
}
