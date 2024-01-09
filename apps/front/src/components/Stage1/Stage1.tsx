import React, { useState } from 'react';
import Headers2 from '../Headers2/Headers2';
import { trpc } from '../../trpcClient';

export default function Stage1() {
  const [numberInput, setNumberInput] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberInput(event.target.value);
  };

  const handleButtonClick = (status: string) => {
    setSelectedStatus(status);
  };

  const handleSaveClick = async () => {
    const newCow = await trpc.addCow.mutate({
      status: selectedStatus,
      cow_num: parseInt(numberInput),
    });
    console.log(newCow);
    const newNumberInput = (parseInt(numberInput) + 1).toString();
    setNumberInput(newNumberInput);
    setSelectedStatus('');
  };

  return (
    <div>
      <Headers2></Headers2>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="mt-8 p-8 bg-white rounded-md shadow-md w-full max-w-2xl">
          <div className="flex flex-col items-center mb-4">
            <div
              className={`rounded-lg p-4 text-4xl mb-4 ${
                selectedStatus === 't'
                  ? 'bg-red-200'
                  : selectedStatus === 'k' || selectedStatus === 'kPlus'
                  ? 'bg-emerald-200'
                  : ''
              }`}
            >
              {numberInput}
            </div>
            <img
              className="h-8 w-auto rounded-full"
              src="https://as2.ftcdn.net/v2/jpg/00/51/47/41/1000_F_51474102_UEXRLTDrKHh5nU4HSQ9RFhzlwDytW76r.jpg"
              alt="Your Company Logo"
            />

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

            <div className="flex flex-row space-x-4">
            <button
          onClick={() => handleButtonClick('t')}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-red transition duration-300"
        >
           T
        </button>
              <button
                onClick={() => handleButtonClick('k')}
                className="bg-cyan-400	 hover:bg-cyan-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue transition duration-300"
              >
                K
              </button>
              <button
                onClick={() => handleButtonClick('kPlus')}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue transition duration-300"
              >
                K+
              </button>
            </div>
          </div>
          <button
            id="save-button"
            onClick={handleSaveClick}
            className="border-solid border-2 bg-zinc-500 border-indigo-600 w-full px-4 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
