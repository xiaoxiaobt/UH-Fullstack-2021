import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  return (
    <>
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