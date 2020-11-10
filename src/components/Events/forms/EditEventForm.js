import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import MaterialInput from '../../../shared/ui/MaterialInput'
import { Button } from '@material-ui/core'
import { FormGroup, ButtonContainer } from '../style'
import Typography from '@material-ui/core/Typography'
import validate from './validate'

let EditEventForm = ({ initialValues, onClose, handleSubmit }) => (
  <FormGroup role="presentation" onSubmit={handleSubmit}>
    <Typography variant="h4">Edit event data </Typography>
    <MaterialInput required label="name" name="name" />
    <ButtonContainer>
      <Button variant="outlined" color="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="outlined" type="submit" color="primary">
        Confirm
      </Button>
    </ButtonContainer>
  </FormGroup>
)

EditEventForm = reduxForm({
  form: 'editEvent',
  validate,
})(EditEventForm)

EditEventForm = connect(({ events }) => ({
  initialValues: events.activeEvent,
}))(EditEventForm)

export default EditEventForm
