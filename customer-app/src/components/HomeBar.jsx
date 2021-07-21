/* The bar on the home page */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Session from '../Context/Session';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function HomeBar() {
  const classes = useStyles();

  const { isLoggedIn, logout } = Session()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Snacks in a Van
          </Typography>
          {!isLoggedIn() &&
            <Button
            color="inherit"
            href="/#/registration">
            REGISTER
          </Button>
          }
          {!isLoggedIn() &&
          <Button
            color="inherit"
            href="/#/login">
            LOGIN
          </Button>
          }
          {isLoggedIn() &&
          <Button
            color="inherit"
            href="/"
            onClick={logout}>
            LOGOUT
          </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
