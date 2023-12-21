export type Reducer = (state: any, action: { type: any }) => any
export type Store = { 
  dispatch: (action: { type: any }) => void, 
  getState: () => any 
}

export function createStore(
  reducer: Reducer, 
  initialState: any
) : Store

export class ReduxObservable {
  _state: any
  _store: Store
  constructor(reducer: Reducer, initState: any)

  dispatch(action: { type: any })
}