import "./Main.css"
import Squares from "./Squares.tsx"
import Edit from "./Edit.tsx"
import Stats from "../summary/Stats.tsx"
import { useState, useRef, useEffect } from 'react';

interface Props{
  userid: number;
  birthdate: string;
}

interface Square {
  id : number;
  date: string;
  userid : number;
  completed : number;
  total : number;
}

interface TaskType {
  taskid: number;
  name: string;
  description: string;
  userid: number;
}

const  Main = ({userid, birthdate}:Props) => {
  const [selected, setSelected] = useState<number>(0);
  const [squares, setSquares] = useState<Square[]>([]);
  const [taskTypes, setTaskTypes] = useState<TaskType[]>([]);
  const [leftPaneWidth, setLeftPaneWidth] = useState<number>(500);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef<boolean>(false);
  const [summarySelected, setSummarySelected] = useState<number>(0)

  useEffect(() => {
    const getSquares = async () => {
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

    getSquares();

    const getTypes = async () => {
      try {
        const response = await fetch(`/tasks?userid=${userid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setTaskTypes(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getTypes();



    const handleMouseMove = (e : MouseEvent) => {
      if (!isResizingRef.current) return;
      let containerRect = null;
      if(containerRef.current){
        containerRect = containerRef.current.getBoundingClientRect();
      }
      if(containerRect){
        const newWidth = e.clientX - containerRect.left;
        if(newWidth < 300){
          setLeftPaneWidth(300)
        }
        else if(newWidth > 1500){
          setLeftPaneWidth(1500)
        }
        else{
          setLeftPaneWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = () => {
    isResizingRef.current = true;
  };

  return (
  summarySelected === 0 ? (
    <div className="split-pane" ref={containerRef}>
      <div className="pane" style={{ width: leftPaneWidth }}>
        <Edit
          selected={selected}
          squares={squares}
          userid={userid}
          taskTypes={taskTypes}
        />
      </div>
      <div className="divider" onMouseDown={handleMouseDown}></div>
      <div className="pane" style={{ flex: 1 }}>
        <button onClick={() => setSummarySelected(1)}>Summary</button>
        <Squares
          squares={squares}
          setSelected={(index: number) => setSelected(index)}
          selected={selected}
        />
      </div>
    </div>
  ) : (
    <Stats
      userid={userid}
      birthdate={birthdate}
      setSummarySelected={(index) => setSummarySelected(index)}
    />
  )
);
}

export default Main;
