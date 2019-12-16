import React, {useState} from 'react'
import {Switch} from '../Switch'

const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))

const Toggle = props => {
  const {onToggle, onReset, initialOn} = props
  const [on, setOn] = useState(initialOn)

  const toggle = () => {
    callAll(setOn, onToggle)(!on)
  }
  const reset = () => {
    callAll(setOn, onReset)(false)
  }

  const getTogglerProps = ({onClick, ...props}) => {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  const getStateAndHelpers = () => {
    return {
      on,
      toggle,
      reset,
      getTogglerProps,
    }
  }

  return props.children(getStateAndHelpers())
}

function Usage({
  initialOn = false,
  onToggle = (...args) => console.log('onToggle', ...args),
  onReset = (...args) => console.log('onReset', ...args),
}) {
  return (
    <Toggle
      initialOn={initialOn}
      onToggle={onToggle}
      onReset={onReset}
    >
      {({getTogglerProps, on, reset}) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} {...getTogglerProps({on})} />
          <hr />
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
    </Toggle>
  )
}

Usage.defaultProps = {
  initialOn: false,
}
Usage.title = 'Component state initializers'

export {Toggle, Usage as default}
