import React, { useState } from 'react'

const Persons = ({ filteredList }) => filteredList.map(p => <p key={p.name}>{p.name} {p.number}</p>)

const PersonForm = ({ addContact, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addContact} >
      <div>
        name: <input onChange={handleNameChange} />
      </div>
      <div>number: <input onChange={handleNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ setKeyword }) => {
  return (
    <div>
      filter shown with
      <input onChange={(event) => setKeyword(event.target.value)} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault();
    if (persons.map(x => x.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const obj = { name: newName, number: newNumber }
      setPersons(persons.concat(obj))
    }
  }

  const filteredList = persons.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setKeyword={setKeyword} />
      <h3>add a new</h3>
      <PersonForm addContact={addContact} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredList={filteredList} />
    </div>
  )
}


export default App