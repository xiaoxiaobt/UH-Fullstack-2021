const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGIN_FAILED':
      return state
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default reducer