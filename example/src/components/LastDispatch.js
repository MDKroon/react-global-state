import React, { Fragment } from 'react'
import { actionKeys, useContextState } from 'react-global-state'
import Box from './Box'
import style from './demo.module.css'

const LastDispatch = () => {
  const { state } = useContextState()
  const dispatchKeys = state._dispatch && Object.keys(state._dispatch)

  const getKeyContent = (keyName, keyIndex) => {
    return (
      <Fragment key={keyIndex}>
        {dispatchKeys.findIndex((name) => name === keyName) !== -1 && <Fragment>
          <strong>{keyName}:</strong> {state._dispatch[keyName] || <em>[undefined]</em>}<br/>
        </Fragment>}
      </Fragment>
    )
  }

  return (
    <Box title='last dispatch' bgColor='grey'>
    <code>
      {'{'}
        <div className={style.globalState}>
          {state._dispatch
          ? actionKeys.map((keyName, keyIndex) => getKeyContent(keyName, keyIndex))
          : 'Nothing dispatched yet'}
        </div>
      {'}'}
    </code>
  </Box>
  )
}

export default LastDispatch
