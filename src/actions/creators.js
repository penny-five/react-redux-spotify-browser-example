import * as actions from './actions';

const API_URI = 'https://api.spotify.com/v1';

export function changeArtistSearchPhrase(searchPhrase) {
    return {
        type: actions.CHANGE_ARTIST_SEARCHPHRASE,
        searchPhrase
    };
}

export function searchArtists(searchPhrase, offset = 0) {
    return {
        type: actions.SEARCH_ARTISTS,
        searchPhrase,
        offset,
        url: `${API_URI}/search?q=${searchPhrase}&type=artist&offset=${offset}`,
        onSuccess: (res, dispatch) => dispatch(artistResultsReady(searchPhrase, offset, res.artists.items))
    };
}

export function artistResultsReady(searchPhrase, offset, results) {
    return {
        type: actions.ARTIST_RESULTS_READY,
        searchPhrase,
        offset,
        results
    };
}

export function getArtist(artistId) {
    return {
        type: actions.GET_ARTIST,
        artistId,
        url: `${API_URI}/artists/${artistId}`,
        onSuccess: (res, dispatch) => dispatch(getArtistReady(artistId, {
            genres: res.genres,
            images: res.images,
            name: res.name
        }))
    };
}

export function getArtistReady(artistId, artist) {
    return {
        type: actions.ARTIST_READY,
        artistId,
        artist
    };
}

export function getArtistAlbums(artistId, offset = 0) {
    return {
        type: actions.GET_ARTIST_ALBUMS,
        artistId,
        offset,
        url: `${API_URI}/artists/${artistId}/albums?offset=${offset}`,
        onSuccess: (res, dispatch) => dispatch(artistAlbumsReady(artistId, offset, res.items, res.total))
    };
}

export function artistAlbumsReady(artistId, offset, albums, totalNumAlbums) {
    return {
        type: actions.ARTIST_ALBUMS_READY,
        artistId,
        offset,
        albums,
        totalNumAlbums
    };
}

export function getAlbum(albumId) {
    return {
        type: actions.GET_ALBUM,
        albumId,
        url: `${API_URI}/albums/${albumId}`,
        onSuccess: (res, dispatch) => dispatch(albumReady(albumId, res))
    };
}

export function albumReady(albumId, album) {
    return {
        type: actions.ALBUM_READY,
        albumId,
        album
    };
}