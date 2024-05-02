import React from 'react'

interface Square {
  
}

interface Props: {
  squares : Square[];
  selected : number;
  setSelected: (index) => void;
}

const Squares = ({squares, selected, setSelected}:Props) => {
  return (
    <div>Squares</div>
  )
}

export default Squares
