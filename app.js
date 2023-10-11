import {createStore} from './store.js'
import {createVNode, render} from './virtual-dom.js'

const initialState = {items: []}

const add = (arr, {item}) => concat(arr, item)
const remove = (arr, {i}) => removeByIndex(arr, i)
const changeDict = {add, remove}

const processState = (prevState, processFn, change) => {
  const {items} = prevState

  return {items: processFn(items, change)}
} 

const applyChange = (prevState, requiredChange) => {
  const {type: changeType, ...change} = requiredChange
  const processFn = changeDict[changeType]
  const nextState = processState(prevState, processFn, change)

  return nextState
}

const {
  getState, requestChange, subscribeOnStateChange
} = createStore(initialState, applyChange)

const formAppVTree = (state, handlerDict) => {
  const {items} = state
  const {handleAdd, handleRemove} = handlerDict
  const appProps = {}
  const inputProps = {type: 'text', id: 'new-item', placeholder: 'type item here', onkeydown: handleAdd, style: 'font:20px Trebuchet MS'}
  const btnProps = {onclick: handleAdd, textContent: 'add', style: 'margin:10px'}
  const listProps = {style: 'list-style:none'}
  const inputVNode = createVNode('input', inputProps)
  const btnVNode = createVNode('button', btnProps)
  const itemsVNodes = map(
    items, 
    (text, i) => createItemVNode(text, () => handleRemove(i))
  )
  const listVNode = createVNode('ul', listProps, ...itemsVNodes)
  
  return createVNode('div', appProps, inputVNode, btnVNode, listVNode)
}

const createItemVNode = (text, removeHandler) => {
  const itemProps = { textContent: text, style: 'font:20px Trebuchet MS' }
  const btnProps = {textContent: 'remove' , onclick: removeHandler, style: 'margin:10px'}
  const btnVNode = createVNode('button', btnProps)
  
  return createVNode('li', itemProps, btnVNode)
}

const requireAdd = item => ({type: 'add', item})
const requireRemove = i => ({type: 'remove', i})

const handleAdd = e => {
  const input = getById('new-item')
  const value = getValue(input)

  doIf(() => {
    requestChange(requireAdd(value))
    removeValue(input)
  }, value && (e.target != input || e.key == 'Enter'))
}

const handleRemove = i => requestChange(requireRemove(i))

const handlerDict = {handleAdd, handleRemove}

const renderCurrent = state => {
  const appVTree = formAppVTree(state, handlerDict)

  render(appVTree, body)
}

renderCurrent(initialState)

subscribeOnStateChange(renderCurrent)

import {
  doIf,
  concat, map, removeByIndex,
  getById, getValue, removeValue,
} from './functions.js'
