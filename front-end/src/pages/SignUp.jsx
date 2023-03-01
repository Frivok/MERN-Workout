import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {handleSignup, error, loading, emptyFields } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleSignup(email,username,password);
    }

    return (
        <form action="" className='signup' onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label htmlFor="email">Email </label>
            <input type="email" className={emptyFields.includes('email') ? 'error' : ''}  name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="email">Username</label>
            <input type="text" className={emptyFields.includes('username') ? 'error' : ''} name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" className={emptyFields.includes('password') ? 'error' : ''} name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit" disabled={loading}>Sign up</button>
            {error && <p className='error'>{error}</p>}
        </form>
    )
}

export default Signup;