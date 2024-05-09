import "./Squares.css"

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

interface Props {
  squares : Square[];
  selected : number;
  setSelected: (index : number) => void;
}

function iterateDaysAfter(squares: Square[]) {
    const lastSquare = squares[squares.length - 1]
    if(!lastSquare){
      return [];
    }
    const startDate = new Date(parseInt(lastSquare.date.split("-")[0]), parseInt(lastSquare.date.split("-")[1]), parseInt(lastSquare.date.split("-")[2]) + 1)
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    const daysArray = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        daysArray.push(new Date(date));
    }
    return daysArray;
}

function iterateDaysBefore(squares: Square[]) {
    const firstSquare = squares[0]
    if(!firstSquare){
      return [];
    }
    const startDate = new Date(parseInt(firstSquare.date.split("-")[0]), parseInt(firstSquare.date.split("-")[1]), parseInt(firstSquare.date.split("-")[2]) - 1)
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), 0);
    const daysArray = [];
    for (let date = startDate; date > endDate; date.setDate(date.getDate() - 1)) {
        daysArray.push(new Date(date));
    }
    return daysArray.reverse();
}

const isLastDayOfMonth = (date: Date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.getMonth() !== date.getMonth();
}



const Squares = ({squares, selected, setSelected}:Props) => {
  const daysAfter= iterateDaysAfter(squares)
  const daysBefore = iterateDaysBefore(squares)
  return (
    <div style={{display: "flex", justifyContent: "center", margin: "20px"}}>
    <ul style={{ display: "inline-flex", width: "100%", flexWrap: "wrap", maxWidth: "50vw" }}>
    <div style={{width:"100%", height:"20px"}}>{squares.length > 0? monthMap.get(squares[0].date.split("-")[1]) : ""}</div>
    {daysBefore.map((day: Date, index: number) => (
      <li key={index}
          id={day.getDate().toString()}
          className="square dull"
          style={{"backgroundColor":"rgb(34,34,34,0.5)"}}>
      </li>
    ))}
    {squares.map((square : Square, index : number) => (
      <>
      <li key={index} 
          id={square.date}
          className={index === selected? "square selected" : "square"} 
          style={square.completed === 0? {"backgroundColor":'rgb(34, 34, 34, 0.5)'} :
            {"backgroundColor":
            `rgb(34,${((square.completed / square.total) * 75)},${(square.completed / square.total) * 100})`}}
          onClick={() => setSelected(index)}>
          {square.completed} : {square.total}
          </li>
        {isLastDayOfMonth(new Date(parseInt(square.date.split("-")[0]),
              parseInt(square.date.split("-")[1]),
              parseInt(square.date.split("-")[2]) + 1)) &&
            <div style={{width:"100%", height:"20px"}}>{parseInt(square.date.split("-")[1]) !== 12? monthMap.get(`0${parseInt(square.date.split("-")[1]) + 1}`) : monthMap.get("01")}</div>
            }
      </>
    ))}
    {daysAfter.map((day: Date, index: number) => (
      <li key={index}
          id={day.getDate().toString()}
          className="square dull"
          style={{"backgroundColor":"rgb(34,34,34,0.5)"}}>
      </li>
    ))}
    <div style={{width:"100%", height:"20px"}}/>
    </ul>
    </div>
  )
}

export default Squares
