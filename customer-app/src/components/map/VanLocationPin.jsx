import React from 'react'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import IconButton from '@material-ui/core/IconButton';
import Session from '../../Context/Session';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

export default function VanLocationPin({id, address, message}) {

    const { setVan } = Session()

    const selectVan = () => {
      // select the van on icon
      const vanUrl = "/van/find/" + id
      axios.get(vanUrl)
        .then(response => {
          if (response.status === 200) {
            setVan(response.data[0])
          }
        }).catch(error => {console.log(error)})
    }

    return (
        <div className="pin">
            <IconButton 
                onClick={selectVan}
            >
                <LocalShippingIcon fontSize="large"/>
            </IconButton>
            <Grid>
              <p className="pin-text">{address}</p>
              <p className="pin-text">{message}</p>
            </Grid>
        </div>
    )
}