import { useEffect, useState } from 'react'

interface Props {
  userid: number;
}

interface TaskType {
  taskid: number;
  name: string;
  description: string;
  userid: number;
}

const Task = ({userid}:Props) => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [trigger, setTrigger] = useState<number>(0)

  useEffect(() => {
  const getTasks = async () => {
    try {
    const response = await fetch(`/tasks/${userid}`);
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
  
  return (
    <div>{tasks.map((task: TaskType, index: number) => (
      <li key={index}>{task.name}{task.description}<button onClick={() => deleteTask(task.taskid)}>X</button></li>
    ))}</div>
  )
}

export default Task
