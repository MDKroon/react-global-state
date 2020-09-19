import { Spacer } from '@mdkroon/react-ui-components'
import React, { Fragment } from 'react'
import { useContextState } from 'react-global-state'
import Box from './Box'
import InputWithDispatch from './InputWithDispatch'
import SelectWithDispatch from './SelectWithDispatch'

const StateUpdater = () => {
  // get state and dispatch function from useContextState hook
  const { state, dispatch } = useContextState()

  return (
    <Fragment>
      <Box title='change string variable'>
        <InputWithDispatch
          name='player'
          placeholder='Type some text to update'
        />
        <Spacer height={24}/>
        <InputWithDispatch
          type='CONCAT'
          name='notes'
          placeholder='Type some text to add'
          addButton
          splitText
        />
      </Box>
      <Box title='change integer variable'>
        <InputWithDispatch
          name='id'
          placeholder='Type integer to update'
        />
        <Spacer height={24}/>
        <InputWithDispatch
          type='ADD'
          name='score'
          placeholder={state.score}
          inputType='number'
          addButtons
        />
      </Box>
      <Box title='change array'>
        <InputWithDispatch
          name='awards'
          index={0}
          placeholder='Change index 0 of array'
        />
      </Box>
      <Box title='change object'>
        <SelectWithDispatch
          name='settings'
          property='mode'
          options={['easy', 'advanced', 'wizard']}
        />
        <Spacer height={24}/>
        <InputWithDispatch
          name='settings'
          property='volume'
          defaultValue={state.settings.volume}
          inputType='number'
        />
      </Box>
      <Box title='reset'>
        <Spacer height={8}/>
        <button onClick={() => dispatch({type: 'RESET'})}>
          Reset state to initial state
        </button>
        <Spacer height={8}/>
        <button onClick={() => dispatch({type: 'RESET', name: 'settings', property: 'music'})}>
          Reset an undefined property
        </button>
        <Spacer height={8}/>
        <button onClick={() => dispatch({type: 'DELETE', name: 'notes'})}>
          Delete notes
        </button>
      </Box>
      <Box title='errors'>
        <Spacer height={8}/>
        <button onClick={() => dispatch({type: 'CODING_SUCKS'})}>
          Dispatching an unknown type will throw an error
        </button>
      </Box>
    </Fragment>
  )
}

export default StateUpdater
