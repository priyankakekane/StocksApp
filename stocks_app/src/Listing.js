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
import TextField from '@material-ui/core/TextField';




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
            buyingModal : false,
            units: 0
        }

        this.createBuyRequest = this.createBuyRequest.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.getNoOfBuyingStock = this.getNoOfBuyingStock.bind(this);


    }



    componentDidMount() {
        this.getStocks();
        
    }

    closeNotifyError = () => {
        this.setState({
            notifyError: false
        })
    }

    closebuyingModal = () =>{
        this.setState({
            buyingModal : false
        })
    }

    openDialog(stockId, stockPrice){
        this.setState({
            buyingModal : true,
            buyStockId : stockId,
            stockPrice : stockPrice
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

    createBuyRequest() {
        let userId = 2;
        var headers = {
            "Content-Type": "application/json"
        }

        var postOptions = {
            stockId : this.state.buyStockId,
            unitsToBuy : this.state.units
        }
    
        axios.post(`https://work.setu.co/assignments/stock-ui/${userId}/buy`, postOptions, headers)
            .then((response) => {
                this.setState({
                    buyingModal : false,
                    stockList: response.data.data
                })
            })
            .catch((error) => {
                this.setState({
                    notifyError: true
                })
            })

        
    }

    getNoOfBuyingStock(e) {
        console.log(e.target.value)

    

        this.setState({
            units : e.target.value
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
                                            <Button onClick={() => this.openDialog(row.id, row.price)} color="primary">
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
                        <Button color="primary">
                            Retry
                        </Button>

                        
                    </DialogActions>
                </Dialog>


                <Dialog
                    open={this.state.buyingModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.closebuyingModal}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">Buy  Stock</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <TextField
                                id="standard-number"
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=>{this.getNoOfBuyingStock(e)}}
                                
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.createBuyRequest} color="primary">
                            CONFIRM
                        </Button>
                    </DialogActions>
                </Dialog>




            </Layout>       
    )}
}

export default Orders;