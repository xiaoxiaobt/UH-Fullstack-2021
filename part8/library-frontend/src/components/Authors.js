import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS_AND_BOOKS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS_AND_BOOKS }],
    onError: (error) => {
      console.log(error)
      // notify(error.graphQLErrors[0].message)
    }
  })
  const submit = async (event) => {
    event.preventDefault()
    editAuthor({
      variables: { name, born: parseInt(born) }
    })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  //const authors = []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <select onChange={({ target }) => setName(target.value)}>
            {props.authors.map(a =>
              <option value={a.name} key={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            required
            min="0"
            step="1"
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
