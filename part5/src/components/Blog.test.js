import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  title: 'Test Blog',
  author: 'Blogger',
  url: 'http://blog.com',
  likes: 12,
  user: 'temp'
}

let component

beforeEach(() => {
  component = render(
    <Blog blog={blog} />
  )
})

test('renders content', () => {
  expect(component.container.querySelector('.titleDiv')).toHaveTextContent(blog.title)
  expect(component.container.querySelector('.titleDiv')).toHaveTextContent(blog.author)
  expect(component.container.querySelector('.titleDiv')).not.toHaveTextContent(blog.likes)
  expect(component.container.querySelector('.titleDiv')).not.toHaveTextContent(blog.url)
})

test('after clicking the button, children are displayed', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogContents')
  expect(div).toHaveTextContent(blog.likes)
  expect(div).toHaveTextContent(blog.url)
  expect(div).not.toHaveStyle('display: none')
})

test('toggled content can be closed', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogDetails')
  expect(div).toHaveStyle('display: block')
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