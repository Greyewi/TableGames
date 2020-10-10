import React from 'react'
import {Route, Switch, useParams} from "react-router-dom"
import AsideMenu from './AsideMenu'
import Events from 'components/Events'
import items from 'components/Items'

const Story = () => {
  const pathKey = Object.keys(useParams())

  return <main>
    <AsideMenu path={useParams()[pathKey]}>
      <Switch>
        <Route path={`/:${pathKey}/events`} component={Events}/>
        <Route path={`/:${pathKey}/items`} component={items}/>
      </Switch>
    </AsideMenu>
  </main>
}

export default Story