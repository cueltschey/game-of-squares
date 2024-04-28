import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Auth from "./components/auth/Auth.tsx"
import Main from "./components/main/Main.tsx"
import "./App.css"

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the authenticated cookie exists
    const isAuthenticatedCookie = Cookies.get('authenticated');

    if (isAuthenticatedCookie) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <div className="main">
      {1 ? (
        <Main />
      ) : (
        <Auth onSuccess={() => setAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;
