import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import StickyHeader from 'src/components/StickyHeader';

describe('StickyHeader', () => {
    let component;
    let DOMNode;

    beforeEach(() => {
        component = renderIntoDocument(<StickyHeader />);
        DOMNode = findDOMNode(component);
    });

    it('should have class sticky-header-is-top when rendered', () => {
        expect(DOMNode.classList.contains('sticky-header-is-top')).to.equal(true);
    });

    it('should not have class sticky-header-is-top when page is scrolled', () => {
        window.scrollY = 100;
        window.dispatchEvent(new Event('scroll'));
        expect(DOMNode.classList.contains('sticky-header-is-top')).to.equal(false);
    });

    it('should have class sticky-header-is-top when page is scrolled back to top', () => {
        window.scrollY = 100;
        window.dispatchEvent(new Event('scroll'));
        window.scrollY = 0;
        window.dispatchEvent(new Event('scroll'));
        expect(DOMNode.classList.contains('sticky-header-is-top')).to.equal(true);
    });
});