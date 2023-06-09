import { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const FeedbackButton = (props) => {
  const handleClick = () => {
    console.log("User clicked ", props.feedback);
    props.increment(props.curr_votes + 1)
  }
  return (
    <button onClick = {handleClick}>{props.feedback}</button>
  )
}

const Stats = (props) => {
  return (
    <div>
      <ul>
        <li>good {props.good}</li>
        <li>neutral {props.neutral}</li>
        <li>bad {props.bad}</li>
      </ul>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text = {"give feedback"}/>
      <FeedbackButton feedback = {"good"} increment = {setGood} curr_votes = {good}/>
      <FeedbackButton feedback = {"neutral"} increment = {setNeutral} curr_votes = {neutral} />
      <FeedbackButton feedback = {"bad"} increment = {setBad} curr_votes = {bad} />
      <Header text = {"statistics"} />
      <Stats good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App
