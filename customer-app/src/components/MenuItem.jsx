import React, { useState, useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import Session from '../Context/Session';


import "../CSS/MenuItem.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

/* Displays price as two decimal places */
function displayPrice(price) {
  return (Math.round(price * 100) / 100).toFixed(2);
}

function MenuItem(props) {

  const classes = useStyles();
  const [count, setCount] = useState(0);
  const { isLoggedIn } = Session()

  const updateItem = () => {
    props.addCount(count, props.index)
  }
  
  updateItem()
  
  // useEffect(() => {
  //   const parsedCount = Number(sessionStorage.getItem("count") || 0)
  //   setCount(parsedCount)
  // }, [])

  // useEffect(() => {
  //   sessionStorage.setItem("count", props.index)
  // }, [count])

  return (
    <Grid item md={6} sm={12} xs={12}>
      <Paper className={classes.paper}>
        <div className='menu-item'>
          <Box display="flex" flexDirection="row">
            <Box p={1}>
              <div className='menu-item__url'>
                <img src={props.url} className="photo" alt={props.name}/>
              </div>
            </Box>
            <Box p={1} width={1} textAlign="right">
              <div className='menu-item__dscrp'>
                <h3>{props.name}</h3>
                <div className='menu-item__price'>${displayPrice(props.price)}</div>
              </div>
            </Box>
            {isLoggedIn() &&
              <Box p={1} style={{ display: "flex", justifyContent: 'flex-end'}}>
                <div>
                  <Box width = '3em'>
                    <IconButton onClick={() => setCount(count => count + 1)}>
                      <AddIcon/>
                    </IconButton>
                    <Box border={2} m={0.5} p={1}>{count}</Box>
                    <IconButton onClick={() => setCount(count > 0 ? count - 1 : count)}>
                      <RemoveIcon/>
                    </IconButton>
                  </Box>
                </div>
              </Box>
            }
          </Box>
        </div>
      </Paper>
    </Grid>
  )
}

export default MenuItem;
