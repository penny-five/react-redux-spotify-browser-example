import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBox from './SearchBox';
import ArtistGrid from './ArtistGrid';
import { changeArtistSearchPhrase, searchArtists } from '../../actions/creators';

class Search extends Component {

    componentDidUpdate() {
        const { results, searchPhrase, isSearching } = this.props;
        if (results.length === 0 && searchPhrase.length > 0 && !isSearching) {
            this.props.dispatch(searchArtists(this.props.searchPhrase, 0));
        }
    }

    render() {
        const { searchPhrase, results, dispatch } = this.props;
        return (
            <div>
                <SearchBox
                    query={searchPhrase}
                    onQueryChange={q => dispatch(changeArtistSearchPhrase(q))} />
                <ArtistGrid
                    artists={results}
                    onShowMore={() => this.fetchMoreResults()} />
            </div>
        );
    }

    fetchMoreResults() {
        const { searchPhrase, results } = this.props;
        this.props.dispatch(searchArtists(searchPhrase, results.length));
    }
}

export default connect(state => {
    const {searchPhrase, isSearching, searchResults } = state.spotify;
    return {
        searchPhrase,
        isSearching,
        results: searchResults[searchPhrase] || []
    };
})(Search);