import React from 'react';
import Button from '@material-ui/core/Button';

export default function OrderStageButtons() {
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                href="/#/vendorpreparing"
                size="large"
                >
                Preparing
            </Button>
            <Button
                variant="contained"
                color="primary"
                href="/#/vendorready"
                size="large"
                >
                Ready
            </Button>
            <Button
                variant="contained"
                color="primary"
                href="/#/vendorcompleted"
                size="large"
                >
                Completed
            </Button>
        </div>
    )
}