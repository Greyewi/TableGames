import React from 'react'
import GameCard from './GameCard'

const GamesList = ({setActiveGame, handleChangeGame, gamesList = []}) => gamesList.map((game, key) => <GameCard
  key={key}
  setActiveGame={() => setActiveGame(game)}
  handleChangeGame={({...game}) => handleChangeGame({...game}, key)}
  onClose={() => setActiveGame(null)}
  {...game}
/>)

export default GamesList