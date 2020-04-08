import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import { responsiveFontSizeX,responsiveFontSize,responsiveHeight, responsiveWidth, responsiveScreenWidth } from '../common/ResponsiveScreen';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonComponent from '../common/Button'
import { connect } from 'react-redux';
import Colors from '../../utils/Colors'
import * as  Constant from '../../utils/constants'
import * as  Common from '../../utils/common'
import HeaderTitle from '../common/headerTitle';
import ActivityLoader from '../common/activityIndicator'
import {
  setLoginValues,
  setLoginEmpty,
  setRouterValues,
  fetchUserLogin,
  setForgotPasswordValue,
  setForgotPasswordEmpty,
  fetchForgotPassword,
  setSideMenuValues
} from '../../redux/actions/index';
var _ = require('lodash');
class Login extends Component {

  static navigationOptions = ({ navigation }) => ({

    headerTintColor: Colors.white,
    
    headerTitle: <HeaderTitle title={"Sign Up"} />,
    
    headerStyle: {
      backgroundColor: Colors.black,
      borderBottomWidth: 0,
    
    },
    
  })

  constructor(props) {
    super(props)
    this.state = {
      showPassword: true,
      icEye: 'visibility-off',
      email_check: false
    }
  }

  // *** UPDATE EMAIL VALUES WHEN TYPE WITH CHECK ICON ***//
  updateEmail = (text) => {
    const reg = Constant.EMAILREG;
    if (reg.test(text)) {
      this.setState({ email_check: true })
    }
    else {
      this.setState({ email_check: false })
    }
    this.props.setLoginValue('email', text)
  }

  // *** CLICK PASSWORD VALUE WITH SHOW AND HIDE FUNCTIONALITY ***//
  updatePassword = (text) => {
    let newState = {
      icEye: this.state.icEye,
      showPassword: this.state.showPassword,
    }
    this.setState(newState);
    this.props.setLoginValue('password', text)
  }

  navigateToRegister() {
    this.props.navigation.navigate('Register')
  }

  validateLogin() {
    let message = "";
    const reg = Constant.EMAILREG;
    const preg = Constant.PASSWORDREG;
    if (this.props.login.email.trim() === "") {
      message = Constant.Messages.Email;
    } else if (!reg.test(this.props.login.email)) {
      message = Constant.Messages.ValidEmail;
    } else if (this.props.login.password.trim() === "") {
      message = Constant.Messages.Password;
    } else if (!preg.test(this.props.login.password)) {
      message = Constant.Messages.SpaceInPassword;
    }
    if (message === "") {
      return true;
    }
    Common.showAlertWithDefaultTitle(message);
    return false;
  }

  onLoginPress() {
    if (this.validateLogin()) {
      this.props.userLoginAction({
        email: this.props.login.email,
        password: this.props.login.password,
      })
    }
  }

  // *** CLICK ACTION ON SEND BUTTON FROM FORGOT PASSWORD MODAL ***//
  onForgotPress() {
    if (this.props.forgotPassword.forgotEmail.trim() == "") {
      Common.showAlertWithDefaultTitle(Constant.Messages.Email);
    }
    else if (!Constant.EMAILREG.test(this.props.forgotPassword.forgotEmail)) {
      Common.showAlertWithDefaultTitle(Constant.Messages.ValidEmail);
    } else {
      this.props.setLoginValue('showForgotPassword', false)
    }
  }

  // *** OPEN FORGOT PASSWORD MODAL ***//
  showForgotModal() {
    this.props.setForgotPasswordEmpty()
    this.props.setLoginValue('showForgotPassword', true)
    this.props.navigation.navigate('ForgotPassword')
  }

  navigateToForgotPassword() {
    this.props.setForgotPasswordEmpty()
    this.props.navigation.navigate('ForgotPassword')
  }

  // *** LOGIN RESPONSE FROM SERVER ***//
  getLoginResponse(response) {
   
    if (response.isLoading === false && response.error === false && !_.isEmpty(response.user)) {
      AsyncStorage.setItem('user_id', JSON.stringify(response.user.id))
      AsyncStorage.setItem('userInfo', JSON.stringify(response.user))
      this.props.setSideMenuValues('email', response.user.email)
      this.props.setSideMenuValues('name', response.user.full_name)
      this.props.setRouterValues("isUserLogin", true)
      Common.showAlertWithDefaultTitle(response.message)
    }
    else if (response.errorMsg !== "") {
      Common.showAlertWithDefaultTitle(response.errorMsg);
    }
  }

  // *** SET PASSWORD SHOW AND HIDE FUNCTIONALITY ***//
  changePwdType = () => {
    let newState;
    if (this.state.showPassword) {
      newState = {
        icEye: 'visibility',
        showPassword: false,
      }
    } else {
      newState = {
        icEye: 'visibility-off',
        showPassword: true,
      }
    }
    this.setState(newState)
  };



  renderLoginContent() {
    return (
      <View>
        <Text style={styles.textInputHeader}>Email</Text>
        <View style={styles.textInputView}>
          <TextInput style={styles.textInputValue}
            value={this.props.login.email}
            onChangeText={this.updateEmail}
            placeholderTextColor={Colors.gray}
            keyboardType='email-address'
            autoCapitalize='none'
            placeholdertext="Enter Your Email"
            onSubmitEditing={(event) => {
              this.refs.password.focus();
            }} />
          {this.state.email_check ?
            <IoniconsIcon name='md-checkmark' style={styles.icon_style} /> : null}
        </View>
        <View style={styles.divider_line}></View>
        <View style={styles.marginTop20}>
          <Text style={styles.textInputHeader}>Password</Text>
          <View style={styles.textInputView}>
            <TextInput style={styles.textInputValue}
              ref='password'
              value={this.props.login.password}
              onChangeText={this.updatePassword}
              returnKeyType='done'
              secureTextEntry={this.state.showPassword}
              placeholderTextColor={Colors.gray}
              placeholdertext="*******" />

            <MaterialIcons style={styles.icon_style} style={styles.icon_style} name={this.state.icEye} size={16} onPress={this.changePwdType} />

          </View>
          <View style={styles.divider_line}></View>
        </View>

        <ButtonComponent title="Login" color={Colors.white}
          backgroundColor={Colors.darkPrimaryColor}
          fontSize={16}
          borderRadius={30}
          marginTop={30}
          padding={5}
          onPress={() => this.onLoginPress()}
        />
      </View>
    )
  }

  renderBottomView() {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.7}
          onPress={() => this.navigateToForgotPassword()}
        >
          <Text style={styles.fogotText}>Forgot Your Password? </Text>
        </TouchableOpacity>
        <View style={styles.bottom_view}>
          <Text style={styles.dontAccText}>DON'T HAVE AN ACCOUNT?</Text>
          <Text onPress={() => this.navigateToRegister()} style={styles.signUpText}>Register Now</Text>
        </View>
      </View>
    )
  }

  renderForgotPasswordModal() {
    return (
      <Modal
        isVisible={this.props.login.showForgotPassword}
        animationType="fade"
        transparent={true}
        coverScreen={true}
        contentContainerStyle={{ justifyContent: 'center', }}
        onRequestClose={() => {
          console.log("Modal has been closed.");
          this.setState({ open_forgot_mail: false })
        }}
      >
        <View style={styles.forgotModalContainer}>
          <Text style={styles.forgotHeaderText}>Forgot Password</Text>
          <Text style={styles.emailTextValue}>Enter your email</Text>
          <View style={styles.textInputBox}>

            <TextInput
              autoCapitalize="none"
              style={styles.forgotTextInputValue}
              placeholderTextColor={Colors.black}
              placeholder=""
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              onChangeText={text => this.props.setForgotPasswordValue(text)}
              value={this.props.forgotPassword.forgotEmail}>
            </TextInput>

          </View>
          <View
            style={[styles.bottomButton,styles.marginTop20]}  >
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.onForgotPress()}  >
              <View style={styles.buttonShape} >
                <Text style={styles.buttonText}>Send</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.setLoginValue('showForgotPassword', false)}
            >
              <View style={[styles.buttonShape, { backgroundColor: "#bfbfbf", marginLeft: 7 }]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
  render() {
    this.getLoginResponse(this.props.login)
    return (
      <View style={styles.container}>
        
        <View style={{ margin: 40 }}>
          {this.renderLoginContent()}
          {this.renderBottomView()}
        </View>

        <ActivityLoader
          isLoading={this.props.login.isLoading}>
        </ActivityLoader>

        {this.renderForgotPasswordModal()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 20
  },
  textInputHeader: {
    color: Colors.white,
    fontSize: responsiveFontSizeX(2),
  },
  bottomButton: {
    justifyContent: "space-between",
    flexDirection: 'row'
  },
  email_text: {
    color: Colors.white,
    fontSize: responsiveFontSizeX(2),
},
  buttonShape: {
    height: 44,
    width: responsiveWidth(60),
    borderRadius: 22,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: responsiveFontSizeX(3),
    fontWeight: '500',
    color: '#fff',
  },
  text_search: {
    color: Colors.black,
    fontSize: 16,
    borderWidth: 1,
    padding: 3,
    flex: 1
  },
  textinput_style: {
    color: Colors.white,
    padding: 5,
    width: 250
  },

  fogotText: {
    color: Colors.darkPrimaryColor,
    marginTop: 20,
    alignSelf: 'center',
    padding: 3,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  dontAccText: {
    color: Colors.white,
    alignSelf: 'center',
    padding: 3,
    textAlign: 'center',
  },
  signUpText: {
    color: Colors.darkPrimaryColor,
    alignSelf: 'center',
    padding: 3,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '600'
  },
  divider_line: {
    borderWidth: 0.5,
    borderRadius: 1,
    marginBottom: 10,
    marginTop: 10,
    borderColor: Colors.white
  },
  bottom_view: {
    marginTop: 20
  },


  //RENDER LOGIN STYLE
  textInputView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  textInputValue: {
    color: Colors.white,
    padding: 5,
    width: responsiveWidth(60)
  },
  icon_style: {
    fontSize: 20,
    marginRight: 5,
    color: Colors.white,
    padding: 5,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  marginTop20: {
    marginTop: 20
  },
  forgotHeaderText: {
    color: Colors.darkPrimaryColor,
    fontSize: 22,
    textAlign: 'center'
  },

  //RENDER FORGOT PASSWORD MODAL STYLE
  forgotModalContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    padding: 10
  },
  emailTextValue: {
    color: Colors.black,
    marginTop: 10
  },
  textInputBox: {
    height: 40,
    marginTop: 10
  },
  forgotTextInputValue:{
    color: Colors.black,
    fontSize: 16,
    borderWidth: 1,
    padding: 3,
    flex: 1
  }
})
 // *** MAP STATE FROM REDUCER ***//
function mapStateToProps(state) {
  return {
    login: state.login,
    forgotPassword: state.forgotPassword
  }
}

// *** DISPATCH ACTION FUNCTION ***//
function mapDispatchToPropes(dispatch) {
  return {
    userLoginAction: (data) => dispatch(fetchUserLogin(data)),
    setLoginValue: (key, val) => dispatch(setLoginValues(key, val)),
    setLoginEmpty: () => dispatch(setLoginEmpty()),
    ForgotPasswordAction: (data) => dispatch(fetchForgotPassword(data)),
    setForgotPasswordValue: (key, val) => dispatch(setForgotPasswordValue(key, val)),
    setForgotPasswordEmpty: () => dispatch(setForgotPasswordEmpty()),
    setRouterValues: (key, val) => dispatch(setRouterValues(key, val)),
    setSideMenuValues: (key, val) => dispatch(setSideMenuValues(key, val)),
  }
}

export default connect(mapStateToProps, mapDispatchToPropes)(Login)


