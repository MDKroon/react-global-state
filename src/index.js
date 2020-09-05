import React, { createContext, useReducer, useContext } from 'react'

const AppContext = createContext({})

export const StateProvider = ({
  initialState = {},
  displayName = 'ReactGlobalState',
  children
}) => {
  AppContext.displayName = displayName

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE':
        if (action.property) {
          return {
            ...state,
            [action.name]: {
              ...state[action.name],
              [action.property]: action.value
            }
          }
        } else {
          return {
            ...state,
            [action.name]: action.value
          }
        }
      case 'ADD':
        if (action.property) {
          return {
            ...state,
            [action.name]: {
              ...state[action.name],
              [action.property]:
                state[action.name][action.property] + action.value
            }
          }
        } else {
          return {
            ...state,
            [action.name]: state[action.name] + action.value
          }
        }
      case 'RESET':
        if (action.property && action.name) {
          return {
            ...state,
            [action.name]: {
              ...state[action.name],
              [action.property]: initialState[action.name][action.property]
            }
          }
        } else if (action.name) {
          return {
            ...state,
            [action.name]: initialState[action.name]
          }
        } else {
          return {
            ...initialState
          }
        }
      default:
        throw new Error()
    }
  }, initialState)

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
