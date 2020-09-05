import React from 'react'
import { useContextState } from 'react-global-state'
import Box from './Box'
import style from './demo.module.css'

const GlobalState = () => {
  // get state from useContextState hook
  const { state } = useContextState()

  return (
    <Box title='global state' bgColor='grey'>
      <code>
        {'{'}
          <div className={style.globalState}>
            <strong>id:</strong> {state.id}<br/>
            <strong>player:</strong> {state.player}<br/>
            <strong>score:</strong> {state.score}<br/>
            <strong>settings:</strong> {'{'}
              <ul>
                <li><strong>mode:</strong> {state.settings.mode}</li>
                <li><strong>volume:</strong> {state.settings.volume}</li>
              </ul>
            {'}'}<br/>
            <strong>notes:</strong> {state.notes}<br/>
          </div>
        {'}'}
      </code>
    </Box>
  )
}

export default GlobalState