import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Layout from './Layout';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import { Grid, TextField } from '@material-ui/core';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class Deposits extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stockList: [],
            notifyError: false,
            userPortfolio: {},
            buyingModal: false,
            units : 0,
            buyStockId : "",
            stockPrice : 0,
            availableCash : 0,
            sellingModal: false,
            sellStockId : "",
            sellStockUnits:0

        }

        this.openDialog = this.openDialog.bind(this);
        this.closeSellingModal = this.closeSellingModal.bind(this);
        this.closebuyingModal = this.closebuyingModal.bind(this);
        this.openSellDialog = this.openSellDialog.bind(this);
        this.getNoOfBuyingStock = this.getNoOfBuyingStock.bind(this);
        this.getNoOfSellingStock = this.getNoOfSellingStock.bind(this);
        this.createBuyRequest = this.createBuyRequest.bind(this);
        this.createSellRequest = this.createSellRequest.bind(this);
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

    openDialog(stockId, stockPrice) {
        this.setState({
            buyingModal: true,
            buyStockId: stockId,
            stockPrice: stockPrice
        })
    }

    openSellDialog(stockId, stockUnit) {
        this.setState({
            sellingModal: true,
            sellStockId: stockId,
            availableNumStock : stockUnit
        })
    }


    createBuyRequest() {
        this.setState({
            buyingModal: false
        })

        //Post call to buy Stock and after success deducting the price for sold stocks to Available Cash(no need of updating if actual database connection is done)

        //Check if stocks can be bought in available Cash
        let finalValue = this.state.stockPrice * this.state.units;
        if (finalValue < this.state.availableCash) {
            let userId = 2;
            var headers = {
                "Content-Type": "application/json"
            }

            
            var postOptions = {
                stockId: this.state.buyStockId,
                unitsToBuy: this.state.units
            }

            axios.post(`https://work.setu.co/assignments/stock-ui/${userId}/buy`, postOptions, headers)
                .then((response) => {
                    this.setState({
                        stockList: response.data.data
                    })
                })
                .catch((error) => {

                })

        }
        else {
             alert("Not available cash");
        }

        
    }


    createSellRequest() {
        this.setState({
            sellingModal: false
        })

        //Check if stocks can be sold in available number of Stocks
        if (this.state.sellStockUnits <= this.state.availableNumStock) {
            let userId = 2;
            var headers = {
                "Content-Type": "application/json"
            }

            var soldStockPrice = 0;

            var postOptions = {
                stockId: this.state.sellStockId,
                unitsToSell: this.state.sellStockUnits
            }


            //Post call to sell Stock and after success adding the price for sold stocks to Available Cash

            axios.post(`https://work.setu.co/assignments/stock-ui/${userId}/sell`, postOptions, headers)
                .then((response) => {
                    console.log(response)
                    soldStockPrice = response.data.price;
                    this.setState({
                        availableCash : (this.state.availableCash + soldStockPrice)
                    })

                })
                .catch((error) => {
                    console.log(error.status);
                })

        }
        else {
            alert("not available Stock");
        }


        
    }

    closeSellingModal(){
        this.setState({
            sellingModal : false
        })
    }


    closebuyingModal() {
        this.setState({
            buyingModal: false
        })
    }


    getNoOfBuyingStock(e) {
        let numStock = e.target.value;
        
            this.setState({
                units: numStock
            })

       
        

    }

    getNoOfSellingStock(e) {
        let numStock = e.target.value;

        
            this.setState({
                sellStockUnits : numStock
            })
    

    }




    componentDidMount() {
        this.getStocks();
        this.interval = setInterval(() => this.getStocks(), 10000);
        let userId = 2;

        axios.get(`https://work.setu.co/assignments/stock-ui/${userId}/portfolio`)
            .then((response) => {
                this.setState({
                    userPortfolio: response.data.data,
                    availableCash: response.data.data.cash
                })
            })
            .catch((error) => {
                this.setState({
                    notifyError: true
                })
            })
    }

    closeNotifyError = () => {
        this.setState({
            notifyError: false
        })
    }




    render() {
        const { classes, theme } = this.props;
        return (
            <Layout>
                <div style={{ width: '90%', margin: 'auto' }}>
                
                <h2>List Of Stocks</h2>

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
                                                <Button variant="contained" onClick={() => this.openDialog(row.id, row.price)} color="primary">
                                                    BUY
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>

                        </Table>
                        : ""
                }

               
                                        
                

                <h2>User Portfoilo</h2>  
                {
                    <p>
                        Available Cash : {this.state.userPortfolio.cash}
                    </p>
                }

                <h2>My Stocks</h2> 



                    {
                        this.state.userPortfolio.buys ?
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Stock Name</TableCell>
                                        <TableCell>Stock Units</TableCell>
                                        <TableCell>Sell Option</TableCell>
                                    </TableRow>
                                </TableHead>


                                <TableBody>
                                    {

                                        this.state.userPortfolio.buys.map(row => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.units}</TableCell>
                                                <TableCell id={row.id}>
                                                    <Button variant="contained" onClick={() => this.openSellDialog(row.id, row.units)} color="primary">
                                                        SELL
                                                    </Button>
                                                </TableCell>    
                                            </TableRow>
                                        ))}
                                </TableBody>

                            </Table>
                            : ""
                    }
 
               
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
                        <Button variant="contained" onClick={this.closeNotifyError} color="primary">
                            Close
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
                                    onChange={(e) => { this.getNoOfBuyingStock(e) }}

                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.createBuyRequest} color="primary">
                                CONFIRM
                        </Button>
                        </DialogActions>
                    </Dialog>



                    <Dialog
                        open={this.state.sellingModal}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.closeSellingModal}
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
                                    onChange={(e) => { this.getNoOfSellingStock(e) }}

                                />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.createSellRequest} color="primary">
                                CONFIRM
                        </Button>
                        </DialogActions>
                    </Dialog>





                </div>  

            </Layout>
        )
    }
}

export default Deposits;