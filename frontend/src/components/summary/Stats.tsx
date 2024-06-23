import "./Stats.css"


interface Props{
  birthdate: string;
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



const Stats = ({birthdate}:Props) => {
  const currentDate = new Date();
  const averageDeathDate = getDate82YearsLater(birthdate)
  const birthDateObj = new Date(birthdate)
  const averageWeeksLived = 4275
  const currentWeeksLived = getDateRange(birthDateObj, currentDate) / 7

  return (
    <div style={{height: "95vh"}}>
      <h1>{((getDateRange(birthDateObj, currentDate) / getDateRange(birthDateObj, averageDeathDate)) * 100).toFixed(2)}%</h1>
      <ul className="weeks-lived">
      {Array.from({ length: averageWeeksLived }, (_, index) => 
          <div key={index} 
          style={{height: "0.5vw", width: "0.5vw", borderRadius: "1px"}} 
          className={index < parseInt(currentWeeksLived.toFixed(0))? "lived" : index === parseInt(currentWeeksLived.toFixed(0))? "week-highlight" : "unlived"} 
          />)}
      </ul>
    </div>
  )
}

export default Stats
