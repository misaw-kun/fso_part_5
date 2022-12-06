import React, { useState } from 'react';
import { create } from '../services/blogs';

const initialValues = {
  title: '',
  author: '',
  url: '',
};

const CreateBlog = ({ blogs, setBlogs, sendNotif, markError, currUser }) => {
  const [values, setValues] = useState(initialValues);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const newBlog = await create(values);
      setBlogs(() => blogs.concat(newBlog));
      sendNotif(`a new blog by ${currUser.name} is added`);
      setTimeout(() => {
        sendNotif('');
      }, 3000);
      setValues(initialValues);
    } catch (e) {
      sendNotif(e.response.data.error);
      markError(true);
      setTimeout(() => {
        sendNotif('');
        markError(false);
      }, 3000);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>create new</h2>
      <div>
        title
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          name="author"
          value={values.author}
          onChange={handleInputChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          name="url"
          value={values.url}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlog;
