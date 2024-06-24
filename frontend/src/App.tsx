import { useEffect, useState } from 'react';
import Auth from "./components/auth/Auth.tsx"
import Main from "./components/main/Main.tsx"
import "./App.css"

function App() {
  document.title = "Game of Squares"
  const [authenticated, setAuthenticated] = useState(false);
  const storedId : number = parseInt(localStorage.getItem('userid') || '0')
  const birthdate : string = localStorage.getItem('birthdate') || '2000-01-01'
  const [userid, setUserid] = useState(storedId);

  useEffect(() => {
  const verifyAuth = async () => {
    try {
    const response = await fetch(`/verify`);
    if (!response.ok) {
       setAuthenticated(false)
    }
    const jsonData = await response.json();
    if(jsonData.authenticated === 1){
      setAuthenticated(true)
      setUserid(jsonData.userid)
    }
    } catch (error) {
    console.error('Error fetching data:', error);
    }
  };
  verifyAuth()
  }, [])


  return (
    <div className="main">
      {authenticated ? (
        <Main userid={userid} birthdate={birthdate}/>
      ) : (
        <Auth onSuccess={() => setAuthenticated(true)} setUserid={(index) => setUserid(index)}/>
      )}
    </div>
  );
}

export default App;
