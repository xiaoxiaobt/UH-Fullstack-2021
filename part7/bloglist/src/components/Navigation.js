import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'


const Navigation = ({ user, storage }) => {

  const dispatch = useDispatch()
  const handleLogout = () => {
    storage.logoutUser()
    dispatch({ type: 'LOGOUT', data: user })
  }
  if (!user) return null
  return (
    <>
      <p style={{ background: 'lightgrey' }}>
        <Link to={'/blogs'} style={{ padding: '10px' }}>blogs</Link>
        <Link to={'/users'} style={{ padding: '10px' }}>users</Link>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
    </>
  )
}

export default Navigation