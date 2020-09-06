# react-global-state

> Easy-to-use global state for react
>
> Build with the React Context Api and the useReducer hook
>
> For more advanced state management you should consider [React-Redux](https://react-redux.js.org/)

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
    <StateProvider initialState={initialState} displayName='ReactGlobalState'>
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
You can import the dispatch function to update the state

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
## Dispatch object parameters

```js
dispatch({
  type: 'UPDATE',
  name: 'settings',
  property: 'volume',
  value: '8'
})
```
type:

`'UPDATE'` -> replace the state variable

`'ADD'` -> add value to state variable (if integer), substract (if negative integer), concat (if string)

`'RESET'` -> reset to initial state

name: variable name

value: new value or value to add/substract

property: object key (optional; can only be used for object variabels)

## Reset

Full reset to inital state

```js
dispatch({ type: 'RESET'})
```
Reset only one variable

```js
dispatch({ type: 'RESET', name: 'score'})
```
Reset only one property of an object variable

```js
dispatch({ type: 'RESET', name: 'settings', property: 'volume'})
```

## Example
A demo made with the [create react app](https://www.npmjs.com/package/create-react-app) boilerplate can be viewed [here on github pages](https://mdkroon.github.io/react-global-state/)

De src code of the demo can be found in /example folder

## Future updates
- Support for array variables (delete, pop, push, shift, unshift)
- Deep merge for nested objects
- Variable type checking (warning if wrong type)

## Credits

This project is bootstrapped with [create react library](https://github.com/transitive-bullshit/create-react-library)

## License

GNU GPLv3 © [Matthijs Kroon](https://github.com/MDKroon)
