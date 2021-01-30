var timeoutID

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return action.data
    case 'ERROR':
      return action.data
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