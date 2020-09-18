export function basicUpdater(state, action, value = null) {
  return {
    ...state,
    [action.name]: value || action.value
  }
}

export function arrayUpdater(state, action, value = null) {
  const tempArray = [...state[action.name]]
  tempArray[action.index] = value || action.value
  return {
    ...state,
    [action.name]: tempArray
  }
}

export function objectUpdater(state, action, value = null) {
  return {
    ...state,
    [action.name]: {
      ...state[action.name],
      [action.property]: value || action.value
    }
  }
}
