const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE_NOTIFICATION':
      return `new anecdote '${action.data.content}'`
    case 'INCREASE_VOTE_NOTIFICATION':
      return `you voted '${action.data.content}'`
    default:
      return ''
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