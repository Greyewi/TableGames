export const urlParser = position => {
  if (
    window.location.pathname &&
    window.location.pathname.split('/')[position]
  ) {
    return decodeURIComponent(window.location.pathname.split('/')[position])
  }
}

export const getCurrentGame = () => window.location.href.split('/')[3]

export const getModelDataStorage = modelName => {
  const activeGame = getCurrentGame()
  return (
    (localStorage.getItem(activeGame) &&
      JSON.parse(localStorage.getItem(activeGame)) &&
      JSON.parse(localStorage.getItem(activeGame))[modelName]) ||
    []
  )
}

export const setModelDataStorage = (modelName, data) =>
  localStorage.setItem(getCurrentGame(), JSON.stringify({ [modelName]: data }))
