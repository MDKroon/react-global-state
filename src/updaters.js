export function basicUpdater(state, action, value = null) {
  return {
    ...state,
    [action.name]: value || action.value
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
