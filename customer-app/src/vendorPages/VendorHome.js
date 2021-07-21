import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Session from '../Context/Session';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Footer from '../components/Footer';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import VendorFormHandler from '../vendorComponents/vendorFormHandler.js'

// Map import
import MapSection from '../vendorComponents/vendorMap'
import axios from 'axios';

const buttonStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      flex: 1,
      margin: theme.spacing(1),
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(6),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Control() {

  const [location, setLocation] = useState(null);
  const { isLoggedIn, getUser, vendorlogout, vanEmpty, getVan } = Session();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    setLocation({
      address: getVan().name,
      lat: parseFloat(getVan().location[0]),
      lng: parseFloat(getVan().location[1]),
    })
  }, []);

  const buttonclasses = buttonStyles();
  const [state, setState] = React.useState({
    checked: false,
  });

  const handleReady = () => {
    
    if (state.checked) {
      // Send request to the vendor with location
      navigator.geolocation.getCurrentPosition(async function(position) {
          axios.get("/van/changeLocation/" + getVan()._id + "/" 
          + position.coords.latitude + "/" + position.coords.longitude)
            .then(response => {
              if (response.status === 200) {
              } 
          }).catch(error => console.log(error))
          console.log([position.coords.latitude, position.coords.longitude])
       })
      }
      console.log(getVan().location)
  }

  const submitMethod = (vendorInfo) => {
    // Send request to the vendor with message
        axios.get("/van/changeMessage/" + getVan()._id + "/" 
        + vendorInfo.address)
          .then(response => {
            if (response.status === 200) {
            } 
        }).catch(error => console.log(error))
    }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  let {handleFormChange, handleSubmit, values } = VendorFormHandler({}, submitMethod);

  let {address} = values;

  return(
    <div>
    <AppBar position="static">
    <Typography variant="h5" className={classes.title} textAlign= 'center'>

      <h5>Welcome back,</h5>
      <h2>{getUser().firstname + " " + getUser().lastname}</h2>
      {!vanEmpty() && <h3>Current Van: {getVan().name}</h3>}
      {vanEmpty() && <h2>No van</h2>}
      </Typography>
      </AppBar>

      {isLoggedIn() && 
      <div>
        <form class={buttonclasses.root} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              justifyContent= 'left'
              id="address"
              label="Enter Van Address Here"
              name="address"
              value={address}
              autoComplete="address"
              onChange={handleFormChange}
              autoFocus
              fullWidth

            />
        </form>
        <Button
              className={buttonclasses.root}
              margin="normal"
              variant="contained"
              color="primary"
              justifyContent= 'right'
              onClick={handleSubmit}
              fullWidth
            >
              Enter
        </Button>
        {location!=null && <MapSection location={location} zoomLevel={17} />} 
        <Grid container spacing={2} marginTop={3} flexDirection='column' textAlign = "center">

          <Grid item marginBottom={2}>
              <FormControlLabel
              control=
              {
                <Checkbox checked={state.checked} onChange={handleChange} name="checked" />
              }
              label="Share live location"
            />
          </Grid>
          <Grid item>
            <Button
              //className={buttonclasses.root}
              variant="contained"
              color="primary"
              onClick = {() => history.push('/vendorpreparing')}
              size="large"
              style={{backgroundColor: 'green', width:200}}
            >
              Ready!
            </Button>
          </Grid>
          <Grid item justifyContent = "center">
            <Button
                //className={buttonclasses.root}
                variant="contained"
                color="primary"
                onClick={vendorlogout}
                size="large"
                endIcon={<ExitToAppIcon/>}
              >
                Log out
              </Button>
            </Grid>
          </Grid>
        </div>
        }
        
        {!isLoggedIn() && 
        <Grid item xs={12} marginTop={4} >
        <Button
          type="submit"
          className={buttonclasses.root}
          variant="contained"
          color="primary"
          href="/#/vendorlogin"
          justifyContent= 'center'
          size="large"
        >
          Log in
        </Button>
        </Grid>
        }
    <Footer/>
    </div>
    
  );
}