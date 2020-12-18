import React from 'react'

const Filter = ({ setKeyword }) => {
    return (
        <div>
            find countries
            <input onChange={(event) => setKeyword(event.target.value)} />
        </div>
    )
}

export default Filter