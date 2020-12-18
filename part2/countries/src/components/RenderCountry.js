import React, { useState, useEffect } from 'react'
import axios from 'axios'
const RenderCountry = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeatherData] = useState({ temperature: 0, weather_icons: [], wind_speed: 0, wind_dir: ""})
    useEffect(() => {
        console.log(api_key)
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setWeatherData(response.data.current)
                console.log(response.data)
            })
    }, [])

    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map(x => <li key={x.iso639_1}> {x.name} </li>)}
            </ul>
            <img src={country.flag} alt="flag" height="100"></img>
            <h3>Weather in {country.capital}</h3>
            <p><b>temperature</b>: {weather.temperature}</p>

            <img alt="weatherIcon" src={weather.weather_icons[0]}></img>
            <p><b>wind</b>: {weather.wind_speed} mph direction {weather.wind_dir}</p>

        </div>
    )
}
export default RenderCountry