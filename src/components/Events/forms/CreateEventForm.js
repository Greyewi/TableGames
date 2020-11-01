import React from 'react'
import { reduxForm } from 'redux-form'
import MaterialInput from '../../../shared/ui/MaterialInput'
import MaterialCheckbox from '../../../shared/ui/MaterialCheckbox'
import { Button } from '@material-ui/core'
import { FormGroup, ButtonContainer } from '../style'
import Typography from '@material-ui/core/Typography'
import validate from './validate'

const CreateEventForm = ({ onClose, handleSubmit }) => (
  <FormGroup role="presentation" onSubmit={handleSubmit}>
    <Typography variant="h4">Create new event form </Typography>
    <MaterialInput required label="name" name="name" />
    <MaterialCheckbox label="isCompleted" name="isCompleted" />
    <ButtonContainer>
      <Button variant="outlined" color="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="outlined" type="submit" color="primary">
        Create
      </Button>
    </ButtonContainer>
  </FormGroup>
)

export default reduxForm({
  form: 'addEvent',
  validate,
})(CreateEventForm)
