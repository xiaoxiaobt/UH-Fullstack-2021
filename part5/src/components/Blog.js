import React, { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => {
  const [currentBlog, setCurrentBlog] = useState(blog)
  const [buttonText, setButtonText] = useState('view')
  const [contentStyle, setContentStyle] = useState({ display: 'none' })

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
      title: currentBlog.title,
      author: currentBlog.author,
      url: currentBlog.url,
      likes: currentBlog.likes + 1, 
      user: currentBlog.user.id
      }
    const res = await blogService.update(currentBlog.id, newObj)
    setCurrentBlog({...res, id: blog.id})
  }

  return (
    <div style={blogStyle}>
      <div>
        {currentBlog.title} {currentBlog.author}
        <button onClick={changeVisibility}>{buttonText}</button>
      </div>
      <div style={contentStyle}>
        <div>{currentBlog.url}</div>
        <div>likes {currentBlog.likes}
          <button onClick={increaseLike}>like</button>
        </div>
        <div>{currentBlog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
