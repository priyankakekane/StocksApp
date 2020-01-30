import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    btnBlock: {
        '&:hover': {
            backgroundColor: 'white',
        },
    },
    name: {
        color: '#ffff',
        backgroundColor: '#4A90E2',
        borderRadius: '50%',
        fontSize: '20px',
        width: '32px',
        height: '32px',
        marginRight: '4px',
        lineHeight: '32px',
        verticalAlign: 'middle',
    },
    userTab: {
        textDecoration: 'none',
        width: '100%',
        color: '#333333',
        fontSize: '17px',
        fontWeight: '500',
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center'
    },
    headerMenu: {
        marginTop: '47px',
        marginLeft: '-37px'
    },
    billerLogo: {
        marginLeft: '62px !important',
    }

});


class Header extends Component {
    constructor(props) {
        super(props);
        var currentValue = 0;
        this.state = {
        }

    }


    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static" style={{ backgroundColor: 'white', marginBottom: '19px', padding: '0 4%', boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)' }}>

                    <Toolbar style={{ justifyContent: 'space-between' }}>
                        <img src="https://zerodha.com/static/images/logo.svg" width="100" height="32" className={classes.billerLogo} />

                    </Toolbar>
                </AppBar>

            </div>
        );
        ;


    }
}

export default withStyles(styles)(Header);
