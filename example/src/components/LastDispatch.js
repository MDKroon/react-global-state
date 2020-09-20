import React, { Fragment } from 'react'
import { useContextState } from 'react-global-state'
import Box from './Box'
import style from './demo.module.css'

const GlobalState = () => {
  // get state from useContextState hook
  const { state } = useContextState()

  return (
    <Box title='last dispatch' bgColor='grey'>
    <code>
      {'{'}
        {state._dispatch
          ? <div className={style.globalState}>
              <strong>type:</strong> {state._dispatch.type}<br/>
              {state._dispatch.name && <Fragment>
                <strong>name:</strong> {state._dispatch.name}<br/>
              </Fragment>}
              {state._dispatch.property && <Fragment>
                <strong>property:</strong> {state._dispatch.property}<br/>
              </Fragment>}
              {state._dispatch.index && <Fragment>
                <strong>index:</strong> {state._dispatch.index}<br/>
              </Fragment>}
              {Object.keys(state._dispatch)
                     .filter((key) => key === 'value') !== -1 && <Fragment>
                <strong>value:</strong> {state._dispatch.value}<br/>
              </Fragment>}
            </div>
          : <div className={style.globalState}>
              Nothing dispatched yet
            </div>}
      {'}'}
    </code>
  </Box>
  )
}

export default GlobalState
