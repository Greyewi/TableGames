const validate = ({name, genre, logo, countGamers}) => {
  const errors = {}
  if (!name) errors.name = 'Enter game name'
  if (!genre) errors.genre = 'Enter game genre'
  if (!logo) errors.logo = 'Put game logo img url'
  if (!countGamers) errors.countGamers = 'Enter count gamers'
  return errors
}

export default validate