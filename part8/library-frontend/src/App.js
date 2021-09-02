import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommend from './components/Recommend'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS_AND_BOOKS } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_AUTHORS_AND_BOOKS)
  const client = useApolloClient()

  if (result.loading) {
    return <div>loading...</div>
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const Tabs = () => {
    if (token) {
      return (
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={() => logout()}>log out</button>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>log in</button>
        </div>
      )
    }
  }

  return (
    <div>
      <Tabs />
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === 'authors'} authors={result.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={result.data.allBooks}
      />

      <NewBook
        show={page === 'add'} setError={notify}
      />

      <Recommend
        show={page === 'recommend'} books={result.data.allBooks}
      />

      <LoginForm
        show={page === 'login'} setError={notify} setToken={setToken}
      />
    </div>
  )
}

export default App