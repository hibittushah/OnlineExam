import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
// import { TextField } from 'react-native-material-textfield';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';


class HeaderButton extends Component {
  
    render() {
   
       return (
        <TouchableOpacity
        style={{ flex: 0, marginRight: 10, marginLeft: 10, width: responsiveWidth(10), height: responsiveWidth(10), justifyContent: 'center', }}
        onPress={this.props.onPress}>
        <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center', }}>
            {this.props.isImage === true ?
                <Image style={{ flex: 1, alignSelf: 'center', width: responsiveWidth(8), height: responsiveWidth(8) }} resizeMode={'contain'} source={this.props.image} />
                :
                <Text style={{  flex: 0, alignSelf: "center", fontSize: responsiveFontSizeX(2.4), color: 'white' }}>{this.props.title}</Text>
            }

        </View>
    </TouchableOpacity>
        )
    }
}


export default HeaderButton