import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Deposits from './Deposits';
import Orders from './Orders';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            stockList: [],
            notifyError: false,
            userPortfolio : {},
        }
        
    }



    componentDidMount() {
        axios.get('https://work.setu.co/assignments/stock-ui/stocks')
            .then( (response) => {
                this.setState({
                    stockList : response.data.data
                })
            })
            .catch((error) => {
                this.setState({
                    notifyError: true
                })
            })

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
            notifyError : false
        })
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme } = this.props;

        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Mini variant drawer
            </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {['List Stocks', 'User Portfolio'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={fixedHeightPaper}>
                                    <Deposits userDetails={this.state.userPortfolio}/>
                                </Paper>
                            </Grid>

                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Orders stockList={this.state.stockList}/>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Container>    

                    

                   
                </main>
            
                <Snackbar open={this.state.notifyError} autoHideDuration={6000} onClose={this.closeNotifyError}>
                    <Alert severity="error" onClose={this.closeNotifyError}>
                        Facing Some Issue
                    </Alert>
                </Snackbar>

            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboard);
