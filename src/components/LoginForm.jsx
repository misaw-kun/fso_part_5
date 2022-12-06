import React, { useEffect, useState } from 'react';
import { login } from '../services/login';
import { setToken } from '../services/blogs';

const LoginForm = ({ children, sendNotif, markError, user, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedinUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const loginUser = await login({
        username,
        password,
      });
      window.localStorage.setItem('loggedinUser', JSON.stringify(loginUser));
      setUser(loginUser);
      setUsername('');
      setPassword('');
    } catch (e) {
      // console.log(e.response.data.error);
      sendNotif(e.response.data.error);
      markError(true);
      setTimeout(() => {
        sendNotif('');
        markError(false);
      }, 3000);
    }
  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  } else {
    return (
      <>
        <p>logged in as {user.name}</p>
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedinUser');
            setUser(null);
          }}
        >
          logout
        </button>
        {children}
      </>
    );
  }
};

export default LoginForm;