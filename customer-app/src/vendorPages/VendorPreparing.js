import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Session from '../Context/Session';
import Button from '@material-ui/core/Button';
import VendorOrderTabs from './VendorOrderTabs.js';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    //padding: theme.spacing(2),
    margin: '40px',
    width: '80%',
  },
}));

const buttonStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      flex: 1,
      margin: theme.spacing(2),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
      position: 'relative',
    },
  },
}));

export default function VendorPreparing() {
  const classes = useStyles();
  const { isLoggedIn, getUser, vendorlogout } = Session();
  const [tabPage, setTabPage] = useState(0); 
  const [refresh, setRefresh] = useState(0); 
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleCloseVan = () => {
    vendorlogout();
    history.push('');
  }
  
  useEffect(() => {
    setIsLoading(true);
    fetch("/order/vanid/" + getUser().van_id)
    .then(response => {
      if (!response.ok) {
        setError("error")
        return
      }
      return response.json();
    })
    .then(data => {
      setIsLoading(false);
      setOrders(data);
    })
    .catch(err => {
      setIsLoading(false);
      setError(err)
    });
  }, [refresh]);

  const refreshTable = () => {
    setRefresh(!refresh);
  }

  return (
    <div style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1500338427510-5deb175987d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1354&q=80")`,
      height: '100vh',
      width: '100vw',
      display: 'flex',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      justifyContent: 'center'
    }}>
      <div>
      <Grid p={2} width='100vw'textAlign='right'>
          <Button
              variant="contained"
              onClick={handleCloseVan}
              endIcon={<ArrowForwardIcon/>}
            >
              Close Van
          </Button>
        </Grid>
      <Paper className={classes.paper}>
        <VendorOrderTabs tabPage={tabPage} setTabPage={setTabPage} refreshTable={refreshTable} orders={orders} />
      </Paper>
        
      </div>
    </div>
  );
}