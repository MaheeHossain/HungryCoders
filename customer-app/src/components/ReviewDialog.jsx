import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

import { useMediaQuery } from 'react-responsive';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import HoverRating from '../components/HoverRating';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import FormHandler from '../components/FormHandler.js';
import Session from '../Context/Session';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url("https://images.unsplash.com/photo-1554136310-2464e64fd97f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2602&q=80")`, 
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
  },
  card: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '70vw',
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down(450)]: {
      width: '80vw',
    },
  },
  form: {
    width: '90%',
    margin: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
  },
}));

export default function ReviewDialog(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const history = useHistory();
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' })
  const [rating, setRating] = useState(null);

  // Submit the review
  const submitMethod = (reviewInfo) => {
    const body = {"comment": reviewInfo.comment, "rating": rating }
    const url = 'order/review/' + props.value;
    axios.put(url, body)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // Redirect to home page
          history.push('/#/home')
        }
      }).catch(error => console.log(error))
  }

  let {handleChange, handleSubmit, values } = FormHandler({}, submitMethod);
  let {comment, value} = values;

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen}>
        Rate
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Card className={classes.card}>
          <Box p={2}>
            <h3>Thank you for purchasing from Snacks in a Van!</h3>
          </Box>
          <Box>
            <p>Rate your order:</p>
            <HoverRating value={value} setRating={setRating}/>
            </Box>
              <form className={classes.form} noValidate textarea>
                  <TextField
                    className={classes.textField}
                    label="Comments"
                    margin="normal"
                    multiline
                    fullWidth
                    rows={isMobile ? 5 : 6}
                    defaultValue=""
                    variant="outlined"
                    value={comment}
                    onChange={handleChange}
                    name="comment"
                  />
              </form>
            <Box>
            <Button variant="contained" size='large' onClick={handleSubmit}>
              Confirm
            </Button>
          </Box>
        </Card>
      </Dialog>
    </div>
  );
}
