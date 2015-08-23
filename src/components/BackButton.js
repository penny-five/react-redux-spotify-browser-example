import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './BackButton.scss';

export default class BackButton extends Component {

    render() {
        return (
            <Link to={this.props.target}>
                <i className="back-button fa fa-arrow-left"></i>
            </Link>
        );
    }
}

BackButton.propTypes = {
    target: PropTypes.string.isRequired
};