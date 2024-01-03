import { useAtom, useAtomValue } from 'jotai';
import '../../styles.css'
import { Link, useNavigate } from 'react-router-dom';
import { photoURL } from '../../mainAtom';
import Headers2 from '../Headers2/Headers2';

export default function Stage2() {
    const navigate = useNavigate();
    const [photo, setPhoto] = useAtom(photoURL);

    const handleClick = (path: string) => {
        navigate(`/home/${path}`);
    }

    return (
        <div>
        <Headers2></Headers2>

        <div className='flex justify-center items-center gap-4 border-2'>
            {"stage2"}
            {photo && <img src={`${photo}`} alt="photo" />}
        </div>
        </div>
    );
};
