import React, { useEffect, useRef, useState } from 'react';
import reaImage from '../Stage1/rea.png';
import { useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import { mooID, photoURL } from '../../mainAtom';

const ImageBoard = () => {
  const canvasElement = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();
  const [photo, setPhoto] = useAtom(photoURL);
  const [signatureStart, setSignatureStart] = useState(false);

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
  }, [reaImage, canvasElement]);

  const getMousePosition = (event: MouseEvent) => {
    const rect = canvasElement.current!.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const markPointOnImage = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const pos = getMousePosition(event);
    const canvas = canvasElement.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(pos.x, pos.y, 5, 0, 2 * Math.PI);
        context.fill();
        setSignatureStart(true);
      }
    }
  };

  const cleanCanvas = () => {
    const canvas = canvasElement.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        setSignatureStart(false);
      }
    }
  };

  const getPng = () => {
    if (signatureStart) {
      const canvas = canvasElement.current;
      if (canvas) {
        console.log(canvas.toDataURL());
        setPhoto(canvas.toDataURL());
      }
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
    <div>
      <div style={{ width: '400px', border: '1px solid black' }}>
        <canvas
          style={{ cursor: 'crosshair', border: '1px solid black' }}
          width="400px"
          height="300px"
          ref={canvasElement}
          onClick={markPointOnImage}
        ></canvas>
        <div>
          <div style={{ cursor: 'pointer' }} onClick={getPng}>
            Save to console
          </div>
          <div style={{ cursor: 'pointer' }} onClick={clean2}>
            Clean
          </div>
        </div>
      </div>
      <button onClick={() => navigate(`/home/main`)} style={{ border: '2px solid indigo', width: '24px' }}>
        Main
      </button>
      <h1>{photo}</h1>
    </div>
  );
};

export default ImageBoard;
