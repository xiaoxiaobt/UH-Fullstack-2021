import React, { useState, useEffect } from 'react'
// import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Navigation from './components/Navigation'
import loginService from './services/login'
import storage from './utils/storage'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom'
import { notifyWith } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initializeBlogs, addComment } from './reducers/blogReducer'
import { handleLike } from './reducers/blogReducer'
import Container from '@material-ui/core/Container'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [comment, setComment] = useState('')
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

  const byLikes = (b1, b2) => b2.likes - b1.likes
  const matchUser = useRouteMatch('/users/:id')
  const oneBlogOwnedByUser = matchUser
    ? blogs.find(b => b.user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const matchedBlog = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  return (
    <div>
      <Container>
        <Navigation user={user} storage={storage} />
        <Switch>
          <Route path="/blogs/:id">
            {
              <div>
                <h2>blogs</h2>
                <Notification />
                {matchedBlog ?
                  <div>
                    <h2>{matchedBlog.title}</h2>
                    <Link to={matchedBlog.url}>{matchedBlog.url}</Link>
                    <div>likes {matchedBlog.likes}
                      <button onClick={() => dispatch(handleLike(matchedBlog.id))}>like</button>
                    </div>
                    <div>added by {matchedBlog.author}</div>
                    <h3>comments</h3>
                    <p>
                      <input id='newComment'
                        value={comment}
                        onChange={({ target }) => setComment(target.value)} />
                      <button onClick={() => dispatch(addComment(matchedBlog.id, comment))}>add comment</button>
                    </p>
                    {matchedBlog.comments ? matchedBlog.comments.map((c, i) => <li key={i}>{c}</li>) : null}
                  </div>
                  :
                  null
                }
              </div>
            }
          </Route>
          <Route path="/users/:id">
            {
              <div>
                <h2>blogs</h2>
                <Notification />
                {oneBlogOwnedByUser ?
                  <div>
                    <h2>{oneBlogOwnedByUser.user.name}</h2>
                    <h3>added blogs</h3>
                    {
                      blogs
                        .filter(b => b.user.id === oneBlogOwnedByUser.user.id)
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

                    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                      <NewBlog createBlog={handleNewBlog} />
                    </Togglable>

                    {
                      blogs.sort(byLikes).map(blog =>
                        <div key={blog.id} style={{ borderStyle: 'solid', marginBottom: '10px' }}>
                          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                        </div>
                      )
                    }
                  </div>
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
      </Container>
    </div>
  )
}

export default App