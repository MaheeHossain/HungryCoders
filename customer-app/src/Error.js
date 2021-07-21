import React from 'react';
import Button from '@material-ui/core/Button';

function Error() {
  return(
  <div>
    <h1>Oops! Something went wrong</h1>
    <h3>You've taken a wrong turn</h3>
    <Button
        variant="contained"
        color="primary"
        href="/"
        size="large"
        >
        Go back home
    </Button>
  </div>);
}

export default Error;