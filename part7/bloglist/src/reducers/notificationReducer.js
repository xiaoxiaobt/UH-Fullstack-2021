var timeoutID

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return action.data
    case 'ERROR':
      return action.data
    case 'NEW_BLOG':
      return { type: 'SUCCESS', message: `a new blog '${action.data.title}' by ${action.data.author} added!` }
    case 'DELETE_BLOG':
      return { type: 'SUCCESS', message: 'ok' }
    default:
      return state
  }
}

export const notifyWith = (message, type = 'SUCCESS') => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({ type, data: { message, type } })
    timeoutID = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }
}

export default reducer