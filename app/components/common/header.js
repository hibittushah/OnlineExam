import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import { TextField } from 'react-native-material-textfield';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import * as Common from './index';

class HeaderView extends Component {
    render() {
      return (
        <View style={{flex: 1, justifyContent:'center', alignItem:'center'}}>  
                 <Text style={{ color:'black', alignSelf: "center",fontSize:16}}>{this.props.title}</Text>
        </View>
      );
    }
  }


  export default HeaderView