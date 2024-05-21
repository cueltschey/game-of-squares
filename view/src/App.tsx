import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Auth from "./components/auth/Auth.tsx"
import Main from "./components/main/Main.tsx"
import "./App.css"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const storedId : number = parseInt(localStorage.getItem('userid') || '0')
  const birthdate : string = localStorage.getItem('birthdate') || '2000-01-01'
  const [userid, setUserid] = useState(storedId);

  useEffect(() => {
    // Check if the authenticated cookie exists
    const isAuthenticatedCookie = Cookies.get('authenticated');

    if (isAuthenticatedCookie) {
      setAuthenticated(true);
    }
  }, []);

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
