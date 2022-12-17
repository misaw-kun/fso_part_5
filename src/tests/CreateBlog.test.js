import React from 'react'
import { render, screen } from '@testing-library/react'
import CreateBlog from '../components/CreateBlog'
import userEvent from '@testing-library/user-event'

test('should update <CreateBlog /> parent state and call onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<CreateBlog addBlog={addBlog} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  const sendBtn = screen.getByText('create')

  await user.type(title, 'What Img Srcset Does In HTML5')
  await user.type(author, 'Adam Wood')
  await user.type(url, 'https://html.com/attributes/img-srcset/')

  await user.click(sendBtn)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][1].title).toBe('What Img Srcset Does In HTML5')
  expect(addBlog.mock.calls[0][1].author).toBe('Adam Wood')
  expect(addBlog.mock.calls[0][1].url).toBe('https://html.com/attributes/img-srcset/')
})