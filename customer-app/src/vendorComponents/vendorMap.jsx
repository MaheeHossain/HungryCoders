import React, {useEffect} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PinDropIcon from '@material-ui/icons/PinDrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Session from '../Context/Session';
import VendorLocationPin from './vendorLocationPin';

import '../components/map/map.css'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


export default function Map({ location, zoomLevel }) {

  const { isLoggedIn, setVan } = Session()
  const classes = useStyles();

  let content = (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAuLeH0Tcd_0eaadPNUIDxV_pGjjuhpObE' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
      <VendorLocationPin
        lat={location.lat}
        lng={location.lng}
        text={location.address}
        routeTo="/#/vendorpreparing"
      /> 
      </GoogleMapReact>
    </div>
  </div>
  );
  useEffect(() => {
    console.log("Map user location ", location)
  }, []);
  return content;
}