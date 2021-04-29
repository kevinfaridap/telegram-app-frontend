import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Signup from '../../pages/auth/Signup'
import Signin from '../../pages/auth/Signin'
import Chat from '../../pages/main/Chat'
import Verify from '../../pages/main/Verify'

function MainRoute() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/chat" component={Chat} />
          <Route path="/auth/:email" component={Verify} />
          {/* <Route exact path="/" component={Home} /> */}
           {/* <PrivateRoute path="/details/:idmovie" component={Details} /> */}
          

        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default MainRoute
