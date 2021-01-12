import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, blogs, setBlogs, username }) => {
  const [buttonText, setButtonText] = useState('view')
  const [contentStyle, setContentStyle] = useState({ display: 'none' })
  console.log(blog.user.username)
  console.log(username)
  const displayDelete = blog.user.username === username ? { display: 'block' } : { display: 'none' }

  const changeVisibility = () => {
    if (buttonText === 'hide') {
      setButtonText('view')
      setContentStyle({ display: 'none' })
    } else {
      setButtonText('hide')
      setContentStyle({ display: 'block' })
    }
  }

  const increaseLike = async () => {
    const newObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    setBlogs([...blogs.filter(x => x.id !== blog.id), { ...blog, likes: blog.likes + 1 }])
    await blogService.update(blog.id, newObj)
  }

  const deleteBlog = async () => {
    await blogService.remove(blog.id)
    setBlogs(blogs.filter(x => x.id !== blog.id))
  }

  return (
    <div style={blogStyle} className='blogContents'>
      <div className='titleDiv'>
        {blog.title} {blog.author}
        <button onClick={changeVisibility}>{buttonText}</button>
      </div>
      <div style={contentStyle} className='blogDetails'>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button id='like-button' onClick={increaseLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={displayDelete}>
          <button id='delete-button' onClick={deleteBlog}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
