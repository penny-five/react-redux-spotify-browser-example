import React, { Component } from 'react';

import 'normalize.css';
import 'font-awesome-webpack';
import 'object-fit/dist/polyfill.object-fit';
import 'lazysizes';

import './App.scss';

import StickyHeader from './components/StickyHeader';

export default class App extends Component {
    render() {
        return (
            <div>
                <StickyHeader>
                    <h1>React <mark>Spotify </mark>Browser</h1>
                </StickyHeader>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
