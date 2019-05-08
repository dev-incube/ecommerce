import React, { Component } from 'react';
import { Grommet, Box } from 'grommet'
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppBar from './components/AppBar'
import ProductListPage from './pages/ProductListPage'
import CheckoutPage from './pages/CheckoutPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <Grommet plain full>
        <Box direction="column" fill>
          <Router>
            <>
              <AppBar />
              <Route path="/" exact component={ProductListPage} />
              <Route path="/checkout" exact component={CheckoutPage} />
            </>
          </Router>
        </Box>
      </Grommet>
    );
  }
}

export default App;
