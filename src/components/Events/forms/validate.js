const validate = ({ name }) => {
  const errors = {}
  if (!name) errors.name = 'Enter event name'

  return errors
}

export default validate
