import React, {useEffect, useState} from 'react'
import GoogleMapReact from 'google-map-react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Session from '../../Context/Session';
import UserLocationPin from './UserLocationPin';
import VanLocationPin from './VanLocationPin';
import StartOrderingButton from './StartOrderingButton';

import './map.css'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

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


export default function Map({ location, vanLocation, zoomLevel }) {

  const { isLoggedIn, setVan } = Session()
  const classes = useStyles();

  const vanDist = (user, van) => {
    return (distance(user.lat, user.lng,
      van.lat, van.lng, 'K'))
  }

  let closeVans = []

  if (location != undefined && vanLocation[0] != undefined) {
    for (let i in vanLocation) {
      if (closeVans.length < 5) {
        closeVans.push({
          van: vanLocation[i],
          dist: vanDist(location, vanLocation[i])
        })
      }
      else {
        let worstDist = 0 
        let worstIndex = -1
        for (let j in closeVans) {
          if (closeVans[j].dist > worstDist) {
            worstDist = closeVans[j].dist
            worstIndex = j
          }
        }
        if (vanDist(location, vanLocation[i]) < worstDist) {
          closeVans[worstIndex].van = vanLocation[i]
          closeVans[worstIndex].dist = vanDist(location, vanLocation[i])
          worstDist = 0
          worstIndex = -1
        }
      }
    }
  }

  let content = (
  <div className="map">
    <Grid 
      container
      padding={3}
      spacing={3}
      direction="row"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
    </Grid>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAuLeH0Tcd_0eaadPNUIDxV_pGjjuhpObE' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
      <UserLocationPin
        lat={location.lat}
        lng={location.lng}
        text={location.address}
      /> 
      {
        closeVans.map(vlocation=>{
          return <VanLocationPin
            lat={vlocation.van.lat}
            lng={vlocation.van.lng}
            id={vlocation.van.id}
            address={vlocation.van.address}
            message={vlocation.van.message}
          />
        })
      }
      </GoogleMapReact>
    </div>

    <Grid textAlign='center' xs={12} p={3}>
      <StartOrderingButton
        style={{backgroundColor: "green"}}
        variant="contained"
        size="large"
        vans={closeVans}
        >
        Start ordering
      </StartOrderingButton>
    </Grid>
  </div>
  );
  useEffect(() => {
  }, []);
  return content;
}