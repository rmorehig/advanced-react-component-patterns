import React, {useState, useEffect, useContext} from 'react'

import {Switch} from '../Switch'

const initialContext = {on: false, toggle: () => {}}
const ToggleContext = React.createContext(initialContext)

function ToggleConsumer(props) {
  const toggle = useContext(ToggleContext)
  if (!toggle) {
    throw new Error(
      'Toggle compound components must be rendered inside Toggle Provider',
    )
  }
  return props.children(toggle)
}
const ToggleOn = ({children}) => {
  const {on} = useContext(ToggleContext)
  return on ? children : null
}
const ToggleOff = ({children}) => (
  <ToggleConsumer>{({on}) => (on ? null : children)}</ToggleConsumer>
)
const ToggleButton = props => (
  <ToggleConsumer>
    {({on, toggle}) => <Switch on={on} onClick={toggle} {...props} />}
  </ToggleConsumer>
)

const Toggle = props => {
  const [on, setOn] = useState(false)
  const toggle = async () => {
    setOn(!on)
  }
  useEffect(() => {
    props.onToggle(on)
  }, [on, props])

  return (
    <ToggleContext.Provider value={{on, toggle}}>
      {props.children}
    </ToggleContext.Provider>
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
