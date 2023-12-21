// class HttpClient {
//   baseUrl

//   constructor(baseUrl) {
//     this.baseUrl = baseUrl
//   }

//   url(path, params) {
//     const url = new URL(path, this.baseUrl)
//     url.search = new URLSearchParams(params)
//     return url
//   }

//   async get(path, { params }) {
//     const res = await fetch(this.url(path, params), {
//       method: 'GET'
//     })
//     const json = res.json()
//     return json
//   }
  
//   async post(path, { data, params }) {
//     const res = await fetch(this.url(path, params), {
//       method: 'POST',
//       body: data ? JSON.stringify(data) : null
//     })
//     const json = res.json()
//     return json
//   }
  
//   async delete(path, { data, params }) {
//     const res = await fetch(this.url(path, params), {
//       method: 'DELETE',
//       body: data ? JSON.stringify(data) : null
//     })
//     const json = res.json()
//     return json
//   }

//   async put(path, { data, params }) {
//     const res = await fetch(this.url(path, params), {
//       method: 'PUT',
//       body: data ? JSON.stringify(data) : null
//     })
//     const json = res.json()
//     return json
//   }
// }

// const client = new HttpClient("http://localhost:8080/api/v1")

const axios = require("axios")
const { Constants } = require("./utils")

const client = axios.create({
  baseURL: Constants.baseApiUrl
})

module.exports = { client }