import React, { useState } from 'react'

const BlogForm = ({ createBlog, userid }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: userid,
      likes: 0
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author
          <input
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          url
          <input
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm