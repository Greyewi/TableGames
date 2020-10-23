import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import MaterialInput from '../../../shared/ui/MaterialInput'
import {Button} from "@material-ui/core"
import {FormGroup, ButtonContainer, ButtonContainerBottom} from '../style'
import Typography from "@material-ui/core/Typography"
import validate from './validate'
import CardMedia from '@material-ui/core/CardMedia'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '20px',
  },
  media: {
    height: 140,
  },
})

let EditGameForm = ({initialValues, onClose, onRemove, handleSubmit}) => {
  const classes = useStyles()

  return <FormGroup
    role="presentation"
    onSubmit={handleSubmit}
  >
    <Typography variant="h4">Edit game data </Typography>
    <MaterialInput required label="name" name="name"/>
    <MaterialInput required label="genre" name="genre"/>
    <Card
      className={classes.root}
    >
      <CardMedia
        className={classes.media}
        image={initialValues && initialValues.logo}
        title={initialValues && initialValues.logo}
      />
    </Card>
    <MaterialInput required label="logo" name="logo"/>
    <MaterialInput required label="countGamers" name="countGamers"/>
    <MaterialInput multiline label="description" name="description"/>
    <ButtonContainer>
      <Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="outlined" type="submit" color="primary">Confirm</Button>
    </ButtonContainer>
    <ButtonContainerBottom>
      <Button variant="outlined" color="secondary" onClick={onRemove}>Delete</Button>
    </ButtonContainerBottom>
  </FormGroup>
}

EditGameForm = reduxForm({
  form: 'editGame',
  validate,
})(EditGameForm)

EditGameForm = connect(({ games }) => ({
  initialValues: games.activeGame,
}))(EditGameForm)

export default EditGameForm
