import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    // console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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