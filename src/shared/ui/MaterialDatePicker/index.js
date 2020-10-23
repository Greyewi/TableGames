import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import './style.scss'

const renderTextField = ({
  input,
  defaultValue,
  label,
  type,
  initial,
  value,
  disabled,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hinttext={label}
    floatinglabeltext={label}
    error={touched && error ? true : false}
    {...input}
    {...custom}
    label={touched && error ? error : label}
    type={type}
    defaultValue={value || defaultValue}
    InputLabelProps={{
      shrink: true,
    }}
    disabled={disabled ? true : false}
  />
)

const renderTextFieldTimeFirefox = ({
  input,
  defaultValue,
  label,
  type,
  initial,
  value,
  disabled,
  meta: { touched, error },
  ...custom
}) => (
  <span className="custom-datefield">
    <TextField
      hinttext={label}
      floatinglabeltext={label}
      error={touched && error ? true : false}
      {...input}
      {...custom}
      label={touched && error ? error : label}
      type={type}
      defaultValue={input.value || defaultValue}
      value={input.value.split('T')[0]}
      disabled={disabled ? true : false}
      InputLabelProps={{
        shrink: true,
      }}
    />
    <TextField
      onChange={e =>
        input.onChange(input.value.split('T')[0] + 'T' + e.target.value)
      }
      value={input.value.split('T')[1]}
      label={'Время'}
      type={'time'}
      defaultValue={input.value || defaultValue}
      disabled={disabled ? true : false}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </span>
)

const renderTextFieldFirefox = ({
  input,
  defaultValue,
  label,
  type,
  initial,
  value,
  disabled,
  meta: { touched, error },
  ...custom
}) => (
  <span className="custom-datefield">
    <TextField
      hinttext={label}
      floatinglabeltext={label}
      error={touched && error ? true : false}
      {...input}
      {...custom}
      label={touched && error ? error : label}
      type={type}
      defaultValue={input.value || defaultValue}
      value={input.value.split('T')[0]}
      disabled={disabled ? true : false}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </span>
)

class MaterialDatePicker extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['date', 'datetime-local']),
  }

  static defaultProps = {
    type: 'datetime-local',
  }

  render() {
    const { type, ...props } = this.props
    let dateType = type,
      component = renderTextField

    if (navigator.userAgent.indexOf('Firefox') > 0) {
      if (dateType === 'datetime-local' || dateType === 'datetime') {
        component = renderTextFieldTimeFirefox
        dateType = 'date'
      } else {
        component = renderTextFieldFirefox
      }
    }

    if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
      if (dateType === 'datetime-local' || dateType === 'datetime') {
        component = renderTextFieldTimeFirefox
        dateType = 'date'
      } else {
        component = renderTextFieldFirefox
      }
    }

    return <Field {...props} type={dateType} component={component} />
  }
}

export default MaterialDatePicker
