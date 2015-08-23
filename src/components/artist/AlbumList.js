import React, { Component, PropTypes } from 'react';

import AlbumListItem from './AlbumListItem';
import ShowMoreButton from '../ShowMoreButton';

export default class Albumlist extends Component {

	render() {
        const { artistId, albums, canShowMore, onShowMore } = this.props;
        return (
			<ol>
                { albums.map(album => <AlbumListItem key={album.id} artistId={artistId} album={album} />) }
                { albums.length > 0 && canShowMore? <ShowMoreButton onClick={onShowMore} /> : null }
            </ol>
		);
    }

}

Albumlist.propTypes = {
    artistId: PropTypes.string.isRequired,
    albums: PropTypes.array.isRequired,
    canShowMore: PropTypes.bool.isRequired,
    onShowMore: PropTypes.func.isRequired
};