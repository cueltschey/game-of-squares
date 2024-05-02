import "./Main.css"
import Squares from "./Squares.tsx"
import Edit from "./Edit.tsx"
import {useEffect, useState} from 'react'

const getCookie = (name : string) => {
  console.log(document.cookie)
 const cookies : any = document.cookie
   .split("; ")
   .find((row) => row.startsWith(`${name}=`));

 return cookies ? cookies.split("=")[1] : null;
};

const Main = () => {
  const [selected, setSelected] = useState(0);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userid : string | null = getCookie("userid")
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
