import { Spacer } from '@mdkroon/react-ui-components'
import React, { Fragment } from 'react'
import { useContextState } from 'react-global-state'
import style from './demo.module.css'

const InputWithDispatch = ({type = 'UPDATE', name, property = null, defaultValue = null,
    placeholder = 'Type some text', inputType = 'text', addButtons = false}) => {

  // get state and dispatch function from useContextState hook
  const { state, dispatch } = useContextState()

  // dispatch change to the global state
  const onChange = (value) => {
    dispatch({type, name, property, value})
  }

  const labelName = property ? property : name

  return (
    <div className={style.inputWithDispatch}>
        <label htmlFor={`${labelName}-input`}>
          {type} {labelName}
        </label>
        {!addButtons ?
          <input
            type={inputType}
            id={`${labelName}-input`}
            name={labelName}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={(e) => onChange(e.target.value)}
            data-lpignore='true'
          /> : <Fragment>
            <Spacer height={4}/>
            <button onClick={() => onChange(1)}>Add 1</button>
            <button onClick={() => onChange(-1)}>Substract 1</button>
            <button onClick={() => onChange(10)}>Add 10</button>
            <button onClick={() => onChange(-10)}>Substract 10</button>
          </Fragment>
        }
        <Spacer height={4}/>
        <div><span>{labelName}:</span> {property ? state[name][property] : state[name]}</div>
    </div>
  )
}

export default InputWithDispatch