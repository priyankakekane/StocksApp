import React, { Component } from 'react';
import axios from "axios";
import { Switch, Route } from 'react-router-dom';
import Deposits from './Deposits';
import Orders from './Orders';
import Layout from './Layout';
import MiniDrawer from './MiniDrawer';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Orders} />
                <Route path="/portfolio" component={Deposits} />
            </Switch>
        )
    }
}

export default App;