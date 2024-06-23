import { useEffect, useState } from 'react'
import "./Edit.css"

interface Props {
  userid: number;
}

interface TaskType {
  taskid: number;
  name: string;
  description: string;
  userid: number;
  disabled: number;
}

const Task = ({userid}:Props) => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [trigger, setTrigger] = useState<number>(0)
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const getCurrentFormattedDate = () => {
    const currentDate = new Date();
    const options : Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    return currentDate.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
  const getTasks = async () => {
    try {
    const response = await fetch(`/tasks?userid=${userid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const jsonData = await response.json();
    setTasks(jsonData)
    } catch (error) {
    console.error('Error fetching data:', error);
    }
  };
  getTasks()
  }, [trigger])
  
  const deleteTask = async (taskid: number) => {
  const options = {
   method: 'DELETE',
   headers: {
    'Content-Type': 'application/json',
  },
  };
    try {
    const response = await fetch(`/tasks/${userid}/${taskid}`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setTrigger(trigger + 1)
  }

  const addTask = async () => {
    const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, description})
    };
    try {
    const response = await fetch(`/tasks/${userid}`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setTrigger(trigger + 1)
  }
  
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
      <h1 className="edit-title">{getCurrentFormattedDate()}</h1>
      <ul className="edit-list">
        {tasks.filter(taskType => taskType.disabled === 0).map((task: TaskType, index: number) => (
      <li key={index}
          className="edit-item"
      >
        <ul style={{listStyle:"none"}}>
          <li className="edit-item-header">{task.name}</li>
          <li className="edit-item-footer">{task.description}</li>
        </ul>
        <span className="task-delete" onClick={() => deleteTask(task.taskid)}>x</span>
      </li>
    ))}</ul>
      <input
        id="taskname"
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        id="taskdesc"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={() => addTask()} style={{margin: "10px"}}>Add</button>
    </div>
  )
}

export default Task
