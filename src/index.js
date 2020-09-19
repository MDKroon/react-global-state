import React, { createContext, useReducer, useContext } from 'react'
import { create, remove } from './library/general'
import {
  defaultUpdater,
  numberUpdater,
  stringUpdater,
  boolUpdater,
  arrayUpdater,
  objectUpdater
} from './library/updaters'
import { validateAction } from './library/validators'

const AppContext = createContext({})

export const StateProvider = ({
  initialState = {},
  displayName = 'ReactGlobalState',
  validate = true,
  children
}) => {
  AppContext.displayName = displayName

  const [state, dispatch] = useReducer(
    (state, action) => {
      validate && validateAction(state, action)
      switch (typeof state[action.name]) {
        case 'number':
          return numberUpdater(state, action)
        case 'string':
          return stringUpdater(state, action)
        case 'bool':
          return boolUpdater(state, action)
        case 'function':
          return defaultUpdater(state, action)
        case 'object': {
          if (action.property) {
            return objectUpdater(state, action)
          } else if (Array.isArray(state[action.name])) {
            return arrayUpdater(state, action)
          } else {
            return create(state, action) // state[action.name] = null
          }
        }
        case 'undefined': {
          if (action.type !== 'RESET') {
            return create(state, action)
          } else {
            return remove(state, action, initialState)
          }
        }
        default:
          throw new Error(
            `You tried to update a '${typeof state[
              action.name
            ]}' variable, but this type is not supported yet.`
          )
      }
    },
    { ...initialState }
  )

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useContextState = () => {
  const globalState = useContext(AppContext)
  const { state, dispatch } = globalState

  return { state, dispatch }
}
