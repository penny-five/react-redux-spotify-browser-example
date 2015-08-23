import React, { Component, PropTypes } from 'react';
import minigrid from 'minigrid';

/**
    Simple grid component built on top of Minigrid.

    All children should extend StaggeredGridItem.
*/
export default class StaggeredGrid extends Component {

    componentDidMount() {
        minigrid(this.refs.grid, '.staggered-grid-item', 0);
    }

    componentDidUpdate() {
        minigrid(this.refs.grid, '.staggered-grid-item', 0);
    }

    render() {
        const childWidth = 100 / this.props.columnCount + '%';
        const children = this.props.children.map(child => React.cloneElement(child, {
            width: childWidth
        }));
        return (
            <ol ref="grid">
                { children }
            </ol>
        );
    }
}

StaggeredGrid.propTypes = {
    columnCount: PropTypes.number.isRequired
};