import {useState} from 'react';
import {useAuthContext} from './useAuthContext';

export const useSignup = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const {dispatch} = useAuthContext();

  const handleSignup = async (email, username, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, username, password}),
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }

    if (response.ok) {
      // save user to local storage
      localStorage.setItem('user', JSON.stringify(data));

      // save user to context
      dispatch({type: 'LOGIN', payload: data});

      setLoading(false);
    }
  }
  return {handleSignup, loading, error, emptyFields};
};
    

