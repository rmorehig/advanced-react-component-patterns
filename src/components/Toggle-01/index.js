import React, {useState, useEffect} from 'react'
import {Switch} from '../Switch'

const Toggle = props => {
  const [on, setOn] = useState(false)
  const toggle = async () => {
    setOn(!on)
  }
  useEffect(() => {
    props.onToggle(on)
  }, [on, props])
  return <Switch on={on} onClick={toggle} />
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return <Toggle onToggle={onToggle} />
}
Usage.title = 'Build Toggle'

export {Toggle, Usage as default}
