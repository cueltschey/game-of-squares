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
}

const Task = ({userid}:Props) => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [trigger, setTrigger] = useState<number>(0)
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

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
    <div>
      <ul className="edit-list">
        {tasks.map((task: TaskType, index: number) => (
      <li key={index}
          className="edit-item"
      >
        <span className="task-delete" onClick={() => deleteTask(task.taskid)}>X</span>
        {task.name}{task.description}
      </li>
    ))}</ul>
      <div>
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={() => addTask()}>Add Task</button>
        </div>
    </div>
  )
}

export default Task
