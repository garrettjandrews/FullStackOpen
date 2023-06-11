import { useState } from 'react'

const Entry = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "123-456-7890"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const newEntry = {name: newName, number:newNumber}
    const newPersons = persons.concat(newEntry)

    // check for existing entry before continuing
    if (persons.some(entry => entry.name === newName)) {
      alert (`${newName} is already added to phonebook`)
      return
    }

    setPersons(newPersons)

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addEntry}>
        <div>
          name: <input value = {newName} onChange = {handleChange}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Entry person = {person} key = {person.name}/>)}
    </div>
  )
}

export default App