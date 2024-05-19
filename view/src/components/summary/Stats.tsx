import { useState, useEffect } from 'react';

interface Task {
  id: number;
  userid: number;
  squareid: number;
  taskid: number;
  completed: number;
}

const monthList : string[] = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
]

interface Props{
  userid: number;
  setSummarySelected : (index: number) => void;
}


const Stats = ({userid,setSummarySelected}:Props) => {
  const [summary, setSummary] = useState<Task[]>([])
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth()
  const [monthIndex, setMonthIndex] = useState<number>(currentMonth)

  useEffect(() => {
  const getSummary = async () => {
    try {
    const response = await fetch(`/summary/${userid}/${monthList[monthIndex]}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const jsonData = await response.json();
    setSummary(jsonData)
    } catch (error) {
    console.error('Error fetching data:', error);
    }
  };
  getSummary()
  }, [monthIndex])

  return (
    <div><button onClick={() => setSummarySelected(0)}>back</button>{summary.length > 0? summary.filter(task => task.completed === 1).length / summary.length : 0}%
      <button onClick={() => setMonthIndex(monthIndex + 1)}>+</button></div>
  )
}

export default Stats
