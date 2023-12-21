class Constants {
  static baseUrl = 'http://192.168.0.142:3022'
  static currentRecipeId = 'currentRecipeId'

  static baseApiUrl = 'http://192.168.0.142:8080/api/v1/'
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