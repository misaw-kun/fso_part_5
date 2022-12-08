import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { create, getAll } from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')
  const [isError, setIsError] = useState(false)

  const blogFormRef = useRef()

  async function handleCreate(e, values, setValues, initialValues) {
    e.preventDefault()
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await create(values)
      setBlogs(() => blogs.concat(newBlog))
      setNotification(`a new blog by ${user.name} is added`)
      setTimeout(() => {
        setNotification('')
      }, 3000)
      setValues(initialValues)
    } catch (err) {
      setNotification(err.response.data.error)
      setIsError(true)
      setTimeout(() => {
        setNotification('')
        setIsError(false)
      }, 3000)
    }
  }

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs))
  }, [blogs.length])

  return (
    <div>
      {notification && (
        <Notification message={notification} isError={isError} />
      )}
      <LoginForm
        setNotification={setNotification}
        setIsError={setIsError}
        user={user}
        setUser={setUser}
      >
        <Togglable btnLabel="new note" ref={blogFormRef}>
          <CreateBlog addBlog={handleCreate} />
        </Togglable>
      </LoginForm>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            setBlogs={setBlogs}
            blogs={blogs}
          />
        ))}
    </div>
  )
}

export default App
