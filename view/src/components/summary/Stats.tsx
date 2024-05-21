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
  birthdate: string;
  setSummarySelected : (index: number) => void;
}

const getDate82YearsLater = (dateString :string ) => {
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-indexed in JavaScript Date object
    const day = parseInt(dateParts[2], 10);
    const originalDate = new Date(year, month, day);
    return new Date(originalDate.setFullYear(originalDate.getFullYear() + 82));
}

const getDateRange = (date1: Date, date2 : Date) => {
    const time1 = date1.getTime();
    const time2 = date2.getTime();

    const diffInMs = Math.abs(time1 - time2);
    const msInDay = 24 * 60 * 60 * 1000;
    const diffInDays = diffInMs / msInDay;

    return diffInDays;
}



const Stats = ({userid,birthdate,setSummarySelected}:Props) => {
  const [summary, setSummary] = useState<Task[]>([])
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth()
  const [monthIndex, setMonthIndex] = useState<number>(currentMonth)
  const averageDeathDate = getDate82YearsLater(birthdate)
  const birthDateObj = new Date(birthdate)
  const averageWeeksLived = 4275

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
    <div>
      <button onClick={() => setSummarySelected(0)}>Squares</button><br></br>
      <h1>one: {getDateRange(birthDateObj, currentDate)}</h1>
      <h1>two: {getDateRange(currentDate, averageDeathDate)}</h1>
      {monthList[monthIndex]}
      {summary.length > 0? summary.filter(task => task.completed === 1).length / summary.length : 0}%
      <button onClick={() => setMonthIndex(monthIndex + 1)}>+</button>
      <button onClick={() => setMonthIndex(monthIndex - 1)}>-</button></div>
  )
}

export default Stats
