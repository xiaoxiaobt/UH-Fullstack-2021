import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState(null)
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
          {genre ?
            books.filter(b => b.genres.includes(genre)).map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ) : books.map(a =>
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
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        )}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books