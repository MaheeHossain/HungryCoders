import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Session from '../Context/Session'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CloseVan() {

  const classes = useStyles();
  const { isLoggedIn, vendorlogout } = Session();

  return (
    <div>
      {isLoggedIn ?
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<ExitToAppIcon />}
        onClick={vendorlogout}
        href="/#/vendorlogin"
      >
        Close Van
      </Button> :
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<LocalShippingIcon />}
        href="/#/vendorlogin"
      >
        Log In
      </Button>
      }
    </div>
  );
}
