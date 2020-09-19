import { update, updateObject, remove, error } from './general'

export function defaultUpdater(state, action) {
  switch (action.type) {
    case 'UPDATE':
      return update(state, action.name, action.value)
    case 'DELETE':
      return remove(state, action.name)
    default:
      error(state, action)
  }
}

export function numberUpdater(state, action) {
  switch (action.type) {
    case 'INCREMENT': {
      const value = state[action.name] ? state[action.name] + 1 : 1
      return update(state, action.name, value)
    }
    case 'DECREMENT': {
      const value = state[action.name] ? state[action.name] - 1 : -1
      return update(state, action.name, value)
    }
    case 'ADD': {
      const value = state[action.name]
        ? state[action.name] + action.value
        : action.value
      return update(state, action.name, value)
    }
    case 'SUBSTRACT': {
      const value = state[action.name]
        ? state[action.name] - action.value
        : -action.value
      return update(state, action.name, value)
    }
    default:
      return defaultUpdater(state, action)
  }
}

export function stringUpdater(state, action) {
  switch (action.type) {
    case 'ADD':
    case 'CONCAT': {
      const value = state[action.name]
        ? state[action.name].concat(action.value)
        : action.value
      return update(state, action.name, value)
    }
    default:
      return defaultUpdater(state, action)
  }
}

export function boolUpdater(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const value = Boolean(state[action.name]) || false
      return update(state, action.name, !value)
    }
    default:
      return defaultUpdater(state, action)
  }
}

export function arrayUpdater(state, action) {
  const tempArray = [...state[action.name]]

  switch (action.type) {
    case 'UPDATE':
      tempArray[action.index] = action.value
      break
    case 'PUSH':
      tempArray.push(action.value)
      break
    case 'UNSHIFT':
      tempArray.unshift(action.value)
      break
    case 'DELETE':
      tempArray.splice(action.index)
      break
    case 'POP':
      tempArray.pop(action.index)
      break
    case 'SHIFT':
      tempArray.shift(action.index)
      break
    default:
      error(state, action)
  }

  return update(state, action, tempArray)
}

export function objectUpdater(state, action) {
  if (!action.index) {
    // update object property
    // todo switch for different types
    return updateObject(state, action.name, action.property, action.value)
  } else if (!Array.isArray(state[action.name])) {
    // object property is array type
    // todo
  } else {
    // object inside an array
    // todo
  }
}
