import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  // let container
  const setBlogs = jest.fn()
  const blog = {
    title: 'What Img Srcset Does In HTML5',
    author: 'Adam Wood',
    url: 'https://html.com/attributes/img-srcset/',
    likes: [
      'redpanda',
      'elgato'
    ]
  }

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        setBlogs={setBlogs}
      />
    )
  })

  test('should render title and author but not url and likes by default', () => {
    expect(screen.getByText('What Img Srcset Does In HTML5', {
      exact: false
    })).toBeDefined()
    expect(screen.getByText('Adam Wood', {
      exact: false
    })).toBeDefined()
    expect(screen.getByText('https://html.com/attributes/img-srcset/')).not.toBeVisible()
  })

  test('should check for url and likes when show button is clicked', async () => {
    const user = userEvent.setup()
    const showBtn = screen.getByText('show')

    await user.click(showBtn)

    expect(screen.getByText('https://html.com/attributes/img-srcset/')).toBeVisible()
  })
})