import "./Squares.css"


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
    for (let date = startDate; date >= endDate; date.setDate(date.getDate() - 1)) {
        console.log(date)
        daysArray.push(new Date(date));
    }
    return daysArray.reverse();
}



const Squares = ({squares, selected, setSelected}:Props) => {
  const daysAfter= iterateDaysAfter(squares)
  const daysBefore = iterateDaysBefore(squares)
  return (
    <table>
    {daysBefore && <br></br>}
    {daysBefore.map((day: Date, index: number) => (
      <td key={index}
          id={day.getDate().toString()}
          className="square dull"
          style={{"backgroundColor":"rgb(34,34,34,0.5)"}}>
      </td>
    ))}
    {squares.map((square : Square, index : number) => (
      <td key={index} 
          id={square.date}
          className={index === selected? "square selected" : "square"} 
          style={square.completed === 0? {"backgroundColor":'rgb(34, 34, 34, 0.5)'} :
            {"backgroundColor":`rgb(34,${(square.completed / square.total) * 170},34)`}}
          onClick={() => setSelected(index)}>
      </td>
    ))}
    {daysAfter.map((day: Date, index: number) => (
      <td key={index}
          id={day.getDate().toString()}
          className="square dull"
          style={{"backgroundColor":"rgb(34,34,34,0.5)"}}>
      </td>
    ))}
    {daysAfter && <tr></tr>}
    </table>
  )
}

export default Squares
