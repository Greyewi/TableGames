import React from 'react'
import { Route, Switch, useParams } from 'react-router-dom'
import AsideMenu from './AsideMenu'
import Events from 'components/Events'
import items from 'components/Items'
import Characteristic from 'components/Characteristics'
import Characters from 'components/Characters'

const Story = () => {
  const pathKey = Object.keys(useParams())

  return (
    <main>
      <AsideMenu path={useParams()[pathKey]}>
        <Switch>
          <Route path={`/:${pathKey}/events`} component={Events} />
          <Route path={`/:${pathKey}/items`} component={items} />
          <Route path={`/:${pathKey}/characters`} component={Characters} />
          <Route
            path={`/:${pathKey}/characteristics`}
            component={Characteristic}
          />
        </Switch>
      </AsideMenu>
    </main>
  )
}

export default Story
