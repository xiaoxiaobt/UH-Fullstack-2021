import React from 'react'

const Persons = ({ filteredList, deleteEntry }) => filteredList.map(p => <p key={p.name}>{p.name} {p.number} <button onClick={() => deleteEntry(p)}>delete</button></p>)

export default Persons