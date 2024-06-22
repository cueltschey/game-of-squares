import {useState} from "react"
import Navbar from "../utils/Navbar.tsx"
import Login from "./Login.tsx"
import Register from "./Register.tsx"

interface Props {
  onSuccess: () => void;
  setUserid: (index : number) => void
}


const Auth = ({onSuccess, setUserid}: Props) => {
  const [page, setPage] = useState(0);
  const pages: string[] = ["login", "register"]
  return (
    <div>
      <Navbar changePage={(index) => setPage(index)} page={page} pages={pages} />
      {page === 0? <Login onSuccess={onSuccess} setUserid={setUserid}/> : <Register onSuccess={onSuccess} setUserid={setUserid}/>}
    </div>
  )
}

export default Auth
