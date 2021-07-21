import React from "react";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles';
import OrderItem from '../components/OrderItem';
import Timer from '../components/Timer';
import axios from "axios";
import Session from '../Context/Session';
import ReviewDialog from '../components/ReviewDialog';

import "../CSS/Order.css";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  p: {
    fontSize: '13px',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 10,
    color: theme.palette.text.secondary,
  },
}));
  
function Order(props) {
  const classes = useStyles();
  const { _id, orderTime, status, orders } = props.order;
  const history = useHistory();
  const { setCart } = Session();

  const deleteOrder = (orderId) => {
    // Send a request to the backend to delete the specified order
    const url = "/order/item/" + orderId
    axios.delete("/order/item/" + orderId)
    .then((response) => {
      history.go(0)
    }).catch(err => {
      console.log(err);
    });
  };

  const editOrder = () => {
    setCart(props.order);
    history.push('/menu');
  }

  /* Displays price as two decimal places */
  function displayPrice(price) {
      return (Math.round(price * 100) / 100).toFixed(2);
  }
  
  return (
    <div className='order'>
      <Paper className={classes.paper}>
        <Grid container p={1} width={1}>
          <Grid item xs={8}>
            <div>
              {orders && orders.map((orderItem, index) => (
                <div>
                  <OrderItem value={orderItem}/>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item textAlign='center' xs={2}>
            <Timer orderTime={orderTime} />
            { status == 'outstanding' ? <p className={classes.p}>Preparing...</p> : <p className={classes.p}> Complete</p> }
          </Grid>
          <Grid container xs={2}>
            <Grid item >
            <IconButton color='primary' aria-label="edit" onClick={editOrder}>
              <EditOutlinedIcon />
            </IconButton>
            </Grid >
            <Grid item >
              <IconButton color='primary' aria-label="delete" onClick={() => deleteOrder(_id)}>
                <DeleteOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item p={0.8} paddingLeft={2}>
              {status==='completed' && <ReviewDialog value={_id}/> }
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default Order;