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
  id: '5ff604c63f84b62e60576421',
  user: { id: '123', name: 'tester' }
}

let component
let setBlogs

beforeEach(() => {
  setBlogs = jest.fn()
  component = render(
    <Blog blog={blog} setBlogs={setBlogs} blogs={[blog]} />
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
  fireEvent.click(button)
  const div = component.container.querySelector('.blogDetails')
  expect(div).toHaveStyle('display: none')
})

test('clicking like button twice triggers two callbacks', () => {
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(setBlogs.mock.calls.length).toBe(2)
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