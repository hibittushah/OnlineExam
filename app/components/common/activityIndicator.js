import React, { Component } from 'react';
import { View, Text,ActivityIndicator} from 'react-native';
import Colors from '../../utils/Colors'
import Spinner from 'react-native-loading-spinner-overlay';
import { RNProgressHUD } from "react-native-simplest-hud";
class ActivityLoader extends Component {
  render() {
    return (
      
         <RNProgressHUD
                    isVisible={this.props.isLoading}
                    color={Colors.darkPrimaryColor}
                    label="Loading"
                    isActivityIndicator
                />
        //  <ActivityIndicator
        //   size="large"
        //   animating={this.props.isLoading}
        //   color={Colors.darkPrimaryColor}>
        // </ActivityIndicator> 
        // <Spinner
        //   visible={this.props.isLoading}
        //   textContent={'Loading...'}
        //   textStyle={{ color: '#FFF'}}
        // /> 
     
    );
  }
}


export default ActivityLoader