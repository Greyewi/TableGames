import React from 'react'
import {Field} from "redux-form"
import Checkbox from '@material-ui/core/Checkbox'

const renderCheckbox = ({
                          input,
                          defaultValue,
                          label,
                          ...custom
                        }) => (
    <label>
      <Checkbox
        {...input}
        {...custom}
        label={label}
        type="checkbox"
        defaultChecked={defaultValue}
      />
      {label}
    </label>
)

const MaterialCheckbox = ({...props}) => {
  return (
    <span className="checkbox__container"><Field {...props} component={renderCheckbox}/></span>
  )
}

export default MaterialCheckbox