import "./Navbar.css";


interface Props{
    changePage : (index : number) => void;
    page : number;
    pages : string[];
}

const Navbar = ({changePage, page, pages}:Props) => {
  return (
    <div className='navbar'>
        <ul className="navlist">
        {pages.map((text: string, index: number) => (
          <li 
          key={index}
          className={page === index? "navitem active" : "navitem"}
          onClick={() => changePage(index)}>
              {text}
          </li>
        ))}
        </ul>
    </div>
  )
}

export default Navbar
