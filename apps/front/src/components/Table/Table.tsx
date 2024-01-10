
type Props = {
    KosherNumbers: number[]
    setNum: React.Dispatch<React.SetStateAction<number>>
    selectedNumber: number
    handlenumberClick?: (number: number) => void;

}


export default function Table({KosherNumbers ,selectedNumber, setNum, handlenumberClick }: Props)  {


  const handleNumberClick = (number: number) => {
    setNum(number);
    if(handlenumberClick) {
      handlenumberClick(number);
    }
  };

  return (
    <>
    <div className="grid grid-cols-5 gap-1">
      {KosherNumbers.map((number) => (
        <div
          key={number}
          className="relative"
          onClick={() => handleNumberClick(number)}
        >
          <div
            className={`cursor-pointer border p-1 ${
              selectedNumber === number ? 'bg-gray-200' : ''
            } text-center`}
          >
            {number}
          </div>
          <div className="absolute inset-0 border border-black opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
      ))}

    </div>
      {selectedNumber !== null && (
        <div className="mt-4 border p-1 bg-blue-100 text-center"> Number  {selectedNumber}</div>
      )}
    </>
  );
};



