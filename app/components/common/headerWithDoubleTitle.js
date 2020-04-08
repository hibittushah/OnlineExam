import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import { TextField } from 'react-native-material-textfield';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import * as Common from './index';

class HeaderWithDoubleTitle extends Component {
    render() {
      return (
        <View  style={{flex: 0, justifyContent:'center', alignItem:'center'}}>  
         <Text style={{   flex: 0, alignSelf: "center", fontSize: Common.isIphoneX() ? responsiveFontSize(2.4) : responsiveFontSize(2.7), color: 'white' }}>{this.props.title}</Text>
         <Text  numberOfLines={1} style={{  marginTop: -10,  flex: 0, alignSelf: "center", fontSize: Common.isIphoneX() ? responsiveFontSize(2.0) : responsiveFontSize(2.3), color: 'white' }}>{this.props.subTitle}</Text>
        </View>
      );
    }
  }
  export default HeaderWithDoubleTitle