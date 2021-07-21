import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FormHandler from '../components/FormHandler';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Session from '../Context/Session';
import Footer from '../components/Footer';
import Dialog from '@material-ui/core/Dialog';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const buttonStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      flex: 1,
      margin: theme.spacing(1),
      flexDirection:'row',
      position: 'relative',
      height: '1vh',
    },
  },
}));


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80)',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3),
  },
}));

export default function Login() {
  const { isLoggedIn, login, vanEmpty, getVan, getUser } = Session();
  const classes = useStyles();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const buttonclasses = buttonStyles();

  // dialog handlers
  const handleClickOpen = async () => {
    await delay(500);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (isLoggedIn()) {
    if (vanEmpty()) {
      history.push('/home')
    }
    else {
      console.log(getVan())
      history.push('/menu')
    }
  }

  const submitMethod = (userInfo) => {

    // Login to backend using the field
    const url = "/user/checkLogin/" + userInfo.email + "/" + userInfo.password
    
    axios.get(url)
    .then(response => {
      if (response.status === 200) {
        login(response.data[0])

        if (getUser().firstname===null||getUser().lastname===null) {
          history.push('/editaccount')
        }
        else {
          history.push('/menu')
        }
      } else {
        history.push('/login');
      }
    }).catch(error => {setErrorMessage(error.response.data)})

    // open login error dialog
    if (errorMessage != null) {
      handleClickOpen();
    }
  }
  
  let {handleChange, handleSubmit, values } = FormHandler({}, submitMethod);
  let {email, password} = values;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <div>
        <Button
              className={buttonclasses.root}
              variant="contained"
              color="primary"
              href='/#/home'
              justifyContent= 'left'
              size="small"
              style={{width:100}}
              startIcon={<ArrowBackIcon  style={{ fontSize: 20 }} />}
            >
              Back
        </Button>
        </div>
          <Typography component="h1" variant="h3" paddingTop={3}>
            Welcome!
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Grid paddingTop={4}>
              <Button
                type="submit"
                size='large'
                fullWidth
                variant="contained"
                onClick={handleSubmit}
              >
                LOGIN
              </Button>
            </Grid>
            <Grid textAlign='center'>
              <Link color="secondary" href="/#/registration" >
                <p style={{fontSize: '14px', color: '#03dac5'}}> Don't have an account? Register here </p>
              </Link>
            </Grid>
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid container flexDirection="column" p={4} spacing={3} textAlign="center">
                  <Grid item> <h4>Wrong email or password</h4> </Grid>
                  <Grid item>
                      <Button onClick={handleClose} variant='contained' autoFocus>
                        OK
                      </Button>
                  </Grid>
                </Grid>
              </Dialog>
            </div>
          </form>
        </div>
        <Footer/>
      </Grid>
    </Grid>

  );
}

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="primary" href="https://github.com/INFO30005-2021-SM1/workshop-4-t03">
//         Hungry Coders
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
