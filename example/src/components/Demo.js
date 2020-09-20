import { Spacer } from '@mdkroon/react-ui-components'
import React from 'react'
import { StateProvider } from 'react-global-state'
import GlobalState from './GlobalState'
import LastDispatch from './LastDispatch'
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
    trial: true,
  },
  notes: 'Account created on 5-9-2020 21:23',
  awards: [
    'being awesome'
  ],
  multiplier: (x) => {return 2*x}
}

// wrap state provider around your app content
const Demo = () => {

  return (
    <StateProvider initialState={initialState} displayName='ReactGlobalStateDemo' validate={true}>
      <div className={style.demo}>
        <Spacer height={30}/>
        <header>
          <h1>Demo 'React Global State'</h1>
          <p>combination of the Context Api and the useReducer hook</p>
        </header>
        <Spacer height={30}/>
        <main>
          <div className={style.row}>
            <GlobalState/>
            <LastDispatch/>
          </div>
          <div className={style.row}>
            <StateUpdater/>
          </div>
        </main>
        <Spacer height={30}/>
        <footer>
          GNU GPLv3 © <a href='https://github.com/MDKroon'>Matthijs Kroon</a>
        </footer>
      </div>
    </StateProvider>
  )
}

export default Demo
