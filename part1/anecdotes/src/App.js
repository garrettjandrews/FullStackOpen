import { useState } from 'react'

const Button = ({setSelected, anecdotes}) => {
  const handleClick = () => {
    const min = 0
    const max = anecdotes.length - 1
    setSelected(Math.floor(Math.random() * (max - min)))
  }

  return (
    <button onClick = {handleClick}>next anecdote</button>
  )
}

const VoteButton = (props) => {
  const handleClick = () => {
    const newVotes = [...props.votes]
    newVotes[props.selected] += 1
    props.setVotes(newVotes)
  }

  return <button onClick = {handleClick}>vote</button>
}

const MostVotedAnecdote = ({votes, anecdotes}) => {

  // determine index that contains the maxmimum votes
  let max_votes = 0;
  let max_votes_index = 0;
  for (let i = 0; i < anecdotes.length; i++) {
    if (votes[i] > max_votes) {
      max_votes = votes[i]
      max_votes_index = i;
    }
  }

  return(
    <div>
      {anecdotes[max_votes_index]}
      <p>has {max_votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <h1> Anecdote of the Day </h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button selected={selected} setSelected = {setSelected} anecdotes = {anecdotes}/>
      <VoteButton selected = {selected} votes = {votes} setVotes = {setVotes}/>
      <h1> Anecdote with most votes </h1>
      <MostVotedAnecdote anecdotes = {anecdotes} votes = {votes}/>
    </div>
  )
}

export default App