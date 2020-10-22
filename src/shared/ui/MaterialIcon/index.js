import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import red from '@material-ui/core/colors/red'

// Смотри иконки тут -> https://material.io/tools/icons/?icon=3d_rotation&style=baseline

Icon.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  name: PropTypes.string,
}

class MaterialIcon extends Component {
  render() {
    const { onClick, classes, name, color, ...props } = this.props
    return (
      <div className={classes.root} onClick={onClick} {...props}>
        <Icon className={classes.icon} color={color}>
          {name}
        </Icon>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
})

export default withStyles(styles)(MaterialIcon)
