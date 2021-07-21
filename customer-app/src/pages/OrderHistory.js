import React, { useState } from "react";
import { useHistory } from "react-router";
import Grid from '@material-ui/core/Grid';

// import modules
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Order from '../components/Order';
import useGetHttp from '../components/http';
import Session from '../Context/Session';
import OrderSummary from './OrderSummary';

export default function OrderHistory() {
  const { getUser } = Session();
  const [orders, isLoading, error] = useGetHttp("/order/userOrders/" + getUser()._id, []);
  const history = useHistory();

  return (
      <div>
        <NavBar/>
        <Grid textAlign='center' marginTop={5}>
          <h3>Your orders</h3>
        </Grid>
        <OrderSummary/>
      </div>
  );
}
