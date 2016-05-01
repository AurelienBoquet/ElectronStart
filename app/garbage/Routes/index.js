import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

window.__DEVTOOLS__ = !(process.env.NODE_ENV === 'production');
import { combineReducers } from "redux"
import { Provider } from "react-redux"
import createStore from "redux/createStore"
import * as reducers from "reducers"
const store = createStore(combineReducers(reducers))

import App from "components/App"
import PageHome from "components/PageHome"
import PageArtist from "components/PageArtist"
import PageVideo from "components/PageVideo"
import PageNotFound from "components/PageNotFound"
import DevTools from "redux/createDevTools"

let devtools = null
if (__DEVTOOLS__) {
    devtools = (
      <DevTools store={store}/>
    )
}

export default class Routes extends Component {

  render() {
    return (
      <div>
       <Provider store={ store }>
          <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="artist/:artistId(/:artistName)" component={PageArtist}/>
                <Route path="video/:videoId" component={PageVideo}/>
                <IndexRoute component={PageHome} />
            </Route>
            <Route path="*" component={PageNotFound}/>
          </Router>
        </Provider>
        { __DEVTOOLS__ && devtools }
      </div>
    )
  }
}
