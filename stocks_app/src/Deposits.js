import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Orders from './Orders';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Deposits(props) {
    const classes = useStyles();
    console.log(props);
    return (
        <React.Fragment>
            <Typography component="p" variant="h4">
                Available Cash {props.userDetails.cash}
            </Typography>
            {
                props.userDetails.buys ?
                    props.userDetails.buys.length > 0 ?
                    <Orders stockList={props.userDetails.buys}  /> : ""
                : ""
            }
            
            
        </React.Fragment>
    );
}