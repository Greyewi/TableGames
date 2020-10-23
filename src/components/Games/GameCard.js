import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import AsideDrawer from 'shared/ui/Drawer'
import EditGameForm from './forms/EditGameForm'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    display: 'inline-block',
    margin: '10px',
  },
})

const GameCard = props => {
  const {
    handleChangeGame,
    setActiveGame,
    onClose,
    onRemove,
    name = "name of game",
    logo = "https://images-na.ssl-images-amazon.com/images/I/811Fbht0DLL.png",
    genre = ""
  } = props

  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={logo}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {genre}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={setActiveGame}>
          Edit
        </Button>
        <AsideDrawer anchorName={name}>
          <EditGameForm onSubmit={handleChangeGame} onClose={onClose} onRemove={onRemove}/>
        </AsideDrawer>
        <Link to={`/${name}`}>
          <Button size="small" color="primary">
            Stories
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default GameCard
