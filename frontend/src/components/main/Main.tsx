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
  disabled: number;
}

const  Main = ({userid, birthdate}:Props) => {
  const [selected, setSelected] = useState<number>(0);
  const [squares, setSquares] = useState<Square[]>([]);
  const [taskTypes, setTaskTypes] = useState<TaskType[]>([]);
  const [leftPaneWidth, setLeftPaneWidth] = useState<number>(500);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef<boolean>(false);
  const [summarySelected, setSummarySelected] = useState<number>(0)
  const [reload, setReload] = useState<boolean>(false)

  useEffect(() => {
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
  }, [reload])

  const handleMouseDown = () => {
    isResizingRef.current = true;
  };

  return (
  <div className="main" style={{height: "100%"}}>
  {summarySelected === 0 ? (
    <div className="split-pane" ref={containerRef} style={{borderBottom: "1px solid white"}}>
      <div className="pane" style={{ width: leftPaneWidth, overflowX: "hidden" }}>
        <Edit
          selected={selected}
          squares={squares}
          userid={userid}
          taskTypes={taskTypes}
          toggleReload={() => setReload(!reload)}
        />
      </div>
      <div className="divider" onMouseDown={handleMouseDown}></div>
      <div className="pane" style={{ flex: 1 }}>
        <button onClick={() => setSelected(-1)}>&laquo;</button>
        <Squares
          squares={squares}
          setSelected={(index: number) => setSelected(index)}
          selected={selected}
        />
      </div>
    </div>
  ) : (
    <div className="split-pane" ref={containerRef} style={{borderBottom: "1px solid white"}}>
      <div className="pane" style={{ width: leftPaneWidth, overflowX: "hidden" }}>
        <Edit
          selected={selected}
          squares={squares}
          userid={userid}
          taskTypes={taskTypes}
          toggleReload={() => setReload(!reload)}
        />
      </div>
      <div className="divider" onMouseDown={handleMouseDown}></div>
      <div className="pane" style={{ flex: 1 }}>
        <button onClick={() => setSelected(-1)}>&laquo;</button>
        <Stats
          birthdate={birthdate}
        />
      </div>
    </div>

  )
  }
    <div style={{height: "5vh", display: "flex", justifyContent: "right", margin: "10px 40px 10px 10px"}}>
    <button onClick={() => setSummarySelected(0)} className={summarySelected === 0? "hi" : "dull"}>Squares</button>
    <button onClick={() => setSummarySelected(1)} className={summarySelected === 1? "hi" : "dull"}>Overview</button>
    </div>
  </div>
  )
}

export default Main;
