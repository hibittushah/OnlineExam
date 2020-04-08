import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
// import { TextField } from 'react-native-material-textfield';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import * as Constant from '../../utils/constants';
import * as Common from './index';

class HeaderTextButton extends Component {

//   renderImage() {
//       if (this.props.assetDetail === undefined){
//           return null
//       }else if (this.props.assetDetail.props.assetDetail.isLoading === true ){
//           return Constant.Images.add
//       }else {
//         return Constant.Images.edit
//       }
//   }
  
    render() {
       
        return (
            <TouchableOpacity
                style={{ flex: 0, marginRight: 10, marginLeft: 10, justifyContent: 'center',  }}
                onPress={this.props.onPress}>
                <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}>                   
                        <Text style={{  flex: 0, alignSelf: "center", fontSize: Common.isIphoneX() ? responsiveFontSize(2.4) : responsiveFontSize(2.7), color: 'white' }}>{this.props.title}</Text>                   
                </View>
            </TouchableOpacity>
        );
    }
}


export default HeaderTextButton