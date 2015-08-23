import React, { Component, PropTypes } from 'react';

import './SearchBox.scss';

export default class SearchBox extends Component {

    render() {
        return (
            <form className="searchbox">
                <i className="fa fa-search"></i>
                <input
                    ref="input"
                    type="text"
                    defaultValue={this.props.query}
                    placeholder="Enter artist name"
                    onChange={ev => this.onChange(ev.timeStamp, ev.target.value)} />
            </form>
        );
    }

    onChange(timeStamp, value) {
        this.lastTimeStamp = timeStamp;
        this.lastValue = value;
        /*
            Let entered value settle in for a while so we don't make unneccessary requests while
            the user is still typing in a search phrase
        */
        setTimeout(() => {
            if (timeStamp == this.lastTimeStamp && this.lastValue == value) {
                this.props.onQueryChange(value);
            }
        }, 750);
    }

}

SearchBox.propTypes = {
    query: PropTypes.string,
    onQueryChange: PropTypes.func.isRequired
};