// create a new state variable
export function create(state, action) {
  let value = null

  switch (action.type) {
    case 'UPDATE':
      value = !action.index ? action.value : [action.value]
      break
    case 'ADD':
    case 'CONCAT':
      value = action.value
      break
    case 'INCREMENT':
      value = 1
      break
    case 'DECREMENT':
      value = -1
      break
    case 'SUBSTRACT':
      value = -action.value
      break
    case 'TOGGLE':
      value = true
      break
    case 'PUSH':
    case 'UNSHIFT':
      value = [action.value]
      break
    case 'POP':
    case 'SHIFT':
      value = []
      break
    case 'DELETE':
      value = undefined
      break
    default:
      error(state, action)
  }

  if (!action.property && !action.index) {
    return update(state, action.name, value)
  } else if (action.property && !action.index) {
    return updateObject(state, action.name, action.property, value)
  } else if (action.index && !action.property) {
    return updateArray(state, action.name, action.index, value)
  } else {
    // nested boject and array
    // todo
  }
}

// update a variable
export function update(state, name, value) {
  return {
    ...state,
    [name]: value
  }
}

// update an index of an array variable
export function updateArray(state, name, index, value) {
  const tempArray = state[name] ? [...state[name]] : []
  tempArray[index] = value
  return update(state, name, tempArray)
}

// update a property from an object variable
export function updateObject(state, name, property, value) {
  const tempObject = state[name] ? { ...state[name] } : {}
  tempObject[property] = value
  return update(state, name, tempObject)
}

// delete variable from the state
export function remove(state, name) {
  const tempState = { ...state }
  delete tempState[name]
  return { ...tempState }
}

// reset to the inital state
export function reset(state, action, initialState) {
  if (!action.name) {
    // reset complete state
    return { ...initialState }
  } else {
    if (action.property && action.index) {
      if (!Array.isArray(state[action.name])) {
        // array inside an object
        // todo
      } else {
        // object inside an array
        // todo
      }
    } else if (action.property) {
      // reset an object variable
      const value =
        initialState[action.name] && initialState[action.name][action.property]
          ? initialState[action.name][action.property]
          : undefined
      return updateObject(state, action.name, action.property, value)
    } else if (action.index) {
      // reset an array variable
      const value =
        initialState[action.name] && initialState[action.name][action.index]
          ? initialState[action.name][action.index]
          : undefined
      return updateArray(state, action.name, action.index, value)
    } else {
      // reset other types
      return update(state, action, initialState[action.name])
    }
  }
}

// throw a new error for wrong dispatch type
export function error(state, action) {
  throw new Error(
    `You tried to dispatch type '${
      action.type
    }', but this type is not available for ${typeof state[
      action.name
    ]} variables.`
  )
}
