import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Session from '../Context/Session'
import Container from '@material-ui/core/Container';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer'

const useStyles = makeStyles((theme) => ({

paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
}));


export default function Account(props) {
    const { getUser } = Session();
    const classes = useStyles();
    return(
    <div>
    <NavBar/>
    <Container component="main" maxWidth="xs">
    <div className={classes.paper}>
      <Grid marginTop={5}>
        <h2>Account details</h2>
      </Grid>
        <Grid container m={2} spacing={2} justifyContent = "center">
          <Grid item xs={12}>
            <Typography
              >
                Name: {getUser().firstname+" "+getUser().lastname}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography
              >
                {"Email: "+getUser().email}
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography
              >
                {"Mobile: "+getUser().mobile}
            </Typography>
          </Grid>

          <Grid item xs={12} marginTop={4} >
            <Button
              variant="outlined"
              fullWidth
              href = "/#/editaccount"
              size = "large"
              >
                Edit Account
            </Button>
          </Grid>
        </Grid>
        <Grid p = {3}>
            <Button
            variant="outlined"
            color="primary"
            size = "large"
            href = "/#/account"
            >
            Back
            </Button>
          </Grid>
    </div>
    <Footer/>
  </Container>
  </div>
);
}
