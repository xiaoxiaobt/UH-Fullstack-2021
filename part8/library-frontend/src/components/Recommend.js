import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommend = ({ show, books }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const result = useQuery(ME)
  useEffect(() => {
    if (result?.data) {
      setFavoriteGenre(result.data.me.favoriteGenre)
    }
  }, [result])

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
          {books.filter(b => b.genres.includes(favoriteGenre)).map(a =>
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