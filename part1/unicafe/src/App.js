import { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Button = (props) => {
  const handleClick = () => {
    console.log("User clicked ", props.feedback);
    props.increment(props.curr_votes + 1)
  }
  return (
    <button onClick = {handleClick}>{props.feedback}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return <p>No feedback given</p>
  }

  const printAverage = () => {
    if (props.good + props.bad + props.neutral === 0) {
      return 0;
    }
    return (props.good - props.bad) / (props.good + props.neutral + props.bad)
  }

  const calculatePercentPositive = () => {
    if (props.good + props.bad + props.neutral === 0) {
      return 0 + "%";
    }
    return (props.good / (props.good + props.neutral + props.bad)) * 100 + "%"
  }

  const average = printAverage()
  const positive_percentage = calculatePercentPositive()

  return (
    <div>
      <table>
        <StatisticLine text = "good" value = {props.good} />
        <StatisticLine text = "neutral" value = {props.neutral} />
        <StatisticLine text = "bad" value = {props.bad} />
        <StatisticLine text = "all" value = {props.good + props.neutral + props.bad} />
        <StatisticLine text = "average" value = {average} />
        <StatisticLine text = "positive" value = {positive_percentage} />
      </table>
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
      <Button feedback = {"good"} increment = {setGood} curr_votes = {good}/>
      <Button feedback = {"neutral"} increment = {setNeutral} curr_votes = {neutral} />
      <Button feedback = {"bad"} increment = {setBad} curr_votes = {bad} />
      <Header text = {"statistics"} />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App
