// simple-store.js
const createStore = (reducer, initialState) => {
  let state = initialState
  const listeners = []

  const getState = () => state

  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener(state))
  }

  const subscribe = listener => {
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  return { getState, dispatch, subscribe }
}

export { createStore }
