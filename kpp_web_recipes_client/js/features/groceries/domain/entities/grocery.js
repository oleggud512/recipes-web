class Grocery {
  constructor( 
    id = 0, 
    name = '',
    photoUrl = null
  ) {
    this.id = id
    this.name = name
    this.photoUrl = photoUrl
  }
}

module.exports = {
  Grocery
}