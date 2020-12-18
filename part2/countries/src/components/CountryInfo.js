import React from 'react'
import RenderCountry from "./RenderCountry"
const CountryInfo = ({ filteredList, setKeyword }) => {

    if (filteredList.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (filteredList.length === 1) {
        const country = filteredList[0]
        return <RenderCountry country={country}/>


    } else {
        const filtered = filteredList.map(p => <p key={p.name}>{p.name} <button onClick={(event) => setKeyword(p.name)}>show</button></p>)
        return filtered
    }


}
export default CountryInfo