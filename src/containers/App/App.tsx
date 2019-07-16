import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import Counter from '../Counter';
import NotFound from '../NotFound/Loadable';

const App = (): ReactElement => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/counter" component={Counter} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
