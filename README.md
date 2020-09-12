# react-global-state

> Easy-to-use global state for react
>
> Build with the React Context Api and the useReducer hook
>
> For more advanced state management you should consider [React-Redux](https://react-redux.js.org/)

[![NPM](https://img.shields.io/npm/v/@mdkroon/react-global-state.svg)](https://www.npmjs.com/package/@mdkroon/react-global-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Main content

- [How to install this package](#install)
- [Getting started](#getting-started)
- [How to use the dispatch function](#how-to-use-the-dispatch-function)
- [Documentation and Examples](#documentation)
- [Changelog](#changelog)

## How to install this package

```bash
npm install --save @mdkroon/react-global-state
```

## Getting started

### 1. Wrap the 'StateProvider' around your app and initialise the global state

```jsx
import React, { Component } from 'react'
import { StateProvider } from '@mdkroon/react-global-state'
import MyApp from 'components/MyApp'

const initialState = {
  player: 'John',
  score: 280,
  settings: {
    mode: 'advanced',
    volume: 10,
  },
}

const MyAppWrapper = () => {
  return (
    <StateProvider
      initialState={initialState}
      displayName='ReactGlobalState'
    >
      <MyApp/>
    </StateProvider>
  )
}

export default MyAppWrapper
```


### 2. Use the global state in a subcomponent
Import the useContextState hook from '@mdkroon/react-global-state'

Use the state variable from the useContextState hook

```jsx
import React, { Component } from 'react'
import { useContextState } from '@mdkroon/react-global-state'
import SubComponent from 'components/SubComponent'

const SubComponent = () => {
  const { state } = useContextState()

  return (
    <div>
      Player: {state.player}
    </div>
  )
}
```

### 3. Change a state variable in a subcomponent
Import the useContextState hook from '@mdkroon/react-global-state'

Use dispatch function to update the state

```jsx
import React, { Component } from 'react'
import { useContextState } from '@mdkroon/react-global-state'
import AnotherSubComponent from 'components/AnotherSubComponent'

const AnotherSubComponent = () => {
  const { dispatch } = useContextState()

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

## How to use the dispatch function

The dispatch function needs an object as argument.<br />
This object contains the parameters that are needed to update te state.

```js
dispatch({
  type: 'UPDATE',
  name: 'settings',
  property: 'volume',
  value: 8
})
```
|parameter|desciption|required/optional|
|---|---|--|
|`type`|type of dispatch|required|
|`name`|state variable name|required (but optional for `RESET`)|
|`value`|value to update/add/substract|required for `UPDATE` / `ADD`|
|`property`|object key|optional, and only for object variabels|

### Dispatch types

The following types are available:

|type|functionality|
|---|---|
|`UPDATE`| replace the state variable|
|`ADD`|add value to state variable (if integer), substract (if negative integer), concat (if string)|
|`RESET`|reset to initial state|
|`DELETE`|delete a variable of the state or a property of an object|

## Documentation

Documentation with examples of the dispatch function can be found in [documentation.md](DOCUMENTATION.md)

A demo can be viewed on [github pages](https://mdkroon.github.io/react-global-state/)

De source code of the demo can be found in the [/example](https://github.com/MDKroon/react-global-state/tree/master/example) folder of the in the github repo

## Changelog

Updates and fixes can be found in [changelog.md](CHANGELOG.md)

### Future updates
- Variable type checking (warning if wrong type)
- Support for array variables (delete, pop, push, shift, unshift)
- Deep merge for nested objects


## Credits

This project is bootstrapped with [create react library](https://github.com/transitive-bullshit/create-react-library)

## License

GNU GPLv3 © [Matthijs Kroon](https://github.com/MDKroon)
