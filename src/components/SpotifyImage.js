import  React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import placeholder from 'assets/placeholder.png';

import './SpotifyImage.scss';

/**
    Component for displaying images listed by Spotify API.

    Automatically chooses the most appropriately sized
    image available.
*/
export default class SpotifyImage extends Component {

    constructor(props) {
        super(props);
        this.state = { src: null };
    }

    componentDidMount() {
        this.setState({ src: this.resolveSrc() });
    }

    componentWillReceiveProps() {
        this.setState({ src: this.resolveSrc() });
    }

    render() {
        let { circular, bordered, style } = this.props;
        const classes = classNames(
            'spotify-image',
            { 'spotify-image-circular': circular },
            { 'spotify-image-bordered': bordered },
            'lazyload'
        );
        return (
            <img className={classes} style={style} data-src={this.state.src} />
        );
    }

    resolveSrc() {
        const images = this.props.images;

        if (!images || images.length == 0) {
            return placeholder;
        }

        const { offsetHeight, offsetWidth } = ReactDOM.findDOMNode(this);

        let match = 0;
        /*
            Images returned from Spotify API are sorted from the largest to the smallest one.
            Iterate backwards to get smallest possible image that matches the criteria.
        */
        for (let i = images.length - 1; i > 0; i--) {
            if (images[i].height > offsetHeight && images[i].width > offsetWidth) {
                match = i;
                break;
            }
        }
        return images[match].url;
    }
}

SpotifyImage.propTypes = {
    images: PropTypes.array.isRequired,
    circular: PropTypes.bool,
    bordered: PropTypes.bool,
    style: PropTypes.object
};

SpotifyImage.defaultProps = {
    circular: false,
    bordered: true
};