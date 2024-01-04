import React, {  useEffect, useState } from 'react';

import ImageBoard from '../ImageBoard/ImageBoard';
import Headers2 from '../Headers2/Headers2';
import Table from '../Table/Table';
import { trpc } from '../../trpcClient';
import { CowNumber } from '../typs';

export default function Stage1() {
  const [numberInput, setNumberInput] = useState<string>('');
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [KosherList, setKosherList] = useState<number[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await trpc.getKosherNumbers.query();
        setKosherList(newData)
        console.log(newData);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberInput(event.target.value);
    setSelectedNumber(parseInt(event.target.value))
  };


  return (
    <div>
      <Headers2></Headers2>
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
      <Table selectedNumber={selectedNumber} KosherNumbers={KosherList} setNum={setSelectedNumber}></Table>
      <ImageBoard></ImageBoard>
    </div>
  );
}
