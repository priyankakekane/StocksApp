import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles(theme => ({
    // seeMore: {
    //     marginTop: theme.spacing(3),
    // },
}));

export default function Orders(props) {
    const classes = useStyles();
    let stockRows = props.stockList;

    function onSelectAllClick(id) {
        console.log(id);
        
    }

    return (
        <React.Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Stock Name</TableCell>
                        <TableCell>Stock Price</TableCell>
                        <TableCell>Buy</TableCell>
                        <TableCell>Sell</TableCell>
                    </TableRow>
                </TableHead>
                {
                    stockRows ?

                        <TableBody>
                            {

                                stockRows.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.price}</TableCell>
                                        <TableCell padding="checkbox">
                                           
                                                                                   
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>


                    : ""
                }
                
            </Table>
            
        </React.Fragment>
    );
}