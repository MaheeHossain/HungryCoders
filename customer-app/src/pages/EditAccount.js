import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHandler from '../components/FormHandler.js'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Session from '../Context/Session'

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
}));

export default function AccountDetails(){
    const classes = useStyles();
    const history = useHistory();
    const { isLoggedIn, getUser, login } = Session();

    if (!isLoggedIn()) {
      history.push('/login')
    }

    const goHome = () => {
      history.push('/#/home')
    }

    const submitMethod = (userInfo) => {
      
      let user = getUser();
      user.firstname = userInfo.firstname != "" && userInfo.firstname != undefined ? userInfo.firstname : user.firstname;
      user.lastname = userInfo.lastname != "" && userInfo.lastname != undefined ? userInfo.lastname : user.lastname;
      user.mobile = userInfo.mobile != "" && userInfo.mobile != undefined ? userInfo.mobile : user.mobile;
      user.postcode = userInfo.postcode != "" && userInfo.postcode != undefined ? userInfo.postcode : user.postcode;
      delete user.password

      if (user.firstname != "" && user.firstname != undefined && user.lastname != "" && user.lastname != undefined) {
        axios.post('/user/update', user)
        .then(response => {
          console.log(response)
          if (response.status == 200) {
            login(user);
            goHome()
          }
        }).catch(error => console.log(error))
      }
    }
    
    let {handleChange, handleSubmit, values } = FormHandler({}, submitMethod);
    let {firstname, lastname, mobile, postcode} = values;

  return (
    <div>
    <NavBar/>
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Grid marginTop={5}>
          <h2>Edit account details</h2>
        </Grid>
        <form className={classes.form} noValidate>
          <Grid container spacing={2} flexDirection= 'column' textAlign = "center">
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstname"
                value={firstname}
                label="First Name"
                name="firstname"
                onChange = {handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                value={lastname}
                label="Last Name"
                name="lastname"
                onChange = {handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="mobile"
                value={mobile}
                label="Mobile Number"
                type="mobile"
                id="mobile"
                onChange = {handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="postcode"
                value={postcode}
                label="Postcode"
                type="postcode"
                id="postcode"
                onChange = {handleChange}
              />
            </Grid>
            <Grid item marginTop={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                size='large'
              >
                Save details
              </Button>
            </Grid>
            <Grid item >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                href = "/#/accountdetails"
                size='large'
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    <Footer/>
    </div>
  );
}