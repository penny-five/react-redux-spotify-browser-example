import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import StaggeredGridItem from '../StaggeredGridItem';
import SpotifyImage from '../SpotifyImage';

import './ArtistGridItem.scss';

const PLACEHOLDER_WIDTH = 240, PLACEHOLDER_HEIGHT = 252;

export default class ArtistGridItem extends StaggeredGridItem {

    render() {
        const { name, id, images } = this.props.artist;
        return (
            <li className="artist-grid-item">
                <Link to={`artists/${id}`}>
                    <div className="artist-grid-item-content-wrapper" ref="wrapper">
                        <div className="artist-grid-inner-wrapper">
                            <SpotifyImage style={{width: '100%', height:'100%'}} images={images} bordered={false} />
                            <div className="artist-grid-item-image-overlay" />
                        </div>
                        <span className="artist-grid-item-title">{name}</span>
                    </div>
                </Link>
            </li>
        );
    }

    measureHeight(width) {
        const { images } = this.props.artist;

        let height;
        if (images.length > 0) {
            let image = images[0];
            height = width * (image.height / image.width);
        } else {
            height = width * (PLACEHOLDER_HEIGHT / PLACEHOLDER_WIDTH);
        }
        return height;
    }

}

ArtistGridItem.propTypes = {
    artist: PropTypes.object.isRequired
};
