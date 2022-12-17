import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Notification from '../components/Notification'

test('renders content', () => {

  // const { container } = render(<Notification message='Testing React Apps' />)
  render(<Notification message='Testing React Apps' />)
  // const div = container.querySelector('.notif')
  const elem = screen.getByText('Testing React Apps')
  // screen.debug(elem)
  expect(elem).toBeDefined()

  // expect(div).toHaveTextContent('Testing React Apps')
})