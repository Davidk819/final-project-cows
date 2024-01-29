import React, { useEffect, useRef, useState } from 'react';
import reaImage from '../Stage2/rea.png';
// import CowCard from '../CawCard/CawCard';

type Props = {

  handleSave: (str: string) => void;
};

const ImageBoard = ({ handleSave }: Props) => {
  const canvasElement = useRef<HTMLCanvasElement | null>(null);
  const [flag, setFlag] = useState(false);


  useEffect(() => {
    const image = new Image();
    image.src = reaImage;

    image.onload = () => {
      const canvas = canvasElement.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
      }
    };
  }, [flag]);

  const getMousePosition = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasElement.current!.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const markPointOnImage = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    event.preventDefault();
    const pos = getMousePosition(event);
    const canvas = canvasElement.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
        context.fill();
      }
    }
  };

  const cleanCanvas = () => {
    const canvas = canvasElement.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const getPng = () => {
      const canvas = canvasElement.current;
      if (canvas) {
        const imageUrl = canvas.toDataURL();
        handleSave(imageUrl)
        clean2()
        setFlag(!flag)
      }
  
  };

  const clean2 = () => {
    const image = new Image();
    image.src = reaImage;
    cleanCanvas();
    const canvas = canvasElement.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
    }
  };



  return (
    <div className="flex items-center justify-center space-x-8">
      <div className="border-2 border-black p-4">
        {/* <CowCard ></CowCard> */}
        <canvas
          className="cursor-crosshair border border-black"
          width="400px"
          height="300px"
          ref={canvasElement}
          onClick={markPointOnImage}
        ></canvas>
        <div className="flex justify-between mt-4">
          <div className="cursor-pointer" onClick={getPng}>
            Save
          </div>
          <div className="cursor-pointer" onClick={clean2}>
            Clean
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageBoard;
