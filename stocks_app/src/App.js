import React, { Component } from 'react';
import axios from "axios";
import { Switch, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import Listing from './Listing';
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
                <Route exact path="/" component={Listing} />
                <Route path="/portfolio" component={Portfolio} />
            </Switch>
        )
    }
}

export default App;