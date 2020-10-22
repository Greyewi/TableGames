import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import { connect } from 'react-redux'

import { anchorSelector, setActiveDraw } from './drawDuck'

const AsideDrawer = ({
  children,
  anchor,
  anchorName,
  setActiveDraw,
  position = 'right',
}) => {
  const toggleDrawer = isOpen => event => {
    event.persist()
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setActiveDraw(isOpen)
  }

  return (
    <Drawer
      anchor={position}
      open={anchor === anchorName}
      onClose={toggleDrawer('')}
    >
      {children}
    </Drawer>
  )
}

export default connect(
  state => ({
    anchor: anchorSelector(state),
  }),
  {
    setActiveDraw,
  }
)(AsideDrawer)
