import React, {useState, useEffect} from 'react'
import {Switch} from '../Switch'

const Toggle = props => {
  const [on, setOn] = useState(false)
  const toggle = () => {
    setOn(!on)
  }
  useEffect(() => {
    props.onToggle(on)
  }, [on, props])

  return props.children({on, toggle})
}

const CommonToggle = props => (
  <Toggle {...props}>
    {({on, toggle}) => <Switch on={on} onClick={toggle} />}
  </Toggle>
)
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, toggle}) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Render props'

export {Toggle, Usage as default}
