import React, { Component } from 'react'
import { Field } from 'redux-form'
import Select from 'react-select'
import { Label, FormGroup } from 'reactstrap'
import './style.scss'

const renderSelect = ({
  input: { name, onChange, onFocus, onBlur, onDrop, onDragStart, value },
  handleChange,
  defaultValue,
  label,
  onFetchingData,
  options,
  meta: { touched, error, initial },
  ...custom
}) => (
  <FormGroup>
    <Label for={name}>
      {error ? <span style={{ color: 'red' }}>{error}</span> : label}
    </Label>
    <Select
      hinttext={error}
      type="select"
      id={name}
      onChange={value => onChange(value.value)}
      options={options}
      name={name}
      onMenuOpen={onFetchingData}
      {...custom}
      floatinglabeltext={label}
      errortext={touched && error ? error : ''}
      label={touched && error ? error : label}
      addon={touched && error ? true : false}
      placeholder={
        defaultValue ? defaultValue : getValue(value || initial, options)
      }
    />
  </FormGroup>
)

const getValue = (value, options) => {
  let result = ''
  options.filter(f => f.value === value).map(item => (result = item.label))
  return result
}

class MaterialSelect extends Component {
  render() {
    const { name, ...props } = this.props
    return <Field {...props} component={renderSelect} name={name} />
  }
}

export default MaterialSelect
