import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHandler from '../components/FormHandler.js'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Session from '../Context/Session'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
}));

export default function SignUp(){
    const classes = useStyles();
    const history = useHistory();
    const { isLoggedIn, login, getUser } = Session();

    if (isLoggedIn()&&getUser().firstname != "" && getUser().firstname != undefined && getUser().lastname != "" && getUser().lastname != undefined) {
      history.push('/menu')
    }
    const [errorMessage, setErrorMessage] = useState(null);

    const submitMethod = (userInfo) => {
      // Login to backed using the field
      // check if passwords match
      if(userInfo.password !== userInfo.Cpassword){
        setErrorMessage("Passwords do not match")
        return (console.log(errorMessage))
      }

      // Check if password contains all conditions
      function validateName(name) {
        var isValidName = true;
        if(!/[a-zA-Z]/g.test(name) || !/\d+/g.test(name)||name.length<8) {
          isValidName = false;
        }
        return isValidName;
      }
      if(!validateName(userInfo.password)){
        setErrorMessage("Password must contain: 8 characters, at least one alphabetical character and at least one digit")
        return (console.log(errorMessage))
      }
      
      // check if email exists in db
      let url = "/user/checkEmail/" + userInfo.email
      axios.get(url)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            console.log(response.data)
          }
        })
        .catch(error => {setErrorMessage(error.response.data)})

      // register user
      url = "/user/createUser" 
      const body = {
        "firstname":userInfo.firstname,
        "lastname":userInfo.lastname,
        "mobile":null,
        "postcode":null,
        "usertype": "customer", 
        "email":userInfo.email,
        "password":userInfo.password
      }
      if (userInfo.firstname != "" && userInfo.firstname != undefined && userInfo.lastname != "" && userInfo.lastname != undefined) {
        axios.post(url, body)
          .then(response => {
            if (response.status === 200) {
              login(response.data)
              console.log(getUser())
                history.push('/account');
            } 
            else {
              console.log(response.data[0])
              history.push('/error');
            }
        })
        .catch(error => {console.log(error)})
    }
    else{
      setErrorMessage("Must include firstname and lastname")
    }
  }
    
    let {handleChange, handleSubmit } = FormHandler({}, submitMethod);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstname"
                //value={email}
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
                //value={email}
                label="Last Name"
                name="lastname"
                onChange = {handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                //value={email}
                label="Email address"
                name="email"
                onChange = {handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                // value={password}
                label="Password"
                type="password"
                id="password"
                onChange = {handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Cpassword"
                // value={Cpassword}
                label="Confirm password"
                type="password"
                id="Cpassword"
                onChange = {handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Create account
          </Button>
          {errorMessage != null && <h2>{errorMessage}</h2>}
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}