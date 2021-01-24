import React from 'react'
import { connect } from 'react-redux'
// import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const anecdotes = useSelector(({ anecdotes, filter }) =>
  //   anecdotes.filter(x => x.content.includes(filter))
  // )
  // const dispatch = useDispatch()

  // const handleVoteChange = async (anecdote) => {
  //   dispatch(increaseVote(anecdote.id))
  //   dispatch(voteNotification(anecdote.content, 5000))
  // }

  const handleVoteChange = (anecdote) => {
    props.increaseVote(anecdote.id)
    props.voteNotification(anecdote.content, 5000)
  }

  return (
    <>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteChange(anecdote)}>vote</button>
          </div>
        </div>
      )
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(x => x.content.includes(state.filter))
  }
}

const mapDispatchToProps = {
  increaseVote,
  voteNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

// export default AnecdoteList
export default ConnectedAnecdotes      