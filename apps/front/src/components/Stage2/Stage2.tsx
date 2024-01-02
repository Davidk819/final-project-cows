import { useAtom, useAtomValue } from 'jotai';
import '../../styles.css'
import { Link, useNavigate } from 'react-router-dom';
import { photoURL } from '../../mainAtom';

export default function Stage2() {
    const navigate = useNavigate();
    const [photo, setPhoto] = useAtom(photoURL);

    const handleClick = (path: string) => {
        navigate(`/home/${path}`);
    }

    return (
        <div className='flex justify-center items-center gap-4 border-2'>
            {"stage2"}
            {photo && <img src={`${photo}`} alt="photo" />}
        </div>
    );
};
