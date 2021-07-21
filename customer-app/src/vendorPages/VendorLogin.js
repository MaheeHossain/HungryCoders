import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import VendorFormHandler from '../vendorComponents/vendorFormHandler.js'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Session from '../Context/Session'
import Dialog from '@material-ui/core/Dialog';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const buttonStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      flex: 1,
      margin: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
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
    display: 'flex',
    backgroundImage: 'url(https://images.unsplash.com/photo-1522682078546-47888fe04e81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80)',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function VendorLogin(props) {
  const { isLoggedIn, vendorlogin, vendorlogout, getUser, getVan, setVan } = Session();
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

  // if (isLoggedIn()) {
  //   history.push('/vendorhome')
  // }

  const getUserVan = () => {
    // Grab the van from the url in user
    console.log(getUser())
    const url = "/van/find/" + getUser().van_id

    axios.get(url)
        .then(response => {
          if (response.status === 200) {
            setVan(response.data[0])
            console.log(getUser())
            console.log(getVan())
            history.push('/vendorhome')
          }
        }).catch(error => {console.log(error)})

  }

  const submitMethod = (userInfo) => {

    // Login to backend using the field
    const url = "/user/checkLoginVen/" + userInfo.email + "/" + userInfo.password
    
    axios.get(url)
    .then(response => {
      if (response.status === 200) {
        vendorlogin(response.data[0])
        getUserVan()
        
      } else {
        history.push('/vendorlogin');
      }
    }).catch(error => {setErrorMessage(error.response.data)})

        // open login error dialog
        if (errorMessage != null) {
          handleClickOpen();
        }
  }
  
  let {handleChange, handleSubmit, values } = VendorFormHandler({}, submitMethod);
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
              href='/#/'
              justifyContent= 'left'
              size="small"
              style={{width:100}}
              startIcon={<ArrowBackIcon  style={{ fontSize: 20 }} />}
            >
              Back
        </Button>
        </div>
          <Typography component="h1" variant="h3" alignItems= 'center' paddingTop={3}> 
            Welcome!
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Van Name"
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
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Grid container flexDirection="column" p={4} spacing={3} textAlign="center">
                  <Grid item> <h4>Wrong username or password</h4> </Grid>
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
      </Grid>
    </Grid>
  );
}
