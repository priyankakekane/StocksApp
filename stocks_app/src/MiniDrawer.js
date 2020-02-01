import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PortFolioIcon from '@material-ui/icons/AccountBalance';
import ListStocksIcon from '@material-ui/icons/Assessment';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { MenuList } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
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
    backgroundColor: '#2B2D30',
    color: 'white',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: '#2B2D30',
    color: 'white',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
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
    padding: theme.spacing * 3,
  },
  tabActive:{
    '&:hover': {
     borderRadius: '0 8px 8px 0',	
     backgroundColor: '#4A90E2',
    },
    marginTop: '16px',
    padding: '20px',
    height: '48px',
    width: '95%'
  },
});


class MiniDrawer extends React.Component {
  state = {
    open: false,
    selected: 'transactions',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes, theme } = this.props;
    return (
     <div className="sidebar">
       <div className={classes.root}>
  
          <CssBaseline />
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
              <div className={classes.toolbar}>
                 <IconButton color="inherit" 
                    edge="start" 
                    className={classNames(classes.menuButton, {
                      [classes.hide]: !this.state.open,
                    })}
                    onClick={this.handleDrawerClose} 
                    style={{marginLeft: '-25px'}}>
                  <MenuIcon />
                </IconButton>
              </div>
            </Toolbar>
          
             <MenuList style={{marginTop: '15px'}}>

                <a href="/" style={{textDecoration: 'none'}}>
                  <MenuItem selected={(window.location.pathname == '/') ? true : false} className={classes.tabActive}>
                      <ListItemIcon>
                    <ListStocksIcon style={{ color: '#ffff' }} />
                      </ListItemIcon>
                      <span style={{color: '#ffff'}}>PortFolio</span>                  
                  </MenuItem>
                </a>

             </MenuList>

            <MenuList style={{ marginTop: '15px' }}>

                <a href="/portfolio" style={{ textDecoration: 'none' }}>
                    <MenuItem selected={(window.location.pathname == '/portfolio') ? true : false} className={classes.tabActive}>
                        <ListItemIcon>
                    <PortFolioIcon style={{ color: '#ffff' }}/>
                        </ListItemIcon>
                        <span style={{ color: '#ffff' }}>List Stocks</span>
                    </MenuItem>
                </a>

            </MenuList>

          </Drawer>   
           <main className={classes.content,{ [classes.contentShift]: this.state.open }} style={{width: '100%', overflowX: 'hidden'}}>{this.props.childComponent}</main>   
        </div>
     </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
