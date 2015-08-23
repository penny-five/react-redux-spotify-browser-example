import React, { Component } from 'react';
import { connect } from 'react-redux';

import BackButton from '../BackButton';
import SpotifyImage from '../SpotifyImage';
import TrackList from './TrackList';
import { getAlbum } from '../../actions/creators';

import './Album.scss';

export default class Album extends Component {

    constructor(props) {
        super(props);
        this.checkIfNeedDispatch();
    }

    componentDidUpdate() {
        this.checkIfNeedDispatch();
    }

    checkIfNeedDispatch() {
        const { albumId, isLoading, album } = this.props;
        if (!album && !isLoading) {
            this.props.dispatch(getAlbum(albumId));
        }
    }

    render() {
        return (
            <div className="album">
                {this.props.album ? this.renderAlbum() : null}
                {this.props.album ? this.renderTracks() : null}
            </div>
        );
    }

    renderAlbum() {
        const { name, images, tracks } = this.props.album;
        const trackCount = tracks.items.length;
        return (
            <div>
                <BackButton target={`artists/${this.props.artistId}`} />
                <div className="album-header">
                    <SpotifyImage style={{float: 'left'}} images={images} />
                    <div className="album-header-details">
                        <p className="small-label">Album name</p>
                        <span className="album-header-name">{name}</span>
                        <p className="small-label">{trackCount} tracks</p>
                    </div>
                </div>
            </div>
        );
    }

    renderTracks() {
        return (
            <TrackList tracks={this.props.album.tracks.items} />
        );
    }
}

export default connect(state => {
    const { albumId, artistId } = state.router.params;
    const albumData = state.spotify.albums[albumId];
    return {
        albumId,
        artistId,
        isLoading: albumData ? albumData.isLoading : false,
        album: albumData ? albumData.album : null
    };
})(Album);