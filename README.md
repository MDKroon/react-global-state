# react-global-state

> Create an easy-to-use global state for react

[![NPM](https://img.shields.io/npm/v/@mdkroon/react-global-state.svg)](https://www.npmjs.com/package/@mdkroon/react-global-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @mdkroon/react-global-state
```

## Getting started

1. Wrap the 'StateProvider' around your app
2. Initialise the global state

```jsx
import React, { Component } from 'react'
import { StateProvider } from 'react-global-state'
import MyApp from 'components/MyApp'

const initialState = {
  player: 'John Doe',
  score: 280,
  settings: {
    mode: 'advanced',
    volume: 10,
  },
}

const MyAppWrapper = () => {
  return (
    <StateProvider initialState={initialState}>
      <MyApp/>
    </StateProvider>
  )
}

export default MyAppWrapper
```
3. Now you can use the state variables inside all the subcomponents and dispatch changes

## Use the global state in a subcomponent
You can simply import the state from 'react-global-state'

```jsx
import React, { Component } from 'react'
import { state } from 'react-global-state'
import SubComponent from 'components/SubComponent'

const SubComponent = () => {
  return (
    <div>
      Player: {state.player}
    </div>
  )
}
```

## Change a state variable in a subcomponent
You can import the dispatch function

```jsx
import React, { Component } from 'react'
import { dispatch } from 'react-global-state'
import AnotherSubComponent from 'components/AnotherSubComponent'

const AnotherSubComponent = () => {
  return (
    <div>
      <label htmlFor="player">Player:</label>
      <input
        type="text"
        id="player"
        name="player"
        defaultValue={state.player}
        onChange={(e) => dispatch({
          type: 'UPDATE',
          name: 'player',
          value: e.target.value
        })}
      />
    </div>
  )
}
```
## Dispatch object keys

```js
dispatch({
  type: 'UPDATE',
  name: 'settings',
  key: 'volume',
  value: '8'
})
```
type:

`'UPDATE'` -> replace the state variable

`'ADD'` -> add value to state variable (if integer), substract (if negative integer), concat (if string)

`'RESET'` -> reset to initial state

name: variable name

value: new value or value to add/substract

key: object key (optional; can only be used for object variabels)

## Reset is possible

Full reset to inital state

```js
dispatch({ type: 'RESET'})
```
Partial reset: only reset one variable

```js
dispatch({ type: 'RESET', name: 'score'})
```
Partial reset: only reset one key of an object

```js
dispatch({ type: 'RESET', name: 'settings', key: 'volume'})
```

## Example
React example in /example folder

## Coming soon
- Support for array variables (delete, pop, push, shift, unshift)
- Deep merge for nested objects

## License

GNU GPLv3 © [MDKroon](https://github.com/MDKroon)
