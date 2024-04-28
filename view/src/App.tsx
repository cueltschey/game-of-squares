import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Auth from "./components/auth/Auth.tsx"

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
    <div className="App">
      {authenticated ? (
        <div>
          <h1>Welcome to the App!</h1>
          <p>Authenticated content goes here...</p>
        </div>
      ) : (
        <Auth onSuccess={() => setAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;
