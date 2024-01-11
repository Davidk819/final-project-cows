import { useAtom, useAtomValue } from 'jotai';
import '../../styles.css';
import { Link, useNavigate } from 'react-router-dom';
import Headers2 from '../Headers/Headers';

export default function Main() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(`/home/${path}`);
  };

  return (
    <div>
      {/* <div className="flex justify-center	items-center	 gap-4 border-2">
        <button
          onClick={() => handleClick('stage1')}
          className="border-solid border-2 border-indigo-600 w-24"
        >
          {' '}
          stage 1
        </button>
        <button
          onClick={() => handleClick('stage2')}
          className="border-solid border-2 border-indigo-600 w-24"
        >
          {' '}
          stage 2
        </button>
        <button
          onClick={() => handleClick('stage3')}
          className="border-solid border-2 border-indigo-600 w-24"
        >
          {' '}
          stage 3
        </button>
        <div></div>
      </div> */}
    </div>
  );
}
