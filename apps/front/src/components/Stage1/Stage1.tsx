import React, { useEffect, useRef, useState, useContext } from 'react';

import ImageBoard from '../ImageBoard/ImageBoard';
import Headers2 from '../Headers2/Headers2';
import TableExample from '../Table/Table';

export default function Stage1() {
  const [numberInput, setNumberInput] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberInput(event.target.value);
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
      <TableExample></TableExample>
      <ImageBoard></ImageBoard>
    </div>
  );
}
