import React from 'react';
import { reduxRouteComponent } from 'redux-react-router';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import App from './App';
import Search from './components/search/Search';
import Artist from './components/artist/Artist';
import Album from './components/album/Album';

export function createRouter(store) {

    return (
        <Router history={history}>
            <Route component={reduxRouteComponent(store)}>
                <Route component={App}>
                    <Route path="/" component={Search} />
                    <Route path="/artists/:artistId" component={Artist} />
                    <Route path="/artists/:artistId/albums/:albumId" component={Album} />
                </Route>
            </Route>
        </Router>
    );
}