import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import {makeStyles } from '@material-ui/core/styles';

// import components
import NavBar from '../components/NavBar';
import MenuItem from '../components/MenuItem';
import useGetHttp from '../components/http';
import Session from '../Context/Session';

export default function Menu(props) {

  const history = useHistory();
  const [selectedItem] = useState([]);
  const [items, isLoading, error] = useGetHttp("/menu/all", []);
  const { isLoggedIn, setCart, vanEmpty, getVan, cleanVan } = Session()
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();

  // error checking for loading menu database
  if (isLoading) {
    return <p>Loading menu...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  // if (getCart()!==null) {
  //   if (items !== null) {
  //     for (let i = 0 ; i < items.length ; i++) {
        
  //     }
  //   }
  // }

  const submitOrder = () => {
    // call cart page with selected Items selectedItem
    let selectedItemList = []
    
    selectedItem.map((count, index) => {
      if (items !== null && count !== 0) {
        let sItem = items[index]
        sItem['count'] = count
        selectedItemList.push(sItem)
      }
    })

    if (selectedItemList.length > 0) {
      // We update the global cart
      setCart(selectedItemList);
      // direct to the cart page
      history.push('/cart');
    }
  }

  const addCount = (count, index) => {
    selectedItem[index] = count;
  }

  // const printVan = () => {
  //   console.log(getVan());
  // }

  const deleteVan = () => {
    console.log(cleanVan());
    history.push('/home')
  }

  return (
    <div>
      <NavBar/>
        <Paper className={classes.paper}>
          <Grid container spacing={2} p={2} >
            {items && items.map((item, index) => (
              <MenuItem
                url={item.url}
                name={item.name}
                price={item.price}
                index={index}
                addCount={addCount}
              >
              </MenuItem>
            ))}
          </Grid>
          {isLoggedIn() && 
          !vanEmpty() &&
            <Box m={2}>
              <Button
                onClick={submitOrder}
                variant="contained"
                size="large"
                >
                Add to cart
              </Button>
            </Box>
          }
          {/* <Button
            onClick={printVan}
            variant="contained"
            size="large"
            >
            Print Van
          </Button> */}
          <Button
            onClick={deleteVan}
            variant="outlined"
            size="large"
            >
            Reselect Van
          </Button>
        </Paper>
    </div>
  );
}
