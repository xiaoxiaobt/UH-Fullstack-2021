import React from 'react'

const Notification = ({ className, message }) => {
  if (message) {
    return (
      <div className={className}>{message}</div>
    )
  } else
    return null
}

export default Notification