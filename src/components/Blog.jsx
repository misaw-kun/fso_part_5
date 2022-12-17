import React, { useState } from 'react'
import { remove, updateLikes } from '../services/blogs'
import PropTypes from 'prop-types'

/**
 * TODO: fix client side like handling (DONE)
 */

const Blog = ({ user, blog, setBlogs, blogs }) => {
  // const loggedinUser = JSON.parse(localStorage.getItem('loggedinUser'));
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState({
    liked: blog.likes?.includes(user?.id) || false,
    count: blog.likes?.length || 0,
  })

  const blogStyle = {
    padding: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '50vw',
  }

  async function updateLikesCount() {
    setLikes((prevState) => ({
      liked: !prevState.liked,
      count: prevState.liked ? prevState.count - 1 : prevState.count + 1,
    }))
    await updateLikes(blog.id, {
      likes: user.id,
    })
  }

  async function handleDelete() {
    if (confirm(`delete ${blog.title} ?`)) {
      setBlogs(() => blogs.filter((item) => item.id !== blog.id))
      await remove(blog.id)
    } else {
      return
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span id='list-view'>
          {blog.title} <em>by</em> {blog.author}
        </span>
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'show'}
        </button>
      </span>
      <div style={{ display: `${visible ? '' : 'none'}` }}>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <span style={{ display: 'flex', gap: '1rem' }}>
          <span id='likesCount'>
            likes : {likes.count}
          </span>
          {user && (
            <button onClick={updateLikesCount}>
              {likes.liked ? 'un-like' : 'like'}
            </button>
          )}
        </span>
        <p>user : {blog?.user?.name}</p>
      </div>
      {user && user?.username === blog.user.username && (
        <button onClick={handleDelete}>remove</button>
      )}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array,
}

export default Blog
