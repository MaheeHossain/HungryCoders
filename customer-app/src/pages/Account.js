import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormHandler from '../components/FormHandler.js'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Session from '../Context/Session'
import Container from '@material-ui/core/Container';
import NavBar from '../components/NavBar';
import Avatar from '@material-ui/core/Avatar';
import Footer from '../components/Footer'

const useStyles = makeStyles((theme) => ({

paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
},
submit: {
    margin: theme.spacing(3, 0, 2),
},
large: {
  width: "50px",
  height: "50px",
}
}));


export default function Account(props) {
    const { isLoggedIn, getUser, logout } = Session();
    const classes = useStyles();
    const history = useHistory();
    return(

    <div>
      <NavBar/>
    <Container component="main" maxWidth="xs">
    <div className={classes.paper}>

      <Grid m={3}>
        <Avatar className={classes.large} style={{ height: '100px', width: '100px' }}>{getUser().firstname[0]}</Avatar>
      </Grid>
      <Grid marginBottom={3}>
        <Typography
          >
            {getUser().firstname+" "+getUser().lastname}
        </Typography>
      </Grid>
      <form className={classes.form} noValidate>
        <Grid container spacing={2} textAlign = "center" justifyContent = "center">
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              size = "large"
              href = "/#/accountdetails"
              >
                Account details
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              size = "large"
              href = "/#/paymentmethods"
              >
                Payment methods
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              fullWidth
              size = "large"
              href = "/#/orderhistory"
              >
                Order history
            </Button>
          </Grid>
          <Grid p = {3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size = "large"
              className={classes.submit}
              onClick = {logout}
            >
              Log out
            </Button>
          </Grid>
        </Grid>
        
      </form>
    </div>
    <Footer/>
  </Container>
  </div>
);
}
        
        
        
        
        
    