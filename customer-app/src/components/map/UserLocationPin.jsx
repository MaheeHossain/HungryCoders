import React from 'react'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import IconButton from '@material-ui/core/IconButton';
import Session from '../../Context/Session';
import {useHistory} from "react-router-dom";

export default function UserLocationPin({text}) {

    const { isLoggedIn } = Session()
    const history = useHistory();  

    const goLogin = () => {
        if (!isLoggedIn()) {
            history.push('/login')
        }
    }

    return (
        <div className="pin">
            <IconButton 
                onClick={goLogin}
            >
                <PersonPinCircleIcon fontSize="large"/>
            </IconButton> :
            <p className="pin-text">{text}</p>
        </div>
    )
}