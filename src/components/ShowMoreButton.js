import React, { Component, PropTypes } from 'react';

import './ShowMoreButton.scss';

export default class ShowMoreButton extends Component {

    render() {
        return (
            <button className="show-more-button" onClick={this.props.onClick}>Show more</button>
        );
    }
}

ShowMoreButton.propTypes = {
    onClick: PropTypes.func.isRequired
};