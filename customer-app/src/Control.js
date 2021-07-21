import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2700&q=80',
    title: 'Customer',
    width: '50%',
    href: '/#/home',
  },
  {
    url: 'https://images.unsplash.com/photo-1508766917616-d22f3f1eea14?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    title: 'Vendor',
    width: '50%',
    href: "/#/vendorlogin",

  },
];

const imagestyle = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 950,
      [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 300,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  }));

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  export default function Control() {

  const imageclasses = imagestyle();
  const classes = useStyles();

  return(
    <div>
      <AppBar position="static">
          <Typography variant="h5" className={classes.title} textAlign= 'center'>
            <h2>Snacks in a Van</h2>
            <h6>Please select Customer or Vendor Page to login</h6>
          </Typography> 
      </AppBar>
    
    <div className={imageclasses.root}>
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={imageclasses.image}
          focusVisibleClassName={imageclasses.focusVisible}
          style={{
            width: image.width,
          }}
          href = {image.href}
        >
          <span
            className={imageclasses.imageSrc}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <span className={imageclasses.imageBackdrop} />
          <span className={imageclasses.imageButton}>
            <Typography
              component="span"
              variant="h4"
              color="inherit"
              className={imageclasses.imageTitle}
            >
              {image.title}
              <span className={imageclasses.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
    </div>
  );
}



