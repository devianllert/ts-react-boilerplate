import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import NotFound from '../NotFound';

const App = (): ReactElement => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
