class Observable {
  _listeners = []

  _state

  constructor(initState) {
    this._state = initState
    this.emit(initState)
  }

  emit(state) {
    if (state == this._state) return
    
    this._state = state
    
    for (const listener of this._listeners) {
      listener(state)
    }
  }

  subscribe(listener) {
    this._listeners.push(listener)
    if (this._state) {
      listener(this._state)
    }
  }

  unsubscribe(listener) {
    if (!this._listeners.includes(listener)) throw `no listener ${listener}`
    this._listeners.splice(this._listeners.indexOf(listener), 1)
  }

  close() {
    this._listeners = []
  }

  get state() {
    return this._state
  }
}


class ObserverHTMLElement extends HTMLElement {
  _observable
  _stateCallback

  constructor(observable) {
    super()
    this._observable = observable
    this._stateCallback = this.onStateChange.bind(this)
  }

  connectedCallback() {
    this._observable.subscribe(this._stateCallback)
  }

  
  disconnectedCallback() {
    this._observable.unsubscribe(this._stateCallback)
  }

  /* eslint-disable */
  onStateChange(state) {}
}


module.exports = {
  Observable,
  ObserverHTMLElement
}