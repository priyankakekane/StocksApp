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


class Deposits extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stockList: [],
            notifyError: false,
            userPortfolio: {},
        }

    }



    componentDidMount() {
        let userId = 2;

        axios.get(`https://work.setu.co/assignments/stock-ui/${userId}/portfolio`)
            .then((response) => {
                console.log(response);
                this.setState({
                    userPortfolio: response.data.data
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
        console.log(this.state.userPortfolio);
        return (
            <Layout>

                 {
                    this.state.userPortfolio.buys ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Stock Name</TableCell>
                                    <TableCell>Stock Units</TableCell>
                                </TableRow>
                            </TableHead>


                            <TableBody>
                                {

                                    this.state.userPortfolio.buys.map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.units}</TableCell>
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
        )
    }
}

export default Deposits;