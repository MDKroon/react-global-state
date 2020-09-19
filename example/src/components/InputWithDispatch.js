import { Spacer } from '@mdkroon/react-ui-components'
import React, { Fragment, useState } from 'react'
import { useContextState } from 'react-global-state'
import SplitText from './SplitText'
import style from './demo.module.css'

const InputWithDispatch = ({type = 'UPDATE', name, index = null, property = null, defaultValue = null, splitText = false,
    placeholder = 'Type some text', inputType = 'text', addButton = false, addButtons = false, parseInteger = false}) => {

  // get state and dispatch function from useContextState hook
  const { state, dispatch } = useContextState()

  // dispatch change to the global state
  const onChange = (value) => {
    const newValue = parseInteger ? parseInt(value, 10) || 0 : value
    dispatch({type, name, index, property, value: newValue})
  }

  const getContent = () => {
  const content = index
    ? state[name].map((item, index) => <span key={index}>{item}</span>)
    : property
      ? state[name][property]
      : state[name]
    return splitText ? <SplitText>{content}</SplitText> : content
  }

  const labelName = property ? property : name
  const [content, setContent] = useState(null)

  return (
    <div className={style.inputWithDispatch}>
        <label htmlFor={`${labelName}-input`}>
          {type} {labelName} {typeof index === 'number' && index >= 0 ? `(index ${index})` : ''}
        </label>
        {addButton ? <div className={style.inline}>
          <input
            type={inputType}
            id={`${labelName}-input`}
            name={labelName}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onChange('\n' + e.target.value)
                e.target.value = ''
              }}
            }
            data-lpignore='true'
          />
          <button onClick={() => onChange(
            ((property && state[name] && state[name][property]) ||
              (!property && name && state[name])) ? `\n${content}` : content
            )}
          >
            Add
          </button>
        </div> : addButtons ? <Fragment>
          <Spacer height={4}/>
          <button onClick={() => onChange(1)}>Add 1</button>
          <button onClick={() => onChange(-1)}>Substract 1</button>
          <button onClick={() => onChange(10)}>Add 10</button>
          <button onClick={() => onChange(-10)}>Substract 10</button>
        </Fragment> : <input
          type={inputType}
          id={`${labelName}-input`}
          name={labelName}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={(e) => onChange(e.target.value)}
          data-lpignore='true'
        />}
        <Spacer height={4}/>
        <div>
          <span>{labelName}:</span> {addButton && <br/>}{getContent()}
        </div>
    </div>
  )
}

export default InputWithDispatch
