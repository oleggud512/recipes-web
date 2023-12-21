const { Observable } = require("./observable")

function createStore(reducer, initialState) {
  let state = initialState
  return {
      dispatch: action => { state = reducer(state, action) },
      getState: () => state,
  }
}

class ReduxObservable extends Observable {

  constructor(reducer, initState) {
    const store = createStore(reducer, initState)
    super(store.getState())
    this._store = store
    this._state = store.getState()
  }

  dispatch(action) {
    this._store.dispatch(action)
    console.log({mes: 'DISPATCH', action})
    this.emit(this._store.getState())
  }
  
}

module.exports = { 
  createStore, 
  ReduxObservable 
}