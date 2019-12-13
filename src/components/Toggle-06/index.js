import React, {useState, useEffect} from 'react'
import {Switch} from '../Switch'

const Toggle = props => {
  const [on, setOn] = useState(false)
  const toggle = () => {
    setOn(!on)
  }
  const getStateAndHelpers = () => {
    return {
      on,
      toggle,
      togglerProps: {
        onClick: toggle,
        'aria-pressed': on,
      },
    }
  }
  useEffect(() => {
    props.onToggle(on)
  }, [on, props])

  return props.children(getStateAndHelpers())
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, togglerProps}) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} {...togglerProps} />
          <hr />
          <button aria-label="custom-button" {...togglerProps}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Props collections'

export {Toggle, Usage as default}
