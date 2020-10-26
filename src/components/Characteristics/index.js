import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setActiveDraw } from 'shared/ui/Drawer/drawDuck'
import CreateCharacteristic from './CreateCharacteristic'

import {
  characteristicsListSelector,
  activeCharacteristicSelector,
  initCharacteristicList,
  setActiveCharacteristic,
  changeActiveCharacteristic,
  removeCharacteristic,
  createCharacteristic,
} from 'ducks/characteristic'

const Characteristic = ({ initCharacteristicList, ...props }) => {
  useEffect(() => {
    initCharacteristicList()
  }, [initCharacteristicList])

  const handleCreateCharacteristic = ({ name, unit, minValue, maxValue }) =>
    createCharacteristic({ name, unit, minValue, maxValue })

  return (
    <main>
      <CreateCharacteristic onSubmit={handleCreateCharacteristic} {...props} />
    </main>
  )
}

export default connect(
  state => ({
    characteristicsList: characteristicsListSelector(state),
    activeCharacteristic: activeCharacteristicSelector(state),
  }),
  {
    setActiveDraw,
    initCharacteristicList,
    setActiveCharacteristic,
    changeActiveCharacteristic,
    removeCharacteristic,
    createCharacteristic,
  }
)(Characteristic)
