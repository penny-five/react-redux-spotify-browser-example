import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

/**
    Items used in StaggeredGrid should extend this class and implement method onMeasureHeight(width).
*/
export default class StaggeredGridItem extends Component {

    componentDidMount() {
        ReactDOM.findDOMNode(this).className += ' staggered-grid-item';
        this.measure();
    }

    componentWillReceiveProps() {
        this.measure();
    }

    measure() {
        let node = ReactDOM.findDOMNode(this);
        node.style.width = this.props.width;
        node.style.height = `${this.measureHeight(node.offsetWidth)}px`;
    }

    measureHeight() {
        console.warn('StaggeredGridItem subclass didn\'t override measureHeight()');
    }
}

StaggeredGridItem.propTypes = {
    width: PropTypes.string.isRequired
};