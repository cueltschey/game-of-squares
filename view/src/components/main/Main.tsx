import "./Main.css"
import Squares from "./Squares.tsx"
import Edit from "./Edit.tsx"
import {useEffect, useState} from 'react'

interface Props{
  userid: number
}

const Main = ({userid}:Props) => {
  const [selected, setSelected] = useState(0);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/squares?userid=${userid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setSquares(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="split">
      <div >
        <Squares squares={squares} setSelected={(index : number) => setSelected(index)} selected={selected} />
      </div>
      <div >
        <Edit />
      </div>
    </div>
  )
}

export default Main
