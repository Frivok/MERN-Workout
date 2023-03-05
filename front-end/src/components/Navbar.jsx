import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";


const Navbar = () => {
  const {logout} = useLogout();
  const {user} = useAuthContext();
  const [picture, setPicture] = useState('');

  const handleClick = () => {
    logout();
  };


  useEffect(() => {

    const fetchPP = async () => {
      const response = await fetch('/api/user/profilePic', {
        headers: {
          "Authorization": "Bearer " + user.token,
        }
      });
      const imageBlob = await response.blob();
      setPicture(URL.createObjectURL(imageBlob));
    };

    if (user) {
      fetchPP();
      console.log("3")
    }
  }, [user]);


  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout</h1>
        </Link>
        {user && (
        <Link to="/profile">
          <h2>Profile</h2>
        </Link>)}
        <nav>
          {user && (
            <div>
              <div className="image-container">
                <span className="spanname">{user.email}</span>
                <img src={picture} alt="profile pic" id="profilepic" />
              </div>
              <button onClick={handleClick} id="btn-logout">Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

