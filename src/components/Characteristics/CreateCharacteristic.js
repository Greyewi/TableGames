import React from 'react'
import Button from '@material-ui/core/Button'
import { AddCharacteristicContainer } from './style'
import Typography from '@material-ui/core/Typography'
import AsideDrawer from '../../shared/ui/Drawer'
import CreateCharacteristicForm from './forms/CreateCharacteristicForm'

const CreateCharacteristic = ({ setActiveDraw, ...props }) => {
  return (
    <AddCharacteristicContainer>
      <Typography variant="h5">Characteristics</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setActiveDraw('createCharacteristic')}
      >
        Create
      </Button>
      <AsideDrawer anchorName={'createCharacteristic'}>
        <CreateCharacteristicForm
          onClose={() => setActiveDraw('')}
          {...props}
        />
      </AsideDrawer>
    </AddCharacteristicContainer>
  )
}

export default CreateCharacteristic
