import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryInfo from "./components/CountryInfo"
import Filter from "./components/Filter"

const App = () => {
  const [countries, setCountries] = useState([])
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const filteredList = countries.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))


  return (
    <div>
      <Filter setKeyword={setKeyword} />
      <Persons filteredList={filteredList} setKeyword={setKeyword} />
    </div>
  )
}


export default App