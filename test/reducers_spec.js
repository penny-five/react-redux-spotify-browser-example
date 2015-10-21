import { spotify as reducer } from '../src/reducers';
import * as actionCreators from '../src/actions/creators';

describe('reducer', () => {
    let defaultState, testArtist_1, testArtist_2, testAlbum_1, testAlbum_2;

    beforeEach(() => {

        defaultState = {
            searchPhrase: '',
            searchResults: {},
            isSearching: false,
            artists: {},
            albums: {}
        };

        testArtist_1 = {
            id: 'testArtistId',
            name: 'testArtist',
            albums: []
        };

        testArtist_2 = {
            id: 'testArtist2Id',
            name : 'testArtist2',
            albums: []
        };

        testAlbum_1 = {
            id: 'testAlbum1',
            name: 'testAlbum1'
        };

        testAlbum_2 = {
            id: 'testAlbum2',
            name: 'testAlbum2'
        };
    });

    it('should return default state', () => {
        expect(reducer(undefined, {})).to.deep.equal(defaultState);
    });

    it('should handle CHANGE_ARTIST_SEARCHPHRASE', () => {
        const action = actionCreators.changeArtistSearchPhrase(testArtist_1.name);
        expect(reducer(defaultState, action)).to.deep.equal({
            ...defaultState,
            searchPhrase: testArtist_1.name
        });
    });

    it('should handle SEARCH_ARTISTS', () => {
        const action = actionCreators.searchArtists(testArtist_1.name);
        expect(reducer(defaultState, action)).to.deep.equal({
            ...defaultState,
            isSearching: true
        });
    });

    it('should handle ARTIST_RESULTS_READY', () => {
        const initialState = { ...defaultState, isSearching: true };
        const action = actionCreators.artistResultsReady(testArtist_1.name, 0, [testArtist_1]);

        expect(reducer(initialState, action)).to.deep.equal({
            ...initialState,
            searchResults: { [testArtist_1.name]: [testArtist_1] },
            isSearching: false
        });
    });

    it('should handle multiple ARTIST_RESULTS_READY\'s', () => {
        const initialState = {
            ...defaultState,
            isSearching: true
        };
        const actions = [
            actionCreators.artistResultsReady(testArtist_1.id, 0, [testArtist_1]),
            actionCreators.artistResultsReady(testArtist_2.id, 0, [testArtist_2])
        ];

        expect(actions.reduce(reducer, initialState)).to.deep.equal({
            ...initialState,
            isSearching: false,
            searchResults: {
                [testArtist_1.id]: [testArtist_1],
                [testArtist_2.id]: [testArtist_2]
            }
        });
    });

    it('should handle ARTIST_READY', () => {
        const action = actionCreators.getArtistReady(testArtist_1.id, testArtist_1);

        expect(reducer(defaultState, action)).to.deep.equal({
            ...defaultState,
            artists: {
                [testArtist_1.id]: {
                    artist: testArtist_1,
                    albums: [],
                    isLoadingAlbums: false,
                    isLoadingArtist: false,
                    totalNumAlbums: 0
                }
            }
        });
    });

    it('should handle ARTIST_ALBUMS_READY', () => {
        const initialState = {
            ...defaultState,
            artists: {
                [testArtist_1.id]: {
                    albums: [],
                    isLoadingAlbums: true,
                    isLoadingArtist: false,
                    totalNumAlbums: 0
                }
            }
        };
        const action = actionCreators.artistAlbumsReady(testArtist_1.id, 0, [testAlbum_1], 20);

        expect(reducer(defaultState, action)).to.deep.equal({
            ...initialState,
            artists: {
                [testArtist_1.id]: {
                    albums: [testAlbum_1],
                    isLoadingAlbums: false,
                    isLoadingArtist: false,
                    totalNumAlbums: 20
                }
            }
        });
    });

    it('should handle multiple ARTIST_ALBUMS_READY\'s', () => {
        const initialState = {
            ...defaultState,
            artists: {
                [testArtist_1.id]: {
                    albums: [],
                    isLoadingAlbums: true,
                    isLoadingArtist: false,
                    totalNumAlbums: 0
                }
            }
        };

        const actions = [
            actionCreators.artistAlbumsReady(testArtist_1.id, 0, [testAlbum_1], 20),
            actionCreators.artistAlbumsReady(testArtist_1.id, 0, [testAlbum_2], 20)
        ];

        expect(actions.reduce(reducer, initialState)).to.deep.equal({
            ...initialState,
            artists: {
                [testArtist_1.id]: {
                    albums: [testAlbum_1, testAlbum_2],
                    isLoadingAlbums: false,
                    isLoadingArtist: false,
                    totalNumAlbums: 20
                }
            }
        });
    });

    it('should handle ALBUM_READY', () => {
        const action = actionCreators.albumReady(testAlbum_1.id, testAlbum_1);

        expect(reducer(defaultState, action)).to.deep.equal({
            ...defaultState,
            albums: {
                [testAlbum_1.id]: {
                    album: testAlbum_1,
                    isLoading: false
                }
            }
        });
    });
});