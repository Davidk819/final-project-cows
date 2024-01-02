import React, { useState } from 'react';
import Headers2 from '../Headers2/Headers2';

export default function Stage3() {
  const [cawStatus, setCawStatus] = useState('');
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = (id: string) => {
    setCawStatus(id);
  };

  const handleSaveClick = () => {
    setCawStatus('');
  };

  return (
    <div>
    <Headers2></Headers2>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="mt-8 p-8 bg-white rounded-md shadow-md w-full max-w-2xl">
        <div className="flex flex-col items-center mb-4">
          <div
            className={`rounded-lg p-4 text-4xl mb-4 ${
              cawStatus === 't' ? 'bg-red-200' : cawStatus === 'k' ? 'bg-emerald-200' : ''
            }`}
          >
            {inputValue}
          </div>
          <img
                    className="h-8 w-auto rounded-full"
                    src="https://as2.ftcdn.net/v2/jpg/00/51/47/41/1000_F_51474102_UEXRLTDrKHh5nU4HSQ9RFhzlwDytW76r.jpg"
                    alt="Your Company"
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
              value={inputValue}
              onChange={handleInputChange}
              className="w-1/2 sm:w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 mt-2 mb-4"
            />
          </div>

          <div className="flex flex-row space-x-4">
            <button
              id="t"
              onClick={() => handleButtonClick('t')}
              className="border-solid border-2 bg-red-200 border-indigo-600 w-1/2 px-4 py-2"
            >
              T
            </button>
            <button
              id="k"
              onClick={() => handleButtonClick('k')}
              className="border-solid border-2 bg-emerald-200 border-indigo-600 w-1/2 px-4 py-2"
            >
              K
            </button>
          </div>
        </div>
        <button
          id="k"
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
