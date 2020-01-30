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


            </Layout>
        )
    }
}

export default Deposits;