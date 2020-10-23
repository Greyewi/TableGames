import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import GamesList from './GamesList'
import CreateGame from './CreateGame'

import {
  gamesListSelector,
  changeActiveGame,
  initGamesList,
  setActiveGame,
  createGame,
  removeActiveGame
} from 'ducks/games'

import { setActiveDraw } from 'shared/ui/Drawer/drawDuck'

const Games = ({
  changeActiveGame,
  createGame,
  initGamesList,
  gamesList,
  ...props
}) => {
  const handleAddGame = ({ name, genre, description, logo, countGamers }) =>
    createGame({ name, genre, description, logo, countGamers })

  useEffect(() => {
    initGamesList()
  }, [initGamesList])

  return (
    <main>
      <CreateGame onSubmit={handleAddGame} {...props} />
      <GamesList
        handleChangeGame={changeActiveGame}
        gamesList={gamesList}
        {...props}
      />
    </main>
  )
}

export default connect(state => ({
  gamesList: gamesListSelector(state),
}), {
  changeActiveGame,
  removeActiveGame,
  setActiveDraw,
  initGamesList,
  setActiveGame,
  createGame
})(Games)