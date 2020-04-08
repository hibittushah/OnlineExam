import React, { Component } from 'react';
import { View, Button, TouchableOpacity,Text } from 'react-native';


class ButtonClass extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (
            <TouchableOpacity style={{
                width: this.props.width,
                height: this.props.height,
                backgroundColor: this.props.backgroundColor,
                padding: this.props.padding,
                marginTop:this.props.marginTop,
                borderRadius:this.props.borderRadius,
                borderColor:this.props.borderColor,
                borderWidth:this.props.borderWidth,
                activeOpacity:this.props.opacity,
                alignSelf:this.props.alignSelf   
            }}
            onPress={this.props.onPress}>
                <Text style={{color:this.props.color,textAlign:'center',padding:10,fontSize:this.props.fontSize}}>{this.props.title}</Text>
              
            </TouchableOpacity>

        );
    }
}

export default ButtonClass;