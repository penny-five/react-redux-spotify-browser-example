import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import AlbumList from 'src/components/artist/AlbumList';
import ShowMoreButton from 'src/components/ShowMoreButton';
import AlbumListItem from 'src/components/artist/AlbumListItem';

describe('AlbumList', () => {
    let renderer, testArtistId, testAlbums;

    beforeEach(() => {
        renderer = createRenderer();
        testArtistId = '123';
        testAlbums = [
            { id: 0, name: 'TestAlbum1' },
            { id: 1, name: 'TestAlbum2' }
        ];
    });

    it('should render one AlbumListItem child for each album', () => {
        renderer.render(
            <AlbumList
            artistId={testArtistId}
            albums={testAlbums}
            canShowMore={false}
            onShowMore={() => null } />
        );
        const component = renderer.getRenderOutput();
        const children = component.props.children;

        expect(children[0]).to.have.length(testAlbums.length);

        children[0].forEach((child, index) => {
            const expectedAlbum = testAlbums[index];
            expect(child).to.deep.equal(
                <AlbumListItem
                    artistId={testArtistId}
                    key={expectedAlbum.id}
                    album={expectedAlbum} />
            );
        });
    });

    it('should render ShowMoreButton as last child when canShowMore prop is true', () => {
        renderer.render(
            <AlbumList
            artistId="0"
            albums={testAlbums}
            canShowMore={true}
            onShowMore={() => null } />
        );
        const component = renderer.getRenderOutput();
        const children = component.props.children;

        expect(children[children.length - 1].type).to.equal(ShowMoreButton);
    });

    it('should not render ShowMoreButton when canShowMore prop is false', () => {
        renderer.render(
            <AlbumList
            artistId="0"
            albums={testAlbums}
            canShowMore={false}
            onShowMore={() => null } />
        );
        const component = renderer.getRenderOutput();

        component.props.children.forEach(child => {
            if (child) expect(child.type).to.not.equal(ShowMoreButton);
        });
    });
});