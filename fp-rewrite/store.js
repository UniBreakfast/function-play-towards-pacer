export {createStore}

const createStore = (initialState, applyChange) => {
  let state = initialState
  let handlers = []
  
  const getCurrentState = () => state

  const subscribeOnStateChange = handleFn => {
    handlers = concat(handlers, handleFn)

    const unsubscribe = () => {
      const i = indexOf(handlers, handleFn)
      
      handlers = removeByIndex(handlers, i)
    }

    return unsubscribe
  }

  const requestChange = requiredChange => {
    state = applyChange(clone(state), requiredChange)

    forEach(handlers, handleFn => handleFn(state))
  }
  
  return {getCurrentState, subscribeOnStateChange, requestChange}
}

import {clone, forEach, concat, indexOf, removeByIndex} from './functions.js'
