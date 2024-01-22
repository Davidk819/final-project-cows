import { useState } from 'react';
import { trpc } from '../../trpcClient';
import CircularProgress from '@mui/material/CircularProgress';

interface dayData {
  date: string;
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
        setIsLoading(true);
        setData(null);
        const dayData = await trpc.getDayData.query(selectedDate);

        if (dayData) {
          setData(dayData);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4 lg:w-1/2 xl:w-1/3">
      <p className="text-2xl lg:text-4xl ...">מידע יומי</p>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="bg-gray-100 p-8 rounded-md shadow-md">
          <label htmlFor="datePicker" className="block text-lg font-semibold mb-2 mt-4">
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
      )}

      <button
        onClick={handleGetData}
        disabled={!selectedDate}
        className="bg-cyan-400 hover:bg-cyan-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue transition duration-300"
      >
        Get Data
      </button>

      <table className="min-w-full bg-white border border-gray-300 rounded-md mt-4">
        <thead>
          <tr>
            <th className="p-2 border">תאריך</th>
            <th className="p-2 border">חלק</th>
            <th className="p-2 border">כשר</th>
            <th className="p-2 border">ט שחיטה</th>
            <th className="p-2 border">ט פנים</th>
            <th className="p-2 border">ט חוץ</th>
            <th className="p-2 border">סהכ</th>
          </tr>
        </thead>
        <tbody>
          {data && (
            <tr>
              <td className="p-2 border">{data.date}</td>
              <td className="p-2 border">{data.kPlus_sum}</td>
              <td className="p-2 border">{data.k_sum}</td>
              <td className="p-2 border">{data.t1}</td>
              <td className="p-2 border">{data.t2}</td>
              <td className="p-2 border">{data.t3}</td>
              <td className="p-2 border">
                {data.t1 + data.t2 + data.t3 + data.k_sum + data.kPlus_sum}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
