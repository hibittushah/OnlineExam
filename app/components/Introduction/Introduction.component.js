import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
  } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Constants from '../../utils/constants';
import styles from './Introduction.component.style';

class Introduction extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showRealApp: false,
            slides:[
                {
                  key: 'somethun',
                  title: 'Title 1',
                  text: 'Description.\nSay something cool',
                  image: Constants.Images.introduction1,
                  backgroundColor: '#59b2ab',
                },
                {
                  key: 'somethun-dos',
                  title: 'Title 2',
                  text: 'Other cool stuff',
                  image: Constants.Images.introduction2,
                  backgroundColor: '#febe29',
                },
                {
                  key: 'somethun1',
                  title: 'Rocket guy',
                  text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
                  image: Constants.Images.introduction3,
                  backgroundColor: '#22bcb5',
                }
               
              ]
          }
    }
    
      _renderItem = (item) => {
      console.log(item)
        return (
          <View style={styles.mainContent}>
            {/* <Text style={styles.title}>{item.item.title}</Text> */}
            <Image style={styles.image} resizeMode={'cover'} source={item.item.image} />
            {/* <Text style={styles.text}>{item.item.text}</Text> */}
          </View>
        );
      }
      _onDone = () => {
       this.props.navigation.navigate('Login')
      }
      render() {
       
          return ( 
          <AppIntroSlider 
            showSkipButton={true}
            renderItem={this._renderItem} 
            slides={this.state.slides} 
            onDone={this._onDone}
            onSkip={()=>this.props.navigation.navigate('Login')}
            />
          )
       
      }
}


export default Introduction;