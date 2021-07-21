import React, { useState } from "react";
import { useHistory } from "react-router";
import Grid from '@material-ui/core/Grid';

// import modules
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Order from '../components/Order';
import useGetHttp from '../components/http';
import Session from '../Context/Session';

export default function OrderSummary() {
  const { getUser } = Session();
  const [orders, isLoading, error] = useGetHttp("/order/userOrders/" + getUser()._id, []);
  const history = useHistory();

  let orderList = []

  if (orders) {
    orders.map(order => {
      // display all the outstanding order items
      if (order.status && (order.status === 'outstanding') || order.status === 'ready'){
        orderList.push(order)
      }
    })
  }

  return (
    <div>
        <Grid container wrap="nowrap" direction="column" marginTop={3}>
          <Grid item xs={12}>
            {orderList && orderList.map((order) => (
              <Order
                order={order}
              />
            ))}
          </Grid>
        </Grid>
    </div>
  );
}
