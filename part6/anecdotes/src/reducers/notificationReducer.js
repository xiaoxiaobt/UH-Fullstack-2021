var timeoutID

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE_NOTIFICATION':
      return `new anecdote '${action.data.content}'`
    case 'INCREASE_VOTE_NOTIFICATION':
      return `you voted '${action.data.content}'`
    case 'HIDE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const voteNotification = (content, time) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'INCREASE_VOTE_NOTIFICATION',
      data: { content }
    })
    timeoutID = setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, time)
  }
}

export const newNotification = (content, time) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'NEW_ANECDOTE_NOTIFICATION',
      data: { content }
    })
    timeoutID = setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, time)
  }
}

export default reducer