import React from 'react'

const Filter = ({ setKeyword }) => {
    return (
        <div>
            filter shown with
            <input onChange={(event) => setKeyword(event.target.value)} />
        </div>
    )
}

export default Filter