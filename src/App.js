import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import AddCustomer from './components/customers/AddCustomer';
import Customers from './components/customers/Customers';
import CustomerDetails from './components/customers/CustomerDetails';
import AddVisit from './components/visits/AddVisit';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={Dashboard} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/addcustomer" component={AddCustomer} />
        <Route path="/customers" component={Customers} />
        <Route path="/customer/:id" component={CustomerDetails} />
        <Route path="/addvisit/:id" component={AddVisit} />
      </div>
    </BrowserRouter>
  );
}

export default App;
