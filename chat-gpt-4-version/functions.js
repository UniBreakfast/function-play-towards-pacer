// Functional Wrappers
const getById = id => document.getElementById(id)
const map = (fn, arr) => arr.map(fn)
const filter = (fn, arr) => arr.filter(fn)

// State Manipulation Functions
const getInput = el => el.value
const emptyInput = el => { el.value = '' }

// Helper to remove item by index
const removeByIndex = (arr, index) => 
  filter((_, i) => i !== index, arr)

export {
  getById,
  map,
  filter,
  getInput,
  emptyInput,
  removeByIndex,
}
