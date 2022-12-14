import React, { useState } from 'react'

const initialValues = {
  title: '',
  author: '',
  url: '',
}

const CreateBlog = ({ addBlog }) => {
  const [values, setValues] = useState(initialValues)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <div className='formDiv'>
      <form onSubmit={(e) => addBlog(e, values, setValues, initialValues)}>
        <h2>create new</h2>
        <div>
        title
          <input
            placeholder='title'
            type="text"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
        author
          <input
            placeholder='author'
            type="text"
            name="author"
            value={values.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
        url
          <input
            placeholder='url'
            type="text"
            name="url"
            value={values.url}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog
