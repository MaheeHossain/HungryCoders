import React, {useState} from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// replace the Material UI theme
const theme = createMuiTheme({
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
      main: '#000000', // black
      variant: '#bb86f3', // purple
    },
    secondary: {
      main: '#03dac5', // green
      light: '#ffffff', // white
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <GlobalCxt.Provider value={{ loginUser, setLoginUser, cart, setCart }}>
        { loginUser === null ? <UnAuthenticatedRoutes /> : <AuthenticatedRoutes /> }
      </GlobalCxt.Provider>
    </ThemeProvider>
  )
}

export default App;
