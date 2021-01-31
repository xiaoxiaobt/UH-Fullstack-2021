import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import loginService from './services/login'
import storage from './utils/storage'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom'
import { notifyWith } from './reducers/notificationReducer'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      dispatch(notifyWith(`${user.name} welcome back!`))
      dispatch({ type: 'LOGIN', data: user })
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(notifyWith(`${user.name} welcome back!`))
      dispatch({ type: 'LOGIN', data: user })
      storage.saveUser(user)
    } catch (exception) {
      dispatch(notifyWith('wrong username/password', 'ERROR'))
      dispatch({ type: 'LOGIN_FAILED' })
    }
  }
  const handleNewBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
  }

  const handleLogout = () => {
    storage.logoutUser()
    dispatch({ type: 'LOGOUT', data: user })
  }


  const byLikes = (b1, b2) => b2.likes - b1.likes
  const match = useRouteMatch('/users/:id')
  const oneBlogToShow = match
    ? blogs.find(b => b.user.id === match.params.id)
    : null

  return (
    <div>
      <Switch>
        <Route path="/users/:id">
          {
            <div>
              <h2>blogs</h2>
              <Notification />
              {
                user
                  ?
                  <p>
                    {user.name} logged in <button onClick={handleLogout}>logout</button>
                  </p>
                  : null
              }
              {oneBlogToShow ?
                <div>
                  <h2>{oneBlogToShow.user.name}</h2>
                  <h3>added blogs</h3>
                  {
                    blogs
                      .filter(b => b.user.id === oneBlogToShow.user.id)
                      .map(x => <li key={x.id}>{x.title}</li>)
                  }
                </div>
                :
                null
              }
            </div>
          }
        </Route>
        <Route path="/users">
          {
            <div>
              <h2>blogs</h2>
              <Notification />
              {
                user
                  ?
                  <p>
                    {user.name} logged in <button onClick={handleLogout}>logout</button>
                  </p>
                  : null
              }
              <h2>users</h2>
              <table>
                <tbody>
                  <tr>
                    <th></th>
                    <th><b>blogs created</b></th>
                  </tr>
                  {
                    [...new Set(blogs.map(b => b.user.id))]
                      .map(uid =>
                        <tr key={uid}>
                          <td>
                            <Link to={`/users/${uid}`}>
                              {blogs.find(b => b.user.id === uid).user.name}
                            </Link>
                          </td>
                          <td>{blogs.filter(b => b.user.id === uid).length}</td>
                        </tr>
                      )
                  }
                </tbody>
              </table>
            </div>
          }
        </Route>
        <Route path="/">
          {
            user ?
              (
                <div>
                  <h2> blogs</h2>

                  <Notification />

                  <p>
                    {user.name} logged in <button onClick={handleLogout}>logout</button>
                  </p>

                  <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                    <NewBlog createBlog={handleNewBlog} />
                  </Togglable>

                  {
                    blogs.sort(byLikes).map(blog =>
                      <Blog
                        key={blog.id}
                        blog={blog}
                        own={user.username === blog.user.username}
                      />
                    )
                  }
                </div >
              )
              :
              (
                <div>
                  <h2>login to application</h2>

                  <Notification />

                  <form onSubmit={handleLogin}>
                    <div>
                      username
                      <input
                        id='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                      />
                    </div>
                    <div>
                      password
                      <input
                        id='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                      />
                    </div>
                    <button id='login'>login</button>
                  </form>
                </div>
              )
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App