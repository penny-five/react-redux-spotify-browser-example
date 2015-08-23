import React, { Component, PropTypes } from 'react';

import TrackListItem from './TrackListItem';

export default class TrackList extends Component {

    render() {
        const { tracks } = this.props;
        return (
            <ol>
                { tracks.map(track => <TrackListItem key={track.id} track={track} />) }
            </ol>
        );
    }

}

TrackList.propTypes = {
    tracks: PropTypes.array.isRequired
};