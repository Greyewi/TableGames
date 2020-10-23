const validate = ({ name, isCompleted }) => {
  const errors = {}
  if (!name) errors.name = 'Enter event name'
  if (typeof isCompleted === "undefined" || isCompleted === "") errors.isCompleted = 'Enter 1 if event is completed'
  if (!/^[0-1]$/.test(isCompleted)) errors.isCompleted = 'Enter 0 or 1'
  return errors
}

export default validate
