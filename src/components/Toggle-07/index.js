import React, {useState, useEffect} from 'react'
import {Switch} from '../Switch'

const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))

const Toggle = props => {
  const [on, setOn] = useState(false)
  const toggle = () => {
    setOn(!on)
  }
  useEffect(() => {
    props.onToggle(on)
  }, [on, props])
  const getStateAndHelpers = () => {
    return {
      on,
      toggle,
      getTogglerProps,
    }
  }
  const getTogglerProps = ({onClick, ...props}) => {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return props.children(getStateAndHelpers())
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
  onButtonClick = () => alert('onButtonCLick'),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, getTogglerProps}) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} {...getTogglerProps({on})} />
          <hr />
          <button
            {...getTogglerProps({
              'aria-label': 'custom-button',
              id: 'custom-button-id',
              onClick: onButtonClick,
            })}
          >
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Props collections'

export {Toggle, Usage as default}
