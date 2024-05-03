import { useState } from 'react';
import axios from 'axios';

interface Props{
  onSuccess: () => void;
  setUserid: (index: number) => void;
}

const Register = ({ onSuccess, setUserid }:Props) =>  {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', { username, email, password });
      if (response.status === 201) {
        // Registration successful
        onSuccess()
        setUserid(response.data.userid)
      }
    } catch (error) {
      setError('Registration failed');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
