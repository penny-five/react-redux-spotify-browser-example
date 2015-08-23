import React, { Component, PropTypes } from 'react';

import StaggeredGrid from '../StaggeredGrid';
import ArtistGridItem from './ArtistGridItem';
import ShowMoreButton from '../ShowMoreButton';

export default class ArtistGrid extends Component {

    render() {
        return (
            <div className="artist-grid">
                <StaggeredGrid columnCount={4}>
                    {this.props.artists.map(artist => <ArtistGridItem key={artist.id} artist={artist} />)}
                </StaggeredGrid>
                {this.props.artists.length > 0 ? <ShowMoreButton onClick={this.props.onShowMore} /> : null}
            </div>
        );
    }

}

ArtistGrid.propTypes = {
    artists: PropTypes.array.isRequired,
    onShowMore: PropTypes.func.isRequired
};

