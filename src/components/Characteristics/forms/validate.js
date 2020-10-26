const validate = ({ name, unit, minValue, maxValue }) => {
  const errors = {}
  if (!name) errors.name = 'Enter characteristic name'
  if (!unit) errors.unit = 'Enter characteristic unit'
  if (!minValue) errors.minValue = 'Enter minimal value'
  if (!maxValue) errors.maxValue = 'Enter maximal value'
  if (typeof parseInt(minValue, 10) != 'number')
    errors.minValue = 'Minimal value must be a number'
  if (typeof parseInt(maxValue, 10) != 'number')
    errors.maxValue = 'Maximal value must be a number'

  return errors
}

export default validate
