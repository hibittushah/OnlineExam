import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

class TextinputClass extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (

            <TextInput
                style={{
                    borderBottomWidth: this.props.borderBottomWidth,
                    width: this.props.width,
                    padding: this.props.padding,
                    fontSize: this.props.fontSize,
                    color:this.props.color,
                    fontWeight: this.props.fontWeight,
                    fontFamily: this.props.fontFamily,
                    marginTop: this.props.marginTop,
                    
                }}
                secureTextEntry={this.props.secureTextEntry?true:false}
                keyboardType={this.props.keyboardType?this.props.keyboardType:'default'}
                placeholderTextColor={this.props.placeholderTextColor}
                placeholder={this.props.placeholdertext}
                onChangeText={this.props.onChangeText}
                returnKeyType={this.props.returnKeyType?this.props.returnKeyType:''}
                value={this.props.value}>
            </TextInput>

        );
    }
}

export default TextinputClass;