import React from 'react';
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { getAll } from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {notification && (
        <Notification message={notification} isError={isError} />
      )}
      <LoginForm
        sendNotif={setNotification}
        markError={setIsError}
        user={user}
        setUser={setUser}
      >
        <CreateBlog
          sendNotif={setNotification}
          markError={setIsError}
          blogs={blogs}
          currUser={user}
          setBlogs={setBlogs}
        />
      </LoginForm>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
