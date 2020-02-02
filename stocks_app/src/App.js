import React, { Component } from 'react';
import axios from "axios";
import { Switch, Route } from 'react-router-dom';
import Portfolio from './Portfolio';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Portfolio} />
                
            </Switch>
        )
    }
}

export default App;