import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  initItemList,
  setActiveItem,
  changeActiveItem,
  itemsListSelector,
} from 'ducks/items'

const Items = ({ initItemList }) => {
  useEffect(() => {
    initItemList()
  }, [initItemList])

  return <main>Items</main>
}

export default connect(
  state => ({
    itemsList: itemsListSelector(state),
  }),
  {
    initItemList,
    setActiveItem,
    changeActiveItem,
  }
)(Items)
