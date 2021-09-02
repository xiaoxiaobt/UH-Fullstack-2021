import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS_WITH_GENRE } from '../queries'
// import { set } from 'mongoose';

const Recommend = ({ show }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [books, setBooks] = useState([])
  const result_me = useQuery(ME)
  const [getBooks, result_books] = useLazyQuery(ALL_BOOKS_WITH_GENRE, { variables: { genre: favoriteGenre } })
  useEffect(() => {
    if (result_me.data) {
      setFavoriteGenre(result_me.data.me.favoriteGenre)
      getBooks(favoriteGenre)
    }
  }, [result_me, favoriteGenre, getBooks])

  useEffect(() => {
    if (result_books.data) {
      setBooks(result_books.data.allBooks)
    }
  }, [result_books])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
export default Recommend