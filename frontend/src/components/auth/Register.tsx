import { useState } from 'react';
import axios from 'axios';
import "./Login.css"

interface Props{
  onSuccess: () => void;
  setUserid: (index: number) => void;
}

const Register = ({ onSuccess, setUserid }:Props) =>  {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', { username, email, password, birthdate });
      if (response.status === 200) {
        // Registration successful
        setUserid(response.data.userid)
        localStorage.setItem('userid', response.data.userid)
        onSuccess()
      }
    } catch (error) {
      if(axios.isAxiosError(error) && error.response != undefined){
        setError(error.response.data);
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="formPair">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="formPair">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="formPair">
          <label>Birthdate:</label>
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
        </div>
        <div className="formPair">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{fontSize: "16px", color: "red"}}>{error}</p>}
    </div>
  );
}

export default Register;
