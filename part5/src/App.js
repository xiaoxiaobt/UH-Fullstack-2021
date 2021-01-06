import './App.css'
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} className='error' />
        {/* loginForm() */}
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </Togglable>
        {/*  */}
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} className='success' />
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        {/* blogForm() */}
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} userid={user.id} />
        </Togglable>
        {/*  */}
        {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)}
      </div >
    )
  }
}

export default App