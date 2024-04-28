import {useState} from "react"
import Navbar from "../utils/Navbar.tsx"
import Login from "./Login.tsx"
import Register from "./Register.tsx"

interface Props {
  onSuccess: () => void;
}


const Auth = ({onSuccess}: Props) => {
  const [page, setPage] = useState(0);
  const pages: string[] = ["login", "register"]
  return (
    <div>
      <Navbar changePage={(index) => setPage(index)} page={page} pages={pages} />
      {page === 0? <Login onSuccess={onSuccess}/> : <Register onSuccess={onSuccess}/>}
    </div>
  )
}

export default Auth
