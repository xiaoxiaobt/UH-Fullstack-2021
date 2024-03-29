import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { handleLike, handleRemove } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, own }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'



  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author} <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={() => dispatch(handleLike(blog.id))}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {own && <button onClick={() => dispatch(handleRemove(blog.id))}>remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  // handleLike: PropTypes.func.isRequired,
  // handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}

export default Blog