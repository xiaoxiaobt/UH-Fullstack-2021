import React, { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyword, setKeyword] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(personList => setPersons(personList))
      .catch(error => console.log('fail'))
  }, [])


  const addContact = event => {
    event.preventDefault();

    if (persons.map(x => x.name).includes(newName)) {
      const res = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (res) {
        const oldObject = persons.find(x => x.name === newName)
        const cloned = { ...oldObject, number: newNumber }
        personService
          .update(oldObject.id, cloned)
          .then(response => setPersons(persons.map(x => x.name === newName ? cloned : x)))
          .catch(error => console.log('fail'))
      }
    } else {
      const newObject = { name: newName, number: newNumber }
      personService
        .create(newObject)
        .then(responseObject => setPersons(persons.concat(responseObject)))
        .catch(error => console.log('fail'))
      console.log(persons)
    }
  }

  const deleteEntry = p => {
    const result = window.confirm(`Delete ${p.name}?`)
    if (result) {
      personService
        .remove(p.id)
        .then(response => setPersons(persons.filter(other => other.id !== p.id)))
        .catch(error => console.log('fail'))
    }
  }


  const filteredList = persons.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setKeyword={setKeyword} />
      <h3>add a new</h3>
      <PersonForm addContact={addContact}
        handleNameChange={event => setNewName(event.target.value)}
        handleNumberChange={event => setNewNumber(event.target.value)} />
      <h3>Numbers</h3>
      <Persons filteredList={filteredList} deleteEntry={deleteEntry} />
    </div>
  )
}


export default App