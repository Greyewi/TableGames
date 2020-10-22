import React from 'react'
import { connect } from 'react-redux'

import {
  characteristicsListSelector,
  activeCharacteristicSelector,
  initCharacteristicList,
  setActiveCharacteristic,
  changeActiveCharacteristic,
  removeCharacteristic,
  createCharacteristic,
} from 'ducks/characteristic'

const Characteristic = () => {
  return <div></div>
}

export default connect(
  state => ({
    characteristicsList: characteristicsListSelector(state),
    activeCharacteristic: activeCharacteristicSelector(state),
  }),
  {
    initCharacteristicList,
    setActiveCharacteristic,
    changeActiveCharacteristic,
    removeCharacteristic,
    createCharacteristic,
  }
)(Characteristic)
