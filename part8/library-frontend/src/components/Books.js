import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS_WITH_GENRE } from '../queries'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [getFiltered, result_books] = useLazyQuery(ALL_BOOKS_WITH_GENRE, { variables: { genre } })

  useEffect(() => {
    if (result_books.data) {
      setFilteredBooks(result_books.data.allBooks)
    }
  }, [result_books])

  if (!show) {
    return null
  }

  // const books = []

  return (
    <div>
      <h2>books</h2>
      <p>
        {genre ? "In genre " : ""}
        <b>{genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {[...new Set(books.flatMap(a => a.genres))].map(g =>
          <button key={g} onClick={() => { setGenre(g); getFiltered() }}>{g}</button>
        )}
        <button onClick={() => { setGenre(null); getFiltered() }}>all genres</button>
      </div>
    </div>
  )
}

export default Books