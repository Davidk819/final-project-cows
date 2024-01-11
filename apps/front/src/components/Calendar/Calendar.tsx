import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar2() {
  const [value, onChange] = useState<Value>(new Date());


  const handleC = () => {
    onChange(value)
    console.log(value);
    
  }
  return (
    <div>
      <Calendar onChange={handleC} value={value} />
    </div>
  );
}