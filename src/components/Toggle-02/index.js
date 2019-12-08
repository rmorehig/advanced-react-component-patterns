import React, {useState, useEffect} from 'react'
import {Switch} from '../Switch'

const ToggleOn = ({on, children}) => (on ? children : null)
const ToggleOff = ({on, children}) => (on ? null : children)
const ToggleButton = ({on, toggle, ...props}) => (
  <Switch on={on} onClick={toggle} {...props} />
)

const Toggle = props => {
  const [on, setOn] = useState(false)
  const toggle = async () => {
    setOn(!on)
  }
  useEffect(() => {
    props.onToggle(on)
  }, [on, props])

  return React.Children.map(props.children, child =>
    React.cloneElement(child, {
      on,
      toggle,
    }),
  )
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <ToggleOn>The button is on</ToggleOn>
      <ToggleOff>The button is off</ToggleOff>
      <ToggleButton />
    </Toggle>
  )
}
Usage.title = 'Build Toggle'

export {Toggle, Usage as default}
