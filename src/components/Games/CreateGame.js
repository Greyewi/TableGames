import React from 'react'
import CreateGameForm from './forms/CreateGameForm'
import Button from '@material-ui/core/Button'
import { AddGameContainer } from './style'
import Typography from '@material-ui/core/Typography'
import AsideDrawer from '../../shared/ui/Drawer'

const CreateGame = ({ setActiveDraw, ...props }) => {
  return (
    <AddGameContainer>
      <Typography variant="h5">My Games</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setActiveDraw('createGame')}
      >
        Create new Game
      </Button>
      <AsideDrawer anchorName={'createGame'}>
        <CreateGameForm onClose={() => setActiveDraw('')} {...props} />
      </AsideDrawer>
    </AddGameContainer>
  )
}

export default CreateGame
