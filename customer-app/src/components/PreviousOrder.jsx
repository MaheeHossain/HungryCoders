import React, { useState } from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';

import "../CSS/Order.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 10,
    color: theme.palette.text.secondary,
  },
}));
  
function Order(props) {
  const classes = useStyles();
  const { orderTime, status, totalCount, totalPrice } = props.order

  /* Displays price as two decimal places */
  function displayPrice(price) {
      return (Math.round(price * 100) / 100).toFixed(2);
  }
  let totalItems=0
  const detailLine = totalCount + " items"

  return (
    <Paper className={classes.paper}>
      <div className='order'>
        <Box display="flex" flexDirection="row">
          <Box p={1} width={1}>
            <div className='order__dscrp'>
              <div>Order details: {detailLine}</div>
              <div>Status: {status}</div>
              <div>Order time: {orderTime}</div>
            </div>
          </Box>
          <Box item>
              ${displayPrice(totalPrice)}
          </Box>
          {/* <Box p={1}>
            <div style={{ display: "flex", justifyContent: 'flex-end'}}>
              <Box width = '3em'>
                <Button variant="contained" color="primary" href="#">
                    Re-Order
                </Button>
                <Button>Details</Button>
              </Box>
            </div>
          </Box> */}
        </Box>
      </div>
    </Paper>
  )
}

export default Order;