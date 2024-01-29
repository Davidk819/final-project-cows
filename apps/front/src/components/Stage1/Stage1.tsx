import React, { useState } from 'react';
import { trpc } from '../../trpcClient';
import LinearProgress from '@mui/material/LinearProgress';
import { Alert } from '@mui/material';

export default function Stage1() {
  const [numberInput, setNumberInput] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState<string>('');
  const [noteStatus, setNoteStatus] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberInput(event.target.value);
    setSelectedStatus('');
  };

  const handleButtonClick = (status: string) => {
    if (numberInput) {
      setSelectedStatus(status);
    }
  };

  const handleSaveClick = async () => {
    if (selectedStatus) {
      setIsLoading(true);
      const newCow = await trpc.addCow.mutate({
        status: selectedStatus,
        cow_num: parseInt(numberInput),
      });
      console.log(newCow.res_status);
      setNoteStatus(newCow.res_status);
      setNote(newCow.massege);
      const newNumberInput = (parseInt(numberInput) + 1).toString();
      setNumberInput(newNumberInput);
      setSelectedStatus('');
      setIsLoading(false);
    }
  };
  if (isLoading) return <LinearProgress />;

  const handleNote = () => {
    if(noteStatus === 200) return <Alert severity="success">{note}</Alert>
    else if(noteStatus === 400) return <Alert  severity="error">{note}</Alert>
    else return 
  }

  return (
    <div>
      <div className="flex flex-col items-center  bg-gray-100 min-h-11">
        <div className="mt-8 mb-11 p-8 bg-white rounded-md shadow-md w-full max-w-2xl">
          <div className="flex flex-col items-center mb-4">

            <div
              className={`rounded-lg p-4 text-4xl mb-4 ${
                numberInput &&
                (() => {
                  switch (selectedStatus) {
                    case 't':
                      return 'bg-red-400';
                    case 'k':
                      return 'bg-cyan-400';
                    case 'kPlus':
                      return 'bg-blue-500';
                    default:
                      return '';
                  }
                })()
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
                
              </label>
              <input
                type="number"
                name="number"
                id="number"
                placeholder='  הכנס מספר בהמה '
                value={numberInput}
                onChange={handleInputChange}
                className="w-1/2 sm:w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 mt-2 mb-4"
              />
            </div>
            <div>
              {}
            </div>
              <div className='mb-3'>
                  {handleNote()}
                </div>

            <div className="flex flex-row space-x-4">
              <button
                onClick={() => handleButtonClick('t')}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-red transition duration-300"
              >
                טרף
              </button>
              <button
                onClick={() => handleButtonClick('k')}
                className="bg-cyan-400	 hover:bg-cyan-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue transition duration-300"
              >
                כשר שחיטה
              </button>
              <button
                onClick={() => handleButtonClick('kPlus')}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue transition duration-300"
              >
                כשר
              </button>
            </div>
          </div>
          <button
            id="save-button"
            onClick={handleSaveClick}
            className="border-solid  bg-zinc-400 hover:bg-zinc-600 border-indigo-600 w-full px-4 py-2"
          >
            שמירה
          </button>
        </div>
      </div>
    </div>
  );
}
