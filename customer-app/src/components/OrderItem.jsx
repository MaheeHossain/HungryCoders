import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '5px',
    maxWidth: '100%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    float: 'right'
  },
  item: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }
}));

function displayPrice(price) {
  return (Math.round(price * 100) / 100).toFixed(2);
}

export default function OrderItem(props) {
  const classes = useStyles();
  const { name, count, price, note} = props.value;
  

  return (
    <div className={classes.root}>
      <div >
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item>
            <Box  padding={1} display='flex' textAlign="center" justifyContent="center" width={40} height={40} border={1.5} borderRadius={"25px"}><b>x{count}</b> </Box>
          </Grid>
          <Grid item xs>
            <p>{name}</p>
          </Grid>
          <Grid item xs className={classes.item}>
            <p>${displayPrice(price)}</p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
