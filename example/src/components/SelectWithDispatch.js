import React, { Fragment } from 'react'
import { useContextState } from 'react-global-state'
import Spacer from './Spacer'
import style from './demo.module.css'

const SelectWithDispatch = ({type = 'UPDATE', name, property = '', options}) => {

  // get state and dispatch function from useContextState hook
  const { state, dispatch } = useContextState()

  // dispatch change to the global state
  const onChange = (value) => {
    dispatch({type, name, property, value})
  }

  const labelName = property ? property : name
  const stateValue = property ? state[name][property] : state[name]
  const getOptions = () => {
    return options.map((option, index) => {
        return <option value={option} key={index}>{option}</option>
    })
  }

  return (
    <div className={style.selectWithDispatch}>
        <label htmlFor={`${labelName}-select`}>
          {type} {labelName}
        </label>
        <select
          name={name}
          id={`${labelName}-select`}
          defaultValue={stateValue}
          onChange={(e) => onChange(e.target.value)}
        >
          {getOptions()}
        </select>
        <Spacer size='4'/>
        <div><span>{labelName}:</span> {stateValue}</div>
    </div>
  )
}

export default SelectWithDispatch