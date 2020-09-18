import React, { createContext, useReducer, useContext } from 'react'
import { basicUpdater, arrayUpdater, objectUpdater } from './updaters'

const AppContext = createContext({})

export const StateProvider = ({
  initialState = {},
  displayName = 'ReactGlobalState',
  children
}) => {
  AppContext.displayName = displayName

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'UPDATE': {
          if (action.property) {
            return objectUpdater(state, action)
          } else if (action.index >= 0) {
            return arrayUpdater(state, action)
          } else {
            return basicUpdater(state, action)
          }
        }
        case 'ADD':
          if (action.property) {
            const value = state[action.name][action.property]
              ? state[action.name][action.property] + action.value
              : action.value
            return objectUpdater(state, action, value)
          } else {
            const value = state[action.name]
              ? state[action.name] + action.value
              : action.value
            return basicUpdater(state, action, value)
          }
        case 'RESET':
          if (action.property && action.name) {
            const value = initialState[action.name]
              ? initialState[action.name][action.property]
              : undefined
            return objectUpdater(state, action, value)
          } else if (action.name) {
            return basicUpdater(state, action, initialState[action.name])
          } else {
            return {
              ...initialState
            }
          }
        case 'DELETE': {
          const tempState = { ...state }
          if (action.property && action.name) {
            delete tempState[action.name][action.property]
          } else {
            delete tempState[action.name]
          }
          return {
            ...tempState
          }
        }
        default:
          throw new Error(
            `You tried to dispatch type '${action.type}', but this type is not recognized.`
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
