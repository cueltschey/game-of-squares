import "./Main.css"
import Squares from "./Squares.tsx"
import Edit from "./Edit.tsx"
import { useState, useRef, useEffect } from 'react';

interface Props{
  userid: number
}

interface Square {
  id : number;
  date: string;
  userid : number;
  completed : number;
  total : number;
}

const  Main = ({userid}:Props) => {
  const [selected, setSelected] = useState<number>(0);
  const [squares, setSquares] = useState<Square[]>([]);
  const [leftPaneWidth, setLeftPaneWidth] = useState<number>(500);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();

    const handleMouseMove = (e : MouseEvent) => {
      if (!isResizingRef.current) return;
      let containerRect = null;
      if(containerRef.current){
        containerRect = containerRef.current.getBoundingClientRect();
      }
      if(containerRect){
        const newWidth = e.clientX - containerRect.left;
        setLeftPaneWidth(newWidth);
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
    <div className="split-pane" ref={containerRef}>
      <div className="pane" style={{ width: leftPaneWidth }}>
        <Edit />
      </div>
      <div className="divider" onMouseDown={handleMouseDown}></div>
      <div className="pane" style={{ flex: 1 }}>
        <Squares 
        squares={squares} 
        setSelected={(index : number) => setSelected(index)} 
        selected={selected} />
      </div>
    </div>
  );
}

export default Main;
