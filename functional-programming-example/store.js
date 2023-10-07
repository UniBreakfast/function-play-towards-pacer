import { forEach, concat, indexOf, splice } from './functions.js'

// simple-store.js
const createStore = (reducer, initialState) => {
  let state = initialState
  let listeners = []

  const getState = () => state

  const dispatch = action => {
    state = reducer(state, action)
    forEach(listeners, listener => listener(state))
  }

  const subscribe = listener => {
    listeners = concat(listeners, listener)

    return () => {
      const index = indexOf(listeners, listener)
      
      listeners = splice(listeners, index, 1)
    }
  }

  return { getState, dispatch, subscribe }
}

export { createStore }
