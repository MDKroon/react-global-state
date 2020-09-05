import React from 'react'
import { StateProvider } from 'react-global-state'
import GlobalState from './GlobalState'
import Spacer from './Spacer'
import StateUpdater from './StateUpdater'
import style from './demo.module.css'

// define initial global state
const initialState = {
  id: 1,
  player: 'John',
  score: 0,
  settings: {
    mode: 'easy',
    volume: 10,
  },
  notes: 'Account created on 5-9-2020 21:23'
}

// wrap state provider around your app content
const Demo = () => {

  return (
    <StateProvider initialState={initialState}>
      <div className={style.demo}>
        <Spacer size='30'/>
        <header>
          <h1>Demo 'React Global State'</h1>
          <p>combination of the Context Api and the useReducer hook</p>
        </header>
        <Spacer size='30'/>
        <main>
          <div className={style.column}>
              <StateUpdater/>
            </div>
            <div className={style.column}>
              <GlobalState />
          </div>
        </main>
        <Spacer size='30'/>
        <footer>
          GNU GPLv3 © <a href='https://github.com/MDKroon'>Matthijs Kroon</a>
        </footer>
      </div>
    </StateProvider>
  )
}

export default Demo