const config = require('../../config')

class Constants {
  static baseUrl = `http://${config.HOST}:${config.PORT}`
  static currentRecipeId = 'currentRecipeId'

  static baseApiUrl = `http://${config.API_HOST}:${config.API_PORT}/api/v1/`
  // static baseApiUrl = 'http://localhost:8080/api/v1/'
  static baseImageUrl = this.baseApiUrl + 'image/'

  static recipePlaceholder = "https://placehold.co/400x400/lightgrey/grey?text=No+image"
  static groceryPlaceholder = "https://placehold.co/100x100/lightgrey/grey?text=No+image"
}

function getPathSegments(href) {
  const segments = new URL(href).pathname.split('/')
  segments.splice(0, 1)
  return segments
}

module.exports = {
  Constants,
  getPathSegments,
}