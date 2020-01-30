import React, { Component } from 'react';
import axios from "axios";
import Loadable from 'react-loading-overlay';
import Header from './Header';
import MiniDrawer from './MiniDrawer';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderActive: false,
        }

        axios.interceptors.request.use((config) => {
            this.setState({ loaderActive: true })
            return config;
        }, function (error) {
            return Promise.reject(error);
        });


        axios.interceptors.response.use((response) => {
            this.setState({ loaderActive: false })
            return response;
        }, (error) => {
            this.setState({ loaderActive: false })
            return Promise.reject(error);
        });

    }



    render() {
        return (
            <Loadable
                active={this.state.loaderActive}
                spinner
                fadeSpeed={100}
                text='Loading...'
            >
                <div style={(this.state.loaderActive) ? { 'overflow': 'hidden', 'height': '100vh' } : {}}>
                <div>
                    <Header />
                    <MiniDrawer childComponent={this.props.children} />

                </div>
                </div>
            </Loadable>

        );
    }
}

export default Layout;