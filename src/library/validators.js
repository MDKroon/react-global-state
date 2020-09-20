import { dispatchTypes } from './constants'

// allow empty action keys
export function isAllowed(variable) {
  return variable === null || typeof variable === 'undefined'
}

// check string variable
export function hasValidString(variable) {
  return typeof variable === 'string' && variable.length > 0
}

// check index
export function hasValidIndex(index) {
  return typeof index === 'number' && index >= 0
}

// validate action variables
export function validateAction(state, action) {
  const actionKeys = Object.keys(action)

  // validate action.type
  if (!dispatchTypes.includes(action.type)) {
    throw new Error(`Invalid action.type: ${action.type} is unknown`)
  }

  // validate action.name
  if (
    actionKeys.findIndex((key) => key === 'name') &&
    !(hasValidString(action.name) || isAllowed(action.name))
  ) {
    throw new Error(
      'Invalid action.name: should be of type string and length > 0'
    )
  }

  // validate action.property
  if (
    actionKeys.findIndex((key) => key === 'property') &&
    !(hasValidString(action.property) || isAllowed(action.property))
  ) {
    throw new Error(
      'Invalid action.property: should be of type string and length > 0'
    )
  }

  // validate action.index
  if (
    actionKeys.findIndex((key) => key === 'index') &&
    !(hasValidIndex(action.index) || isAllowed(action.index))
  ) {
    throw new Error('Invalid action.index: should be of type number and >= 0')
  }

  // validate action.value
  if (
    actionKeys.findIndex((key) => key === 'value') &&
    !isAllowed(action.value)
  ) {
    let valid = false
    let type = ''

    if (!hasValidIndex(action.index)) {
      if (hasValidString(action.property)) {
        // object
        valid =
          typeof action.value === typeof state[action.name][action.property]
        type = typeof state[action.name][action.property]
      } else {
        // string, number, bool, function
        valid = typeof action.value === typeof state[action.name]
        type = typeof state[action.name]
      }
    } else {
      if (!hasValidString(action.property)) {
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
}
