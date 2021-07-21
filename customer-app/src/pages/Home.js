import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

// Map import
import MapSection from '../components/map/Map'

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '200px',
  },
  grid: {
    [theme.breakpoints.down('sm')]: {
      
    },
  }
}));

const buttonStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      flex: 1,
      margin: theme.spacing(1),
      alignItems: 'left',
      justifyContent: 'left',
      flexDirection:'row',
      position: 'relative',
      height: '1vh',
    },
  },
}));

function vanDist(user, van) {
  return (distance(user.location[0], user.location[1],
    van.location[0], van.location[1], 'K'))
}

function distance(lat1, lon1, lat2, lon2, unit) {
  /* https://www.geodatasource.com  
  *  GeoDataSource.com (C) All Rights Reserved 2018   */
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

export default function Home(props) {
  const classes = useStyles();
  const [location, setLocation] = useState(null);
  const [vanLocation, setVanLocation] = useState([]);
  const buttonclasses = buttonStyles();

  // Location for map
  navigator.geolocation.getCurrentPosition(async function(position) {
    setLocation({
      address: 'YOU ARE HERE',
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    })
  });

  // Location for vans
  const url = "van/all"
  
  useEffect(() => {
    let vLocations = []
    axios.get(url)
    .then(response => {
      if (response.status === 200) {
        for (let i in response.data) {
            // if (vanLocation.length < 5) {
              vLocations.push({
              address: response.data[i].name,
              lat: parseFloat(response.data[i].location[0]),
              lng: parseFloat(response.data[i].location[1]),
              id: response.data[i]._id,
              message:response.data[i].message
            })
        }
        setVanLocation(vLocations);
      }
    }).catch(error => {console.log(error)})
    
  }, []);

  //const delay = ms => new Promise(res => setTimeout(res,ms));
  useEffect(() => {
    //console.log(location)
  }, );
  //await delay(1000);

  return(
    
  <div>
    <NavBar />
    <Grid paddingTop={2}>
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
    </Grid>
    <Grid 
      container
      spacing={0}
      p={5}
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Grid item xs={12}  className={classes.grid}>

        <h1>Snacks in a Van</h1>
      </Grid>
      <Grid item xs={12}  className={classes.grid}>
        <p>The best snacks you'll ever eat in your entire life!</p>
      </Grid>
    </Grid>
    {location!=null && <MapSection location={location} vanLocation={vanLocation} zoomLevel={17} />}
  </div>);
}
