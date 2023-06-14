import { useEffect, useState } from 'react'
import personService from "./services/persons"
import "./index.css"

const Header = ({successMessage, errorMessage}) => {
  if (successMessage) {
    return(
      <div>
        <h2>Phonebook</h2>
        <p className = "successful-action">{successMessage}</p>
      </div>
    )
  }
  if (errorMessage) {
    return(
      <div>
        <h2>Phonebook</h2>
        <p className = "failed-action">{errorMessage}</p>
      </div>
    )
  }
  return(
    <div>
      <h2>Phonebook</h2>
    </div>
  )
}

const Entry = ({persons, person, filter, setPersons}) => {
  const deleteEntry = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteEntry(person.id)
    }

    setPersons(persons.filter(thisPerson => thisPerson.id !== person.id))
  }

  if (person.name.toLowerCase().includes(filter.toLowerCase())) {
    return (
      <div>
        {person.name} {person.number}   
        <button onClick = {deleteEntry}>delete</button>
      </div>
    )
  }
}

const NumbersDisplay = ({persons, filter, setPersons}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person => <Entry persons = {persons} person = {person} key = {person.id} filter = {filter} setPersons = {setPersons}/>)}
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

const InputForm = ({newName, newNumber, setNewName, setNewNumber, persons, setPersons, setSuccessMessage, setErrorMessage}) => {
  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const newEntry = {name: newName, number:newNumber}

    // check for existing entry before continuing
    if (persons.some(entry => entry.name === newName)) {
      let personToUpdate = persons.filter(e => e.name === newName)[0]
      newEntry.id = personToUpdate.id

      // if user decides to update, then execute this block
      if (window.confirm(`Would you like to update ${personToUpdate.name}?`)) {
        personService
        .update(personToUpdate.id, newEntry)
        .then(response => {
          console.log(response)
          setPersons(persons.map(thisPerson => thisPerson.id !== personToUpdate.id ? thisPerson : response.data))
        })
        .then(setSuccessMessage(`Successfully updated ${newEntry.name}'s number to ${newEntry.number}.`))
        .catch(() => {
          setErrorMessage(`Information for ${newEntry.name} was already deleted.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      }
      return
    }

    // upload new entry to server
    personService
    .create(newEntry)
    .then(response => {
      setPersons(persons.concat(response.data))
      setSuccessMessage(`Successfully added ${newEntry.name}.`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    })
    .catch(error => {
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })

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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
    .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <Header successMessage={successMessage} errorMessage = {errorMessage}/>
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
      successMessage = {successMessage} setSuccessMessage = {setSuccessMessage}
      setErrorMessage = {setErrorMessage}
      />
      <NumbersDisplay persons = {persons} filter = {filter} setPersons = {setPersons}/>
    </div>
  )
}

export default App