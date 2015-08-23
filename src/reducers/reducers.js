import * as actions from '../actions/actions';

const defaultState = {
    searchPhrase: '',
    searchResults: {},
    isSearching: false,
    artists: {
        /*
        Example data. Artist id's are used as keys.

        "1231945094350943": {
            isLoadingArtist: false,
            isLoadingAlbums: false,
            totalNumAlbums: 0,
            albums: [
                {
                    id: "2323142421",
                    name: "album name"
                    ...
                }
            ]
        }
        */
    },
    albums: {
        /*
        Example data. Album id's are used as keys.

        "324324243423434": {
            isLoading: false,
            album: {
                name,
                tracks: {},
                ...
            }
        }
        */
    }
};

export default function(state = defaultState, action) {
    switch(action.type) {

    case actions.CHANGE_ARTIST_SEARCHPHRASE: {
        return {
            ...state,
            isSearching: false,
            searchPhrase: action.searchPhrase
        };
    }

    case actions.SEARCH_ARTISTS: {
        return {
            ...state,
            isSearching: true
        };
    }

    case actions.ARTIST_RESULTS_READY: {
        let results = (state.searchResults[action.searchPhrase] || []).concat(action.results);
        return {
            ...state,
            isSearching: false,
            searchResults: {
                ...state.searchResults,
                [action.searchPhrase]: results
            }
        };
    }

    case actions.GET_ARTIST: {
        let artist = state.artists[action.artistId] || newEmptyArtist();
        artist.isLoadingArtist = true;
        return {
            ...state,
            artists: {
                ...state.artists,
                [action.artistId]: artist
            }
        };
    }

    case actions.ARTIST_READY: {
        let artist = state.artists[action.artistId] || newEmptyArtist();
        artist.artist = action.artist;
        artist.isLoadingArtist = false;
        return {
            ...state,
            artists: {
                ...state.artists,
                [action.artistId]: artist
            }
        };
    }

    case actions.GET_ARTIST_ALBUMS: {
        let artist = state.artists[action.artistId] || newEmptyArtist();
        artist.isLoadingAlbums = true;
        return  {
            ...state,
            artists: {
                ...state.artists,
                [action.artistId]: artist
            }
        };
    }

    case actions.ARTIST_ALBUMS_READY: {
        let artist = state.artists[action.artistId] || newEmptyArtist();
        artist.albums = artist.albums.concat(action.albums);
        artist.totalNumAlbums = action.totalNumAlbums;
        artist.isLoadingAlbums = false;
        return {
            ...state,
            artists: {
                ...state.artists,
                [action.artistId]: artist
            }
        };
    }

    case actions.GET_ALBUM: {
        return {
            ...state,
            albums: {
                ...state.albums,
                [action.albumId]: {
                    isLoading: true
                }
            }
        };
    }

    case actions.ALBUM_READY: {
        return {
            ...state,
            albums: {
                ...state.albums,
                [action.albumId]: {
                    isLoading: false,
                    album: action.album
                }
            }
        };
    }

    default:
        return state;
    }

}

let newEmptyArtist = () => ({
    isLoadingArtist: false,
    isLoadingAlbums: false,
    totalNumAlbums: 0,
    albums: []
});