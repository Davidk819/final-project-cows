import React, { useState } from 'react';

const TableExample = () => {
  const [selectedNumber, setSelectedNumber] = useState(2);

  const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleNumberClick = (number: number) => {
    console.log(selectedNumber);
    setSelectedNumber(number);
  };

  return (
    <>
    <div className="grid grid-cols-5 gap-1">
      {numbersArray.map((number) => (
        <div
          key={number}
          className="relative"
          onClick={() => handleNumberClick(number)}
        >
          <div
            className={`cursor-pointer border p-1 ${
              selectedNumber === number ? 'bg-gray-200' : ''
            } text-center`}
          >
            {number}
          </div>
          <div className="absolute inset-0 border border-black opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
      ))}

    </div>
      {selectedNumber !== null && (
        <div className="mt-4 border p-1 bg-blue-100 text-center"> Number  {selectedNumber}</div>
      )}
    </>
  );
};

export default TableExample;


