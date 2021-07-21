import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '5px',
    width: '100%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    float: 'right'
  },
}));

function displayPrice(price) {
  return (Math.round(price * 100) / 100).toFixed(2);
}

export default function CartItem(props) {
  const classes = useStyles();
  const {name, count, price, url} = props.value;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <img src={url} className="photo" alt={name}/>
          </Grid>
          <Grid item xs container direction="column" textAlign='left'>
            <Box item m={2} >
              <div>
                <h3>{name}</h3>
                x{count}
              </div>
            </Box>
            <Grid item >
              <IconButton color='primary' aria-label="delete">
                <DeleteOutlinedIcon fontSize="small"/>
              </IconButton >
            </Grid>
          </Grid>
          <Grid item>
            ${displayPrice(price)}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
