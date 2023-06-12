import { useEffect, useState } from 'react'
import axios from 'axios'

const Entry = ({person, filter}) => {
  if (person.name.toLowerCase().includes(filter.toLowerCase())) {
    return (
      <p>{person.name} {person.number}</p>
    )
  }
}

const NumbersDisplay = ({persons, filter}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person => <Entry person = {person} key = {person.name} filter = {filter}/>)}
    </div>
  )
}

const Filter = ({filter, setNewFilter}) => {
  const updateFilter = (event) => {
    setNewFilter(event.target.value)
  }
  return (
    <div>
      filter those with 
      <input value = {filter} onChange = {updateFilter}
      />
    </div>
  )
}

const InputForm = ({newName, newNumber, setNewName, setNewNumber, persons, setPersons}) => {
  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
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
    <form onSubmit = {addEntry}>
      <h2>add a new</h2>
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
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons').then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      filter = {filter} 
      setNewFilter = {setNewFilter}
      />
      <InputForm
      newName = {newName}
      newNumber = {newNumber}
      setNewName = {setNewName}
      setNewNumber = {setNewNumber}
      persons = {persons}
      setPersons = {setPersons}
      />
      <NumbersDisplay persons = {persons} filter = {filter}/>
    </div>
  )
}

export default App