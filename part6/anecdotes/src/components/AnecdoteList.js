
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter(x => x.content.includes(filter))
  )
  const dispatch = useDispatch()

  const handleVoteChange = async (anecdote) => {
    dispatch(increaseVote(anecdote.id))
    dispatch(voteNotification(anecdote.content, 5000))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
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

export default AnecdoteList