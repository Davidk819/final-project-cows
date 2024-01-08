import { useAtom } from 'jotai';
import '../../styles.css'
import { useNavigate } from 'react-router-dom';
import { photoURL } from '../../mainAtom';
import Headers2 from '../Headers2/Headers2';
import { useEffect, useState } from 'react';
import { trpc } from '../../trpcClient';
import Table from '../Table/Table';

export default function Stage3() {
    const [photo, setPhoto] = useAtom(photoURL);
    const [list, setList] = useState<number[]>([])
    const [selectedNumber, setSelectedNumber] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const newData = await trpc.getAllByStage.query(2);
            console.log(newData);
            setList(newData)
    
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);
    
    return (
        <div>
        <Headers2></Headers2>
        <Table selectedNumber={selectedNumber} KosherNumbers={list} setNum={setSelectedNumber}></Table>

        <div className='flex justify-center items-center gap-4 border-2'>
            {"stage2"}
            {photo && <img src={`${photo}`} alt="photo" />}
        </div>
        </div>
    );
};
