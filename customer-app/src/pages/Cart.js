import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Session from '../Context/Session';
import { useHistory } from "react-router-dom";
import CartItem from '../components/CartItem';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Dialog from '@material-ui/core/Dialog';

// import modules
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import OrderPayment from '../components/OrderPayment';
import OrderSummary from "./OrderSummary";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
    textAlign: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  }
}));

const textbox = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
  },
}));

const buttonstyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#03dac5',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#03dac5',
    },
  },
  line: {
    borderColor: '#03dac5',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#03dac5',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#03dac5',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#03dac5',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

function getSteps() {
  return ['My Cart', 'Payment', 'View orders'];
}

export default function Cart() {
  const classes = useStyles();
  const { getCart, getVan, cartEmpty, isLoggedIn, getUser, cleanCart } = Session();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();
  const [open, setOpen] = React.useState(false);
  const delay = ms => new Promise(res => setTimeout(res, ms));

  //const { _id, orderTime, status, orders } = props.order;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!isLoggedIn()) {
    history.push('/login')
  }

  const submitOrder = () => {
    // Send a request to the backend with order
    const body = {
      "vanId": getVan()._id,
      "userId": getUser()._id,
      "name": getUser().firstname+' '+getUser().lastname,
      "note": "",
      "orderTime": new Date(),
      "status": "outstanding",
      "totalPrice": getTotalPrice(),
      "totalCount": getTotalCount(),
      "orders": getCart(),
      "review": ""
    }
    
    axios.post('/order/placement', body)
      .then(response => {
        if (response.status === 200) {
          //cleanCart()
        }
      }).catch(error => console.log(error))
  }

  // do not proceed with the current items
  const cancelOrder = (orderId) => {
      cleanCart()
      // restart from the home page
      history.push("")
  };

  const editOrder = () => {
    //setCart(props.order);
    history.push('/menu');
  }

  const getTotalPrice = () => {
    let tPrice = 0;
    (getCart() != null) && getCart().map(item => {
      tPrice += item.price * item.count
    })

    return (Math.round(tPrice * 100) / 100).toFixed(2);
  }

  const getTotalCount = () => {
    let totalCount = 0;
    getCart().map(item => {
      totalCount += item.count
    })

    return totalCount;
  }

  const handleNext = () => {
    // send order details once payment has been made
    if (activeStep===1) {
      submitOrder();
    }
    // if (activeStep===2) {
    // }
    if (activeStep === steps.length-1) {
      history.push('/home')
    }
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let note;

  // render component according to step count
  function SwitchRender(props) {
    let component
      switch(props.value) {
        case 0:
          component =
            (<div>
              <Grid container justifyContent='center' spacing={1} display='flex'>
                  <Grid item > 
                    {getTotalCount() > 0 ?
                      getCart().map((item) => {
                        return (<CartItem value={item} />)
                      }) : <p>No items in cart found. Select the items from menu first.</p>
                    }
                    <Grid item p={3}>
                      {getTotalCount() > 0 &&
                        <p><b>Total price</b>: ${getTotalPrice()}</p>
                      }
                    </Grid>
                  </Grid>
              </Grid>
          </div>)
        break
        case 1:
          component =
            (<div>
              <Grid container marginTop={3} spacing={5} flexDirection="column" alignContent="center" >
                  <Grid item>
                    <h1>${getTotalPrice()}</h1>
                  </Grid>
                  <Grid item>
                    <OrderPayment/>
                  </Grid>
                  <Grid item width='40%' >
                    <form noValidate autoComplete="off">
                        <TextField
                          label="Add note"
                          multiline
                          fullWidth
                          rows={6}
                          defaultValue=""
                          margin="auto"
                          variant="outlined"
                          value={note}
                        />
                    </form>
                  </Grid>
                  <Grid item m={4}>
                    <Button  onClick={handleClickOpen} variant="contained" size='large' style={{backgroundColor: "red"}}>
                      Cancel order
                    </Button>
                  </Grid> 
                </Grid>

                <div>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    disableBackdropClick
                  >
                    <Grid container flexDirection="column" p={4} spacing={3} textAlign="center">
                      <Grid item> <h4>Are you sure you want to cancel this order?</h4> </Grid>
                      <Grid item>
                          <Button onClick={ cancelOrder} variant='contained' size='large'>
                            Yes
                          </Button>
                          <Button onClick={handleClose} variant='outlined' size='large' >
                            No
                          </Button>
                      </Grid>
                    </Grid>
                  </Dialog>
                </div>
            </div>)
        break
        case 2:
          component = <OrderSummary/>
        break
        default:
          component = <p>Something went wrong.</p>
      }
    return component;
  }

  let content;
  if (getCart() === null || getCart().length===0) {
    content = (
      <div>
        <NavBar />
        <p>No items in cart found. Select the items from menu first.</p>
      </div>
    )
  } else {
    content = (
      <div>
        <NavBar />
        <div className={classes.root}>
            <Box marginBottom={8}>
              <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          <SwitchRender value={activeStep}/>
          <Grid m={3}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              size='large'
              className={classes.button}
              startIcon={<NavigateBeforeIcon/>} >
                Back
            </Button>
            <Button
                variant="contained"
                onClick={handleNext}
                className={classes.button}
                size='large'
                endIcon={<NavigateNextIcon/>}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Grid>
        </div>
        <Footer/>
      </div>
    );
  }
  return content;
}
