import './App.css';
import React from 'react'
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// import pages
import Control from './Control';
import Error from './Error';

// customer app
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import AboutUs from './pages/AboutUs';
import OrderSummary from './pages/OrderSummary';
import OrderHistory from './pages/OrderHistory';
import Account from './pages/Account';
import Registration from './pages/Registration';
import Review from './pages/Review'; 
import EditAccount from './pages/EditAccount';
import PaymentMethod from "./pages/PaymentMethod";
import AccountDetails from "./pages/AccountDetails";


// vendor app
import VendorLogin from './vendorPages/VendorLogin';
import VendorHome from './vendorPages/VendorHome';
import VendorPreparing from './vendorPages/VendorPreparing';

const theme = createTheme({
  typography: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    h5: {
      fontWeight: 'bolder',
    },
    // text for buttons
    button: {
      fontWeight: 'bolder',
      textTransform: 'none'
    }
    
  },
  palette: {
    primary: {
      main: 'rgba(0, 0, 0)', // black
      variant: '#bb86f3', // purple
    },
    secondary: {
      main: '#03dac5', // green
      light: '#ffffff', // white
    },
  },
  shape: {
    borderRadius: 25,
  },
});

function App() {

  const AllRoutes = () => {
    return (
      <Router>
        <Switch>
          
          <Route path="/" exact>
            <Control />
          </Route>
          <Route path="/error" exact>
            <Error />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/menu" exact>
            <Menu />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/ordersummary" exact>
            <OrderSummary />
          </Route>
          <Route path="/orderhistory" exact>
            <OrderHistory />
          </Route>
          <Route path="/aboutus" exact>
            <AboutUs />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/account" exact>
            <Account />
          </Route>
          <Route path="/registration" exact>
            <Registration />
          </Route>
          <Route path="/review" exact>
            <Review />
          </Route>
          <Route path="/editaccount" exact>
            <EditAccount />
          </Route>

          <Route path="/vendorlogin" exact>
            <VendorLogin />
          </Route>
          <Route path="/vendorhome" exact>
            <VendorHome />
          </Route>
          <Route path="/vendorpreparing" exact>
            <VendorPreparing />
          </Route>
          <Route path="/paymentmethods" exact>
            <PaymentMethod/>
          </Route>
          <Route path="/accountdetails" exact>
            <AccountDetails/>
          </Route>
        </Switch>
      </Router>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <AllRoutes/>
    </ThemeProvider>
  );
}

export default App;
