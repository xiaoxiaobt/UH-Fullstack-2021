import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    // case 'NEW_BLOG':
    //   return [...state, action.data].sort((a, b) => b.votes - a.votes)
    // case 'INIT_BLOGS':
    //   return action.data.sort((a, b) => b.votes - a.votes)
    // case 'INCREASE_VOTE':
    //   const id = action.data.id
    //   const anecdoteToChange = state.find(n => n.id === id)
    //   const changedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1
    //   }
    //   return state
    //     .map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    //     .sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

// export const increaseVote = (id) => {
//   return async dispatch => {
//     const allAnecdotes = await blogService.getAll()
//     const oldAnecdote = allAnecdotes.find(anecdote => anecdote.id === id)
//     await blogService.update(oldAnecdote.id, { ...oldAnecdote, votes: oldAnecdote.votes + 1 })
//     dispatch({
//       type: 'INCREASE_VOTE',
//       data: { id }
//     })
//   }
// }

// export const createBlog = (content) => {
//   return async dispatch => {
//     const newAnecdote = await blogService.createNew(content)
//     dispatch({
//       type: 'NEW_BLOG',
//       data: newAnecdote
//     })
//   }
// }

// export const initializeBlogs = () => {
//   return async dispatch => {
//     const anecdotes = await blogService.getAll()
//     dispatch({
//       type: 'INIT_BLOGS',
//       data: anecdotes
//     })
//   }
// }

export default reducer