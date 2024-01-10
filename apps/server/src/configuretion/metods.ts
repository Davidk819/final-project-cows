import { DaySum } from "./sequelizeSchima";

export const date = () => {
  const thisDate = new Date();
  const year = thisDate.getFullYear();
  const month = String(thisDate.getMonth() + 1).padStart(2, '0'); // הוספת 0 במקרה של חודש בודד
  const day = String(thisDate.getDate()).padStart(2, '0'); // הוספת 0 במקרה של יום בודד

  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);
  return formattedDate;
};
export const createDay = async () => {
    await DaySum.sync()
    await DaySum.create({
      date: date(),
      k_sum: 0,
      kPlus_sum: 0,
      t1:0,
      t2:0,
      t3:0
    },
    {
      fields:['date', 'k_sum', 'kPlus_sum', 't1', 't2','t3']
    })
    
  }