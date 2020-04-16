import React from 'react';
import './App.css';
import {Home} from './components/Home'
import {Customer} from './components/Customer'
import {Product} from './components/Product'
import {Store} from './components/Store'
import {Sales} from './components/Sales'
import {Navigation} from './components/Navigation'
import {BrowserRouter, Route, Switch } from 'react-router-dom'




function App() {
  return (
    <BrowserRouter>
    <div className="container">
      {/* <h3 className = " m-3 d-flex justify-content-center">
        React with Web Api</h3>
        <h5 className = " m-3 d-flex justify-content-center">
        Management Portal</h5> */}

        <Navigation />

      <Switch>
        <Route path= '/' component={Home} exact></Route>
        <Route path= '/customer' component={Customer}></Route>
        <Route path= '/product' component={Product}></Route>
        <Route path= '/store' component={Store}></Route>
        <Route path= '/sales' component={Sales}></Route>
      </Switch>

      <footer> &copy; 2020 - Binal Patel</footer>
    </div>

    
    </BrowserRouter>
  );
}

export default App;
