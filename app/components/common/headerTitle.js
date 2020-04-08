import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { responsiveWidth, responsiveHeight, responsiveFontSize, responsiveFontSizeX } from './ResponsiveScreen';



class HeaderTitle extends Component {
  render() {
    return (
      <View>
        <Text style={{  textAlign: 'center', fontSize: responsiveFontSizeX(2.7), color: 'white' }}>{this.props.title}</Text>
      </View>
    );
  }
}


export default HeaderTitle