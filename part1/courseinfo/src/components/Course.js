import React from 'react'

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(x => <Part key={x.id} name={x.name} exercises={x.exercises} />)}
    </>
  )
}

const Footer = (props) => {
  return (
    <p><b>total of {props.sum} exercises</b></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Footer sum={course.parts.map(x => x.exercises).reduce((a, b) => a + b)} />
    </div>
  )
}

export default Course