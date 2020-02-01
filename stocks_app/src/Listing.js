import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Layout from './Layout';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Orders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stockList: [],
            notifyError: false,
            userPortfolio: {},
        }

        this.createBuyRequest = this.createBuyRequest.bind(this);

    }



    componentDidMount() {
        this.getStocks();
        
    }

    closeNotifyError = () => {
        this.setState({
            notifyError: false
        })
    }

    getStocks() {
        axios.get('https://work.setu.co/assignments/stock-ui/stocks')
            .then((response) => {
                this.setState({
                    stockList: response.data.data
                })
            })
            .catch((error) => {
                this.setState({
                    notifyError: true
                })
            })
    }

    createBuyRequest(stockId) {
        console.log(stockId);
        let userId = 2;
        var headers = {
            "Content-Type": "application/json"
        }

        var postOptions = {
            stockId : stockId,
            unitsToBuy : 5
        }

        axios.post(`https://work.setu.co/assignments/stock-ui/${userId}/buy`, postOptions, headers)
            .then((response) => {
                this.setState({
                    stockList: response.data.data
                })
            })
            .catch((error) => {
                this.setState({
                    notifyError: true
                })
            })

        
    }

    


    render() {
        const { classes, theme } = this.props;
        return (
            <Layout>

                {
                    this.state.stockList ?
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Stock Name</TableCell>
                                <TableCell>Stock Price</TableCell>

                                {
                                    this.state.stockList.units ?
                                        <TableCell>Stock Units</TableCell>
                                        : ""
                                }
                                <TableCell>
                                    Buy Stock
                                </TableCell>


                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {

                                this.state.stockList.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        {
                                            row.price ?
                                                <TableCell>{row.price}</TableCell>
                                            : ""
                                        }
                                        {
                                            row.units ?
                                                <TableCell>{row.price}</TableCell>
                                            : ""
                                        }

                                        <TableCell id={row.id}>
                                            <Button onClick={() => this.createBuyRequest(row.id)} color="primary">
                                                BUY
                                            </Button>
                                        </TableCell>    
                                    </TableRow>
                                ))}
                        </TableBody>

                    </Table>
                    : ""
                }

                <Snackbar open={this.state.notifyError} autoHideDuration={6000} onClose={this.closeNotifyError}>
                    <Alert severity="error" onClose={this.closeNotifyError}>
                         Facing Some Issue
                    </Alert>
                </Snackbar>

                <Dialog
                    open={this.state.notifyError}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.closeNotifyError}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">Unable to Fetch Data</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                           Facing Issue
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeNotifyError} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.getStocks} color="primary">
                            Retry
                        </Button>

                        
                    </DialogActions>
                </Dialog>



            </Layout>       
    )}
}

export default Orders;