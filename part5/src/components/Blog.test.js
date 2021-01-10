import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Blogger',
    url: 'http://blog.com',
    likes: 12,
    user: 'dsfds'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container.querySelector('.titleDiv')).toHaveTextContent(blog.title)
  expect(component.container.querySelector('.titleDiv')).toHaveTextContent(blog.author)
  expect(component.container.querySelector('.titleDiv')).not.toHaveTextContent(blog.likes)
  expect(component.container.querySelector('.titleDiv')).not.toHaveTextContent(blog.url)
  expect(component.container.querySelector('.titleDiv')).not.toHaveTextContent(blog.user)
})

// test('clicking the button calls event handler once', async () => {
//   const blog = {
//     content: 'Component testing is done with react-testing-library',
//     important: true
//   }

//   const mockHandler = jest.fn()

//   const { getByText } = render(
//     <Blog blog={blog} toggleImportance={mockHandler} />
//   )

//   const button = getByText('make not important')
//   fireEvent.click(button)

//   expect(mockHandler.mock.calls.length).toBe(1)
// })