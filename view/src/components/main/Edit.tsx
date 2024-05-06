import {useState, useEffect} from 'react'

const monthMap = new Map<string, string>([
    ["01", "January"],
    ["02", "February"],
    ["03", "March"],
    ["04", "April"],
    ["05", "May"],
    ["06", "June"],
    ["07", "July"],
    ["08", "August"],
    ["09", "September"],
    ["10", "October"],
    ["11", "November"],
    ["12", "December"]
]);

interface Square {
  id : number;
  date: string;
  userid : number;
  completed : number;
  total : number;
}

interface Props {
  squares : Square[];
  selected : number;
}





const Edit = ({selected, squares}:Props) => {
  const [title, setTitle] = useState<string>("")

  useEffect(() => {
    const getList = async () => {
      console.log("testing")
      setTitle("test")
    }
    getList()
  }, [selected])
    
  return (
    <>
      {selected > 0 ? (
      <>
      <h1>{title}</h1>
      <p>{squares[selected].date}</p>
      <p>{monthMap.get(squares[selected].date.split("-")[1])}</p>
      </>
      ) : <>selected 0</>
      }
    </>
  )
}

export default Edit
