import React from 'react'
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {useHistory} from "react-router-dom";
import Session from '../../Context/Session';
import axios from 'axios';

export default function StartOrderingButton({vans}) {

    const history = useHistory();  
    const { setVan, getVan, vanEmpty } = Session()

    const selectVan = () => {
      // If no van is selected, automatically selects the closest one, then go login/menu
      if (vanEmpty()) {
        let smallestDist = 20038 // furthest location on earth in km
        let closestVan
        for (let i in vans) {
          if (vans[i].dist < smallestDist) {
            smallestDist = vans[i].dist
            closestVan = vans[i].van
          }
        }
        setVan(closestVan)
        history.push('/login')
      }
      // Else go log in/menu
      else {
        history.push('/login')
      }
    }

    return (
    <div>
        <Button
            style={{backgroundColor: "green"}}
            variant="contained"
            size="large"
            startIcon={<LocationOnIcon />}
            onClick={selectVan}
            >
            Start ordering
        </Button>
    </div>
    
    )
  }