import axios from 'axios'
const baseUrl = '/api/blogs'

let TOKEN = null

const setToken = newToken => {
  TOKEN = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: {
      Authorization: TOKEN
    }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateLikes = async (id, userId) => {
  const config = {
    headers: {
      Authorization: TOKEN
    }
  }
  // console.log(config)
  const response = await axios.put(`${baseUrl}/${id}/likes`, userId, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: TOKEN
    }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export { getAll, create, updateLikes, remove, setToken }