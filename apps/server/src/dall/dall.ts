import { Cow } from '../configuretion/sequelizeSchima';
import { v4 as uuidv4 } from 'uuid';



export const insertNewCow = async (status: string, cawNum: number) => {
  try {
    await Cow.sync();
    const corent_time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const newCow  = await Cow.create(
      {
        cow_id: uuidv4(),
        enter_date: new Date(),
        enter_time: corent_time,
        cow_num: cawNum,
        status: status,
      },
      {
        fields: ['cow_id', 'enter_date', 'enter_time', 'cow_num', 'status'],
      }
    );

    return newCow;
  } catch (error) {
    console.error('Error creating cow:', error);
  }
};


export const getAll = async () => {
  try {
    const data = await Cow.findAll()
    return data
  } catch(err) {
    console.log(err);
  }
}
export const getKosherNumbersFromDB = async () => {
  try {
    const data = await Cow.findAll({
      where: {
        status: "k"
      }
    });
    return data
  } catch(err) {
    console.log(err);
  }
}
