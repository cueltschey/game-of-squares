
interface Square {
  id : number;
  date: string;
  userid : number;
  status : number;
}

interface Props {
  squares : Square[];
  selected : number;
  setSelected: (index : number) => void;
}

const Squares = ({squares, selected, setSelected}:Props) => {
  return (
    <div>
    {squares.map((square : Square, index : number) => (
      <li key={index} className={index === selected? "square" : "square selected"} onClick={() => setSelected(index)}>{square.date}</li>
    ))}
    </div>
  )
}

export default Squares
