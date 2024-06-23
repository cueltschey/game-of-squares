import {useState, useEffect} from 'react'
import Task from "./Task.tsx"
import "./Edit.css"

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
  completed: number;
}

interface TaskType {
  taskid: number;
  name: string;
  description: string;
  userid: number;
  disabled: number;
}

interface Props {
  squares : Square[];
  selected : number;
  userid : number;
  taskTypes: TaskType[];
  toggleReload: () => void;
}


const Edit = ({selected, squares, userid, taskTypes, toggleReload}:Props) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
  const getList = async () => {
    try {
    const response = await fetch(`/list?userid=${userid}&squareid=${squares[selected].id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const jsonData = await response.json();
    setTasks(jsonData)
    } catch (error) {
    console.error('Error fetching data:', error);
    }
  };
  if(selected > 0){
    getList()
  }
  }, [selected])
  const handleCheckboxChange = async (listId: number, isChecked: boolean) => {
    try {
      const response = await fetch(`/update?userid=${userid}&listid=${listId}&completed=${isChecked ? 1 : 0}`, {
        method: 'POST'
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      const updatedTasks = tasks.map(task => {
                if (task.id === listId) {
                    return { ...task, completed: isChecked ? 1 : 0 };
                }
                return task;
            });
            setTasks(updatedTasks);
      toggleReload()
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <>
      {selected > 0 ? (
        <>
          <h1 className="edit-title">
            {monthMap.get(squares[selected].date.split("-")[1])}
            {" " + squares[selected].date.split("T")[0].split("-")[2]}  {squares[selected].date.split("-")[0]}
          </h1>
          <ul className="edit-list" style={{userSelect: "none"}}>
            {tasks.map((task: Task, index: number) => (
              <li key={index} className="edit-item">
                <input
                  type="checkbox"
                  checked={task.completed === 1}
                  onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
                />
                <ul style={{display: "inline-flex", listStyle: "none", flexDirection: "column", gap: "10px"}}>
                <li>{taskTypes.filter(taskType => taskType.taskid === task.taskid)[0].name}</li>
                <li>{taskTypes.filter(taskType => taskType.taskid === task.taskid)[0].description}</li>
                </ul>
              </li>
            ))}
          </ul>
        </>
      ) : <Task userid={userid} />}
    </>
  );}

export default Edit
