import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Field } from 'redux-form'
import DebounceField from 'redux-form-debounce-field'

const renderTextField = ({
  input,
  name,
  defaultValue,
  label,
  value,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    helperText={touched && error ? error : ''}
    error={!!(touched && error)}
    id={name}
    name={name}
    floatinglabeltext={label}
    errortext={touched && error ? error : ''}
    {...input}
    {...custom}
    label={label}
    defaultValue={value}
  />
)

const MaterialInput = ({ debounce, width = '100%', ...props }) => {
  if (debounce) {
    return (
      <DebounceField
        style={{ width: width }}
        {...props}
        wait={debounce}
        component={renderTextField}
      />
    )
  } else {
    return (
      <Field {...props} style={{ width: width }} component={renderTextField} />
    )
  }
}

export default MaterialInput
