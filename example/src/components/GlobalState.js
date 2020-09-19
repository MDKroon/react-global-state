import React, {Fragment} from 'react'
import { useContextState } from 'react-global-state'
import Box from './Box'
import SplitText from './SplitText'
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
                {Object.keys(state.settings).includes('music') && <li><strong>music:</strong> {state.settings.music}</li>}
              </ul>
            {'}'}<br/>
            {state.notes && <Fragment>
              <strong>notes:</strong><br/>
              <SplitText>{state.notes}</SplitText><br/>
            </Fragment>}
            <strong>awards:</strong> {'['}
              <ul>
                {state.awards.map((award, index) => {
                  return <li key={index}>{award}</li>
                })}
              </ul>
            {']'}<br/>
            <strong>multiplier:</strong> {state.multiplier.toString()}<br/>
          </div>
        {'}'}
      </code>
    </Box>
  )
}

export default GlobalState
