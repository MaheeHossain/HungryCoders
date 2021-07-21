import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PaymentIcon from '@material-ui/icons/Payment';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [paymentMethod, setPaymentMethod] = React.useState('');

  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div>
      <Grid container flexDirection='column' spacing={3}>
        <Grid item>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Payment method</InputLabel>
            <Select
              value={paymentMethod}
              onChange={handleChange}
              label="Payment method"
            >
              <MenuItem value="">
                <em>Select payment method</em>
              </MenuItem>
              <MenuItem value={10}>Mastercard</MenuItem>
              <MenuItem value={20}>Visa</MenuItem>
              <MenuItem value={30}>PayPal</MenuItem>
              <MenuItem value={40}>Apple Pay</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <Button href='/#/paymentmethods' startIcon={<PaymentIcon/>}>
            <u>Add payment method</u>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
