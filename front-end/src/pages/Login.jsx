import {useState} from 'react';
import {useLogin} from '../hooks/useLogin';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleLogin, error, loading, emptyFields} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  }
  return (
    <form action="" className='login' onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <label htmlFor="email">Email or Username</label>
      <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" value={password}
             onChange={e => setPassword(e.target.value)}/>
      <button type="submit">Log in</button>
      {error && <p className='error'>{error}</p>}
    </form>


  )
}

export default Login;