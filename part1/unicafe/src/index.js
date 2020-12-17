import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistic = ({ text, value }) => {
  return (
    <>
      <tr>
        <td>{text}</td><td>{value}</td>
      </tr>
    </>
  )
}


const Statistics = (props) => {
  const { good, neutral, bad } = props
  if (good + neutral + bad === 0)
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + neutral + bad} />
          <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
          <Statistic text="positive" value={100 * good / (good + neutral + bad) + "%"} />
        </tbody>
      </table>
    </>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)