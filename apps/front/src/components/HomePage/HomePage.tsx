import {  useState } from 'react';
import { trpc } from '../../trpcClient';
import CircularProgress from '@mui/material/CircularProgress';

interface dayData {
  date: string
  kPlus_sum: number;
  k_sum: number;
  t1: number;
  t2: number;
  t3: number;
  updatedAt: string;
  createdAt: string;
}

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState<dayData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleGetData = async () => {
    try {
      if (selectedDate) {
        setIsLoading(true)
        setData(null)
        const dayData = await trpc.getDayData.query(selectedDate);
        if(dayData)  {
          setData(dayData);
          setIsLoading(false)
        } else {
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  // flex flex-col items-center  bg-gray-100 min-h-11
  return (
    <div className="flex flex-col items-center justify-center  space-y-4">
      <p className="text-2xl ...">מידע יומי</p>
      {isLoading ? <CircularProgress/> : 
      <div className="bg-gray-100 p-8 rounded-md shadow-md">
        <label htmlFor="datePicker" className="block text-lg font-semibold mb-2">
          בחר תאריך:
        </label>
        <input
          type="date"
          id="datePicker"
          name="selectedDate"
          value={selectedDate}
          onChange={handleDateChange}
          className="w-full border p-2 rounded-md"
        />
      </div>
      }

      <button
        onClick={handleGetData}
        className="bg-cyan-400 hover:bg-cyan-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue transition duration-300"
      >
        Get Data
      </button >
      {data && 
      <div>
            סה"כ   :
        {data.t1 + data.t2 + data.t3 + data.k_sum + data.kPlus_sum}
      </div>
         }
      <div className='max-w-10'>
        
      <table className=" bg-white border border-gray-300 ">
        <thead>
          <tr>
            <th className="py-2 px-4 border">תאריך</th>
            <th className="py-2 px-4 border">חלק</th>
            <th className="py-2 px-4 border">כשר</th>
            <th className="py-2 px-4 border">טרף שחיטה</th>
            <th className="py-2 px-4 border">טרף פנים</th>
            <th className="py-2 px-4 border">טרף חוץ</th>

          </tr>
        </thead>
        <tbody>
          {data && 
            <tr>
              <td className="py-2 px-4 border">{data.date}</td>
              <td className="py-2 px-4 border">{data.kPlus_sum}</td>
              <td className="py-2 px-4 border">{data.k_sum}</td>
              <td className="py-2 px-4 border ">{data.t1}</td>
              <td className="py-2 px-4 border">{data.t2}</td>
              <td className="py-2 px-4 border">{data.t3}</td>
            </tr>
          }
        </tbody>
      </table>

      </div>

    </div>
  );
}
