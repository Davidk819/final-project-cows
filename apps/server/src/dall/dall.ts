// import { handleImageUpload, uploadImage } from '../configuretion/imgbb';
import { date } from '../configuretion/metods';
import { Cow, DaySum } from '../configuretion/sequelizeSchima';
import { v4 as uuidv4 } from 'uuid';

export const insertNewCow = async (status: string, cawNum: number) => {
  try {
    await Cow.sync();
    let stage = 0;

    const corent_time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (status === 't') await incrementValue(`t1`);
    status === 'k' || status === 'kPlus' ? (stage = 2) : (stage = -1);
    const newCow = await Cow.create(
      {
        cow_id: uuidv4(),
        enter_date: new Date(),
        enter_time: corent_time,
        cow_num: cawNum,
        status: status,
        stage: stage,
      },
      {
        fields: [
          'cow_id',
          'enter_date',
          'enter_time',
          'cow_num',
          'status',
          'stage',
        ],
      }
    );

    return newCow;
  } catch (error) {
    console.error('Error creating cow:', error);
  }
};

export const getAll = async () => {
  try {
    const data = await Cow.findAll();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getKosherNumbersFromDB = async () => {
  try {
    const data = await Cow.findAll({
      where: {
        status: 'k',
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getNumbersByStageFromDB = async (stage: number) => {
  try {
    const data = await Cow.findAll({
      where: {
        stage: stage,
        enter_date: date(),
      },
    });
    return data.map((cow) =>  cow.dataValues.cow_num);
  } catch (err) {
    console.log(err);
  }
};

export const moveStageDB = async (
  stage: number,
  cow_num: number,
  image: string
) => {
  try {
    const b = image;
    console.log(b);

    await Cow.update(
      { stage: stage, rea_img: image },
      {
        where: {
          cow_num: cow_num,
          enter_date: date(),
        },
      }
    );
  } catch (error) {
    console.error('Error updating stage:', error);
  }
};

export const setTarefInDB = async (
  stage: number,
  cow_num_for_update: number
) => {
  try {
    await createNewDay();
    const updatedStage = await incrementValue(`t${stage}`);
    await Cow.update(
      { status: 't', stage: -stage },
      {
        where: {
          cow_num: cow_num_for_update,
        },
      }
    );
    return updatedStage;
  } catch (error) {
    console.error('Error updating stage:', error);
  }
};
export const setFinalStatusInDB = async (status: string, cow_num: number) => {
  try {
    const updatedStage = await incrementValue(`${status}_sum`);
    await Cow.update(
      { status: status, stage: 4 },
      {
        where: {
          cow_num: cow_num,
          enter_date: date(),
        },
      }
    );
    return updatedStage;
  } catch (error) {
    console.error('Error updating stage:', error);
  }
};

const incrementValue = async (columnName: string) => {
  try {
    const updatedRows = await DaySum.increment(
      { [columnName]: 1 },
      { where: { date: date() } }
    );
    return updatedRows;
  } catch (error) {
    console.error('Error updating value:', error);
  }
};

const createNewDay = async () => {
  const currentDate = date();
  const day = await DaySum.findOne({
    where: { date: currentDate },
  });
  if (day) return;
  else {
    const newDay = await DaySum.create({
      date: currentDate,
      k_sum: 0,
      kPlus_sum: 0,
      t1: 0,
      t2: 0,
      t3: 0,
    });
    return newDay.dataValues;
  }
};
export const getCowDataFromDB = async (cow_num: number) => {
  try {
    const data = await Cow.findOne({
      where: { cow_num: cow_num, enter_date: date() },
    });
    return {img: data.dataValues.rea_img,status: data.dataValues.status};
  } catch (err) {
    console.log(err);
  }
};
