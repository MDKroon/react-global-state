# Documentation

## Content

[Dispatch types examples](#dispatch-types-example)
- [UPDATE](#update)
- [ADD](#add)
- [RESET](#reset)
- [DELETE](#delete)

## Dispatch types example

Consider the following example:
```js
initialState = {
  player: 'Player1',
  score: 0,
  settings: {
    mode: 'easy',
    volume: 5
  },
  notes: ''
}

state = {
  player: 'John',
  score: 280,
  settings: {
    mode: 'advanced',
    volume: 10,
    paypal: 'john@gmail.com',
  },
  notes: 'Account created on 2020-09-12 21:23'
}
```

### Update

Update one variable

```js
// change player to Chuck
dispatch({
  type: 'UDPATE',
  name: 'player',
  value: 'Chuck'
})
```

Update one property of an object variable

```js
// change mode to easy
dispatch({
  type: 'UDPATE',
  name: 'settings',
  property: 'mode',
  value: 'easy'
})
```

### Add

Add a value to a state variable

```js
// add 8 to score, so score will be 288
dispatch({
  type: 'ADD',
  name: 'score',
  value: 8
})
```
Add a value to a property of an object state variable

```js
// increase volume by 2, so it will be 12
dispatch({
  type: 'ADD',
  name: 'settings',
  property: 'volume',
  value: 2
})
```

### Reset

Full reset

```js
// reset state to initial state
dispatch({
  type: 'RESET'
})
```
Reset only one variable

```js
// reset score variable to initial score '0'
dispatch({
  type: 'RESET',
  name: 'score'
})
```
Reset only one property of an object variable

```js
// reset volume variable to initial volume '5'
dispatch({
  type: 'RESET',
  name: 'settings',
  property: 'volume'
})
```

### Delete

Delete one variable

```js
// delete notes from state
dispatch({
  type: 'DELETE',
  name: 'notes'
})
```
Delete one property of an object variable

```js
// delete paypal (so settings object has only mode and volume)
dispatch({
  type: 'DELETE',
  name: 'settings',
  property: 'paypal'
})
```
