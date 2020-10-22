import React, { Fragment } from 'react'
import 'App.scss'
import { Route, Switch } from 'react-router-dom'
import { Header } from 'components/Layout/Header'
import Layout from 'components/Layout'
import Games from 'components/Games'
import Story from 'components/Layout/Story'

const App = () => {
  return (
    <Fragment>
      <Header />
      <Layout>
        <Switch>
          <Route path="/:gameName" component={Story} />
          <Route path="/" component={Games} />
        </Switch>
      </Layout>
    </Fragment>
  )
}

export default App
