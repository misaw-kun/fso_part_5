import React from 'react';
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll, setToken } from './services/blogs';
import { login } from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

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
      console.log(e);
    }
  }

  const loginForm = () => {
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
        </>
      );
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {loginForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
