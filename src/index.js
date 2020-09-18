import React, { createContext, useReducer, useContext } from 'react'

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
          if (action.property && state[action.name][action.property]) {
            return {
              ...state,
              [action.name]: {
                ...state[action.name],
                [action.property]:
                  state[action.name][action.property] + action.value
              }
            }
          } else if (action.property) {
            return {
              ...state,
              [action.name]: {
                ...state[action.name],
                [action.property]: action.value
              }
            }
          } else if (state[action.name]) {
            return {
              ...state,
              [action.name]: state[action.name] + action.value
            }
          } else {
            return {
              ...state,
              [action.name]: action.value
            }
          }
        case 'RESET':
          if (action.property && action.name && initialState[action.name]) {
            return {
              ...state,
              [action.name]: {
                ...state[action.name],
                [action.property]: initialState[action.name][action.property]
              }
            }
          } else if (action.property && action.name) {
            return {
              ...state,
              [action.name]: {
                ...state[action.name],
                [action.property]: null
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
        case 'DELETE': {
          const tempState = state
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
