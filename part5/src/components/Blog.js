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

  const displayDelete = blog.user.username === username ? { display: '' } : { display: 'none' }

  const changeVisibility = () => {
    if (buttonText === 'hide') {
      setButtonText('view')
      setContentStyle({ display: 'none' })
    } else {
      setButtonText('hide')
      setContentStyle({})
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
    const res = await blogService.update(blog.id, newObj)
    setBlogs([...blogs.filter(x => x.id !== blog.id), res])
  }


  const deleteBlog = async () => {
    await blogService.remove(blog.id)
    setBlogs(blogs.filter(x => x.id !== blog.id))
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={changeVisibility}>{buttonText}</button>
      </div>
      <div style={contentStyle}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={increaseLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={displayDelete}>
          <button onClick={deleteBlog}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
