import React from 'react'

const Persons = ({ filteredList }) => filteredList.map(p => <p key={p.name}>{p.name} {p.number}</p>)

export default Persons