import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Auth from './component/auth';
import Files from './component/files';

function App() {
  return (
    <Router>
      <Route path="/auth" exact component={Auth} />
      <Route path="/app/files" exact component={Files} />
      <Redirect to="/auth" />
    </Router>
  );
}

export default App;
