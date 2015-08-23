import React, { Component, PropTypes } from 'react';

import './TrackListItem.scss';

export default class TrackListItem extends Component {

    render() {
        const { name } = this.props.track;

        return (
            <li className="track-list-item">
                <span className="track-list-item-name">{name}</span>
            </li>
        );
    }

}

TrackListItem.propTypes = {
    track: PropTypes.object.isRequired
};
