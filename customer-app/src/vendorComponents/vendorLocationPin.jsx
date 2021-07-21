import React from 'react'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import IconButton from '@material-ui/core/IconButton';

export default function VanLocationPin({text, routeTo}) {
    return (
        <div className="pin">
            <IconButton 
                href={routeTo}
            >
                <LocalShippingIcon fontSize="large"/>
            </IconButton>
            <p className="pin-text">{text}</p>
        </div>
    )
}