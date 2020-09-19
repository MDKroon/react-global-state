const dispatchTypes = [
  'UPDATE',
  'DELETE',
  'INCREMENT',
  'DECREMENT',
  'ADD',
  'SUBSTRACT',
  'CONCAT',
  'TOGGLE',
  'PUSH',
  'UNSHIFT',
  'POP',
  'SHIFT'
]

const validateValue = (state, action) => {
  let valid = false
  let type = ''

  if (!action.index) {
    if (action.property) {
      // object
      valid = typeof action.value === typeof state[action.name][action.property]
      type = typeof state[action.name][action.property]
    } else {
      // string, number, bool, function
      valid = typeof action.value === typeof state[action.name]
      type = typeof state[action.name]
    }
  } else {
    if (!action.property) {
      // array
      valid = typeof action.value === typeof state[action.name][action.index]
      type = typeof state[action.name][action.index]
    } else {
      // nested array & object
      if (Array.isArray(state[action.name])) {
        valid =
          typeof action.value ===
          typeof state[action.name][action.index][action.property]
        type = typeof state[action.name][action.index][action.property]
      } else {
        valid =
          typeof action.value ===
          typeof state[action.name][action.property][action.index]
        type = typeof state[action.name][action.property][action.index]
      }
    }
  }

  if (!valid) {
    throw new Error(
      `Invalid action.value: was expecting a ${type}, did get a ${typeof action.value}`
    )
  }
}

export function validateAction(state, action) {
  // validate action.type
  if (!dispatchTypes.includes(action.type)) {
    throw new Error(`Invalid action.type: ${action.type} is unknown`)
  }

  // validate action.name
  if (
    action.name &&
    (typeof action.name === 'object' || action.name.length === 0)
  ) {
    throw new Error('Invalid action.name')
  }

  // validate action.property
  if (
    action.property &&
    !(typeof action.property === 'string' && action.property.length > 0)
  ) {
    throw new Error('Invalid action.property')
  }

  // validate action.index
  if (
    action.index &&
    !(typeof action.index === 'number' && action.index >= 0)
  ) {
    throw new Error('Invalid action.index')
  }

  // validate action.value
  action.value && validateValue(state, action)
}
