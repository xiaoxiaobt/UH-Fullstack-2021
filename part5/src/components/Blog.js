import React, { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog }) => {

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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={changeVisibility}>{buttonText}</button>
      </div>
      <div style={contentStyle}>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
