const initialState = ''

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE_NOTIFICATION':
      return `you added '${action.data.content}'`
    case 'INCREASE_VOTE_NOTIFICATION':
      return `you voted '${action.data.content}'`
    case 'HIDE_NOTIFICATION':
      return ``
    default:
      return initialState
  }
}

export const voteNotification = (content) => {
  return {
    type: 'INCREASE_VOTE_NOTIFICATION',
    data: { content }
  }
}

export const newNotification = (content) => {
  return {
    type: 'NEW_ANECDOTE_NOTIFICATION',
    data: { content }
  }
}

export default reducer