import React, { Component } from 'react';
import { View, Image } from 'react-native';

class ImageClass extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (

            <Image
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    resizeMode: this.props.resizeMode
                }}
                source={this.props.logo}>

            </Image>

        );
    }
}

export default ImageClass;