import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import SpotifyImage from '../SpotifyImage';

import './AlbumListItem.scss';

export default class AlbumListItem extends Component {

    render() {
        const artistId = this.props.artistId;
        const { name, id, images } = this.props.album;

        return (
            <li className="album-list-item">
                <Link to={`artists/${artistId}/albums/${id}`}>
                    <div>
                        <SpotifyImage style={{float: 'left'}} images={images} />
                        <span className="album-list-item-title">{name}</span>
                    </div>
                </Link>
            </li>
        );
    }

}

AlbumListItem.propTypes = {
    artistId: PropTypes.string.isRequired,
    album: PropTypes.object.isRequired
};
