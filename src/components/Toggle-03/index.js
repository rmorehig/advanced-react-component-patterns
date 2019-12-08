import React, {useState, useEffect} from 'react'
import {Switch} from '../Switch'

const ToggleOn = ({children}) => (
  <ToggleContext.Consumer>
    {({on}) => (on ? children : null)}
  </ToggleContext.Consumer>
)
const ToggleOff = ({children}) => (
  <ToggleContext.Consumer>
    {({on}) => (on ? null : children)}
  </ToggleContext.Consumer>
)
const ToggleButton = props => (
  <ToggleContext.Consumer>
    {({on, toggle}) => <Switch on={on} onClick={toggle} {...props} />}
  </ToggleContext.Consumer>
)

const ToggleContext = React.createContext()

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
