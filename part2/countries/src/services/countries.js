import axios from "axios"

const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"

const getAll = () => {
    return axios.get(allUrl)
}

const getOne = (name) => {
    return axios.get(`${baseUrl}/${name}`)
}

export default({getAll})