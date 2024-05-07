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

interface Task {
  id: number;
  userid: number;
  squareid: number;
  taskid: number;
}

interface Props {
  squares : Square[];
  selected : number;
  userid : number;
}





const Edit = ({selected, squares, userid}:Props) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetch(`/list/${userid}/${squares[selected].id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setTasks(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getList()
  }, [selected])
    
  return (
    <>
      {selected > 0 ? (
      <>
      <h1>
        {monthMap.get(squares[selected].date.split("-")[1])}
        {" " + squares[selected].date.split("-")[2]}  {squares[selected].date.split("-")[0]}
      </h1>
      <p>{tasks.map((task: Task, index: number) => (
        <li key={index}>{task.squareid}{task.id}</li>
      ))}</p>
      </>
      ) : <>selected 0</>
      }
    </>
  )
}

export default Edit
