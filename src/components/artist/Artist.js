import React, { Component } from 'react';
import { connect } from 'react-redux';

import BackButton from '../BackButton';
import SpotifyImage from '../SpotifyImage';
import AlbumList from './AlbumList';
import { getArtist, getArtistAlbums } from '../../actions/creators';

import './Artist.scss';

export default class Artist extends Component {

    constructor(props) {
        super(props);
        this.checkIfNeedDispatch();
    }

    componentDidUpdate() {
        this.checkIfNeedDispatch();
    }

    checkIfNeedDispatch() {
        const { artistId, artist, albums, isLoadingArtist, isLoadingAlbums } = this.props;
        if (!artist && !isLoadingArtist) {
            this.props.dispatch(getArtist(artistId));
        }
        if (!albums && !isLoadingAlbums) {
            this.props.dispatch(getArtistAlbums(artistId));
        }
    }

    render() {
        const { artist, albums } = this.props;
        return (
            <div className="artist">
                {artist && albums ? this.renderArtist() : null}
                {albums && albums ? this.renderAlbums() : null}
            </div>
        );
    }

    renderArtist() {
        const { totalNumAlbums, artist: { name, images } } = this.props;
        return (
            <div>
                <BackButton target='/' />
                <div className="artist-header">
                    <SpotifyImage style={{float: 'left'}} circular={true} images={images} />
                    <div className="artist-header-details">
                        <p className="small-label">Artist name</p>
                        <span className="artist-header-name">{name}</span>
                        <p className="small-label">{totalNumAlbums} albums</p>
                    </div>
                </div>
            </div>
        );
    }

    renderAlbums() {
        const { artistId, albums, totalNumAlbums } = this.props;
        return (
            <AlbumList
                artistId={artistId}
                albums={albums}
                canShowMore={albums.length < totalNumAlbums}
                onShowMore={() => this.fetchMoreAlbums()} />
        );
    }

    fetchMoreAlbums() {
        const { artistId, albums } = this.props;
        this.props.dispatch(getArtistAlbums(artistId, albums.length));
    }
}

export default connect(state => {
    const artistId = state.router.params.artistId;
    const artist = state.spotify.artists[artistId] || {
        isLoadingArtist: false,
        isLoadingAlbums: false
    };
    return {
        artistId,
        ...artist
    };
})(Artist);