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
import PageVideo from "components/PageVideo"
import DevTools from "redux/createDevTools"

let devtools = null
if (__DEVTOOLS__) {
  devtools = (
    <DevTools store={store}/>
  )
}

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

export default class Routes extends Component {

  render() {
    return (
      <div>
        <Provider store={ store }>
          <Router history={browserHistory}>
            <Route path="/" component={App}>
              <Route path="video/:type/:id" component={PageVideo}/>
              <IndexRoute component={PageHome}/>
            </Route>
          </Router>
        </Provider>
        { __DEVTOOLS__ && devtools }
      </div>
    )
  }
}
