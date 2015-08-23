import React, { Component } from 'react';
import classNames from 'classnames';

import './StickyHeader.scss';

export default class StickyHeader extends Component {

    constructor(props) {
        super(props);

        this.state = { isTop: window.scrollY == 0 };

        window.addEventListener('scroll', () => this.setState({
            isTop: window.scrollY == 0
        }));
    }

    render() {
        const classes = classNames(
            'sticky-header',
            { 'sticky-header-is-top': this.state.isTop }
        );

        return (
            <header className={classes}>
                {this.props.children}
            </header>
        );
    }
}