import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS_AND_BOOKS } from '../queries'

const NewBook = ({setErrorMessage, show, setError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  

  const [addBook] = useMutation(ADD_BOOK, {
    //refetchQueries: [{ query: ALL_AUTHORS_AND_BOOKS }],
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS_AND_BOOKS })
      store.writeQuery({
        query: ALL_AUTHORS_AND_BOOKS,
        data: {
          ...dataInStore,
          allAuthors: [ ...dataInStore.allAuthors, response.data.addBook.author ],
          allBooks: [ ...dataInStore.allBooks, response.data.addBook ]
        }
      })
    }
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    if (genres.length === 0) setErrorMessage("Genres cannot be empty")
    else addBook({
      variables: { title, author, published: parseInt(published), genres }
    })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
            required
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
            required
            min="0"
            step="1"
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook