import { useState } from 'react';
import axios from 'axios';
import "./Login.css"

interface Props{
  onSuccess: () => void;
  setUserid: (index: number) => void;
}

const Login = ({ onSuccess, setUserid }:Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { username, password });
      if (response.status === 200) {
        // Authentication successful
        setUserid(response.data.userid)
        console.log(response)
        localStorage.setItem('userid', response.data.userid)
        onSuccess()
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Internal server error');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2 style={{textAlign: "center"}}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
