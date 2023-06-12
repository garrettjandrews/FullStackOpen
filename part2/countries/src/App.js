import {useState, useEffect} from "react"
import countryService from "./services/countries"

const SearchForm = ({filter, setFilter, setCountries, countries}) => {
  const handleChange = (event) => {
    setFilter(event.target.value)
    countryService.getAll()
    .then(response => setCountries(response.data.filter(e => e.name.common.toLowerCase().includes(event.target.value.toLowerCase()))))
  }

  return (
    <form>
      find countries
      <input
      value = {filter}
      onChange = {handleChange}
      />
    </form>
  )
}

const Result = ({filter, countries}) => {
  if (filter === "") {
    return <p>Type something to search for countries.</p>
  }

  if (countries.length > 10) {
    return <p>Too many countries.  Try refining your search.</p>
  }

  if (countries.length == 0) {
    return <p>No countries found.</p>
  }

  if (countries.length > 1) {
    return (
      <ul>
      {countries.map(country => <li key = {country.name.official}>{country.name.common}</li>)}
      </ul>
    )
  }

  // at this point we have found the country we want
  return <CountryResult countries = {countries[0]}/>
}

const CountryResult = ({countries}) => {
  console.log(countries)
  let languages = []
  for (let i in countries.languages) {
    languages = languages.concat(countries.languages[i])
  }
  return(
    <div>
      <h2>{countries.name.official}</h2>
      <p>capital: {countries.capital}</p>
      <p>area: {countries.area}</p>
      <h3>languages:</h3>
      <ul>
        {
          languages.map(lang => <li key = {lang}>{lang}</li>)
        }
      </ul>
      <img src={countries.flags.svg}/>
    </div>
  )
}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
    .getAll()
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <SearchForm filter={filter} setFilter = {setFilter} 
      countries = {countries} setCountries = {setCountries}/>
      <Result filter = {filter} countries = {countries}/>
    </div>
  )
}

export default App;
