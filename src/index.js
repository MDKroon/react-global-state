import React, { createContext, useReducer, useContext } from 'react'

const AppContext = createContext({})

export const StateProvider = ({ initialState = {}, children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'UPDATE':
        if (action.key) {
          return {
            ...state,
            [action.name]: {
              ...state[action.name],
              [action.key]: action.value
            }
          }
        } else {
          return {
            ...state,
            [action.name]: action.value
          }
        }
      case 'ADD':
        if (action.key) {
          return {
            ...state,
            [action.name]: {
              ...state[action.name],
              [action.key]: state[action.name][action.key] + action.value
            }
          }
        } else {
          return {
            ...state,
            [action.name]: state[action.name] + action.value
          }
        }
      case 'RESET':
        if (action.key && action.name) {
          return {
            ...state,
            [action.name]: {
              ...state[action.name],
              [action.key]: initialState[action.name][action.key]
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
