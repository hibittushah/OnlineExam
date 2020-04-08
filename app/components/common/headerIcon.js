import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HeaderIcon extends Component {
  
    render() {
       return (
        <TouchableOpacity onPress={() => this.props.onPress()}>
            {this.props.iconName=='logout'?
             <MaterialCommunityIcons name={this.props.iconName} size={30} style={{ color: Colors.white, padding: 5 }}></MaterialCommunityIcons>:
                <MaterialIcons name={this.props.iconName} size={30} style={{ color: Colors.white, padding: 5 }}></MaterialIcons>
       
             } 
                     </TouchableOpacity>
        )
    }
}

