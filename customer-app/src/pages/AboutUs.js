import React from 'react';
import NavBar from '../components/NavBar';
import AboutUsText from '../components/AboutUsText';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import TwitterIcon from '@material-ui/icons/Twitter';

import SocialMedia from '../components/SocialMedia';

const useStyles = makeStyles((theme) => ({
    image: {
      Image: 'url(https://images.unsplash.com/photo-1570441262582-a2d4b9a916a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1331&q=80)',
      Color:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      Size: 'cover',
      Position: 'center',
    },
  }));

export default function AboutUs() {

  const classes = useStyles();

  return(
    <div>
        <NavBar />
        <h2>About us</h2>
        <AboutUsText />
        {/* <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <h1>IMAGE GOES HERE</h1> */}
        <h2>Contact Us</h2>
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
            <div >
              <Grid item md={6} sm={12} xs={12} container spacing={1} p={1}>
                <FacebookIcon/>
                <p>Facebook</p>
              </Grid>
              <Grid item md={6} sm={12} xs={12} container spacing={1} p={1}>
                <LocationOnIcon/>
                <p>Location</p>
              </Grid>
              <Grid item md={6} sm={12} xs={12} container spacing={1} p={1}>
                <PhoneIcon/>
                <p>Phone Number</p>
              </Grid>
              <Grid item md={6} sm={12} xs={12} container spacing={1} p={1}>
                <EmailIcon/>
                <p>Email</p>
              </Grid>
              <Grid item md={6} sm={12} xs={12} container spacing={1} p={1}>
                <InstagramIcon/>
                <p>Instagram</p>
              </Grid>
              <Grid item md={6} sm={12} xs={12} container spacing={1} p={1}>
                <TwitterIcon/>
                <p>Twitter</p>
              </Grid>
            </div>
        </Grid>
        <h2>Business Hours</h2>
        <h4>Mon-Fri:     7am-6pm</h4>
        <h4>Sat:         9am-6pm</h4>
        <h4>Sun:         9am-5pm</h4>
        </div>
    );
}