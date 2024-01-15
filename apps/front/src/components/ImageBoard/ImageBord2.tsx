import React, { useState, useRef, useEffect } from 'react';

const ImageBord2 = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = () => {
    setDrawing(true);
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const draw = (event) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    context.fillStyle = 'red';
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI);
    context.fill();
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    setImageUrl(canvas.toDataURL());
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        style={{ border: '1px solid black' }}
      />
      <div>
        <button onClick={saveImage}>Save</button>
      </div>
      <div>
        <img src={imageUrl} alt="Saved Drawing" />
      </div>
    </div>
  );
};

export default ImageBord2;
