import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import ButtonComponent from '../common/Button'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Colors from '../../utils/Colors'
import * as  Constant from '../../utils/constants'
import { responsiveFontSizeX,responsiveFontSize,responsiveHeight, responsiveWidth, responsiveScreenWidth } from '../common/ResponsiveScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActivityLoader from '../common/activityIndicator'
import * as  Common from '../../utils/common'
import {
    setRegisterValues,
    registerUser,
    setRegisterEmpty,
    setRouterValues,
} from '../../redux/actions/index';
import HeaderButton from '../common/headerButton';
import HeaderTitle from '../common/headerTitle';
import RNGooglePlaces from 'react-native-google-places';
import Location from '../../utils/location'
var _ = require('lodash');

class Register extends Component {

    constructor(props) {
        super(props)
        // *** CLEAR REGISTER SCREEN TEXTINPUT VALUES ***//
        this.props.setRegisterEmpty()
    }

    // *** SET HEADER VIEW ***//
    static navigationOptions = ({ navigation }) => ({
        headerTintColor: 'white',
        headerTitle: <HeaderTitle title={"Sign Up"} />,
        headerStyle: {
            backgroundColor: 'black',
            borderBottomWidth: 0
        },
        headerLeft: (
            <HeaderButton isImage={true} image={Constant.Images.backImage} onPress={() => navigation.pop()} />
        ),
    })

    navigateToLogin() {
        this.props.navigation.navigate('Login')
    }

    // *** VALIDATE REGISTER SCREEN VALUES ***//
    validate() {
        let message = "";
        const reg = Constant.EMAILREG;
        const preg = Constant.PASSWORDREG;
        const mobilereg = Constant.MOBILEREG;

        if (this.props.register.fullName.trim() === "") {
            message = Constant.Messages.Name;
        }
        else if (this.props.register.email.trim() === "") {
            message = Constant.Messages.Email;
        } else if (!reg.test(this.props.register.email)) {
            message = Constant.Messages.ValidEmail;
        } else if (this.props.register.mobile.trim() === "") {
            message = Constant.Messages.Mobile;
        } else if (!mobilereg.test(this.props.register.mobile)) {
            message = Constant.Messages.InValidMobileNumber;
        } else if (this.props.register.address.trim() === "") {
            message = Constant.Messages.Address;
        } else if (this.props.register.city.trim() === "") {
            message = Constant.Messages.City;
        } else if (this.props.register.state.trim() === "") {
            message = Constant.Messages.State;
        } else if (this.props.register.zipcode.trim() === "") {
            message = Constant.Messages.Pincode;
        } else if (this.props.register.country.trim() === "") {
            message = Constant.Messages.Country;
        } else if (this.props.register.password.trim() === '') {
            message = Constant.Messages.Password;
        } else if (!preg.test(this.props.register.password)) {
            message = Constant.Messages.SpaceInPassword;
        } else if (this.props.register.password.length < 6) {
            message = Constant.Messages.PasswordLength
        } else if (this.props.register.confirm_password.trim() === "") {
            message = Constant.Messages.CPassword;
        } else if (this.props.register.confirm_password !== this.props.register.password) {
            message = Constant.Messages.PasswordNotMatch;
        }
        if (message === "") {
            return true;
        }
        Common.showAlertWithDefaultTitle(message);
        return false;
    }

    // *** CALL REGISTER API AND VALIDATE ***//
    onSignUpPress = () => {
        if (this.validate()) {
            this.props.registerNewUser({
                full_name: this.props.register.fullName,
                email: this.props.register.email,
                password: this.props.register.password,
                address: this.props.register.address,
                city: this.props.register.city,
                state: this.props.register.state,
                country: this.props.register.country,
                pincode: this.props.register.zipcode,
                mobile: this.props.register.mobile,
            });
        }
    }

    // *** GET REGISTER API RESPONSE ROM SERVER ***//
    getRegisterResponse(response) {
        if (response.isLoading === false && response.error === false && !_.isEmpty(response.registerResponse)) {
            AsyncStorage.setItem('user_id', JSON.stringify(response.registerResponse.id))
            AsyncStorage.setItem('userInfo', JSON.stringify(response.registerResponse))
            this.props.setRouterValues("isUserLogin", true)
            Common.showAlertWithDefaultTitle(response.message)
        }
        else if (response.errorMsg !== "") {
            Common.showAlertWithDefaultTitle(response.errorMsg);
        }
    }
    // *** GET CURRENT ADDRESS ***// 
    getAddressFromGoogle() {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                Location.getAddressToLatLong(place.placeID, (res, flag) => {
                    console.log("Locatiom Response=>", res)
                    if (flag) {

                        this.props.setRegisterValues('isLoading', false);
                        this.props.setRegisterValues('address', res.formattedAddress);
                        this.props.setRegisterValues('city', res.locality)
                        this.props.setRegisterValues('state', res.adminArea)
                        this.props.setRegisterValues('zipcode', res.postalCode)
                        this.props.setRegisterValues('country', res.country)

                    }
                });
            })
            .catch(error =>
                console.log(error.message)
            );
    }

    render() {
        this.getRegisterResponse(this.props.register)
        return (

            <ScrollView style={{ backgroundColor: Colors.black }} >
                <View style={{ backgroundColor: Colors.black }}>

                    <View style={styles.container}>
                        <Text style={styles.textInputHeader}>Full Name</Text>

                        <TextInput
                            style={styles.textInputValue}
                            value={this.props.register.fullName}
                            onChangeText={(text) => this.props.setRegisterValues('fullName', text)}
                            placeholderTextColor={Colors.gray}
                            placeholder="Enter Your Name"
                            onSubmitEditing={(event) => {
                                this.refs.phone.focus();
                            }} />
                        <View style={styles.divider_line}></View>


                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.textInputHeader}>Phone</Text>
                            <TextInput
                                ref="phone"
                                style={styles.textInputValue}
                                value={this.props.register.mobile}
                                onChangeText={(text) => this.props.setRegisterValues('mobile', text)}
                                placeholderTextColor={Colors.gray}
                                keyboardType={'numeric'}
                                placeholder="Enter Your Mobile Number"
                                onSubmitEditing={(event) => {
                                    this.refs.email.focus();
                                }}
                            />
                            <View style={styles.divider_line}></View>
                        </View>

                        <View style={styles.marginTop15}>
                            <Text style={styles.textInputHeader}>Email</Text>
                            <TextInput
                                ref="email"
                                style={styles.textInputValue}
                                value={this.props.register.email}
                                onChangeText={(text) => this.props.setRegisterValues('email', text)}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                placeholderTextColor={Colors.gray}
                                placeholder="Enter Your Email"
                                onSubmitEditing={(event) => {
                                    this.refs.address.focus();
                                }} />
                            <View style={styles.divider_line}></View>
                        </View>

                        <View style={styles.marginTop15}>
                            <Text style={styles.textInputHeader}>Address</Text>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => this.getAddressFromGoogle()}>
                                <View style={{ flexDirection: 'row', flex: 1 }}>

                                    <View style={{ flex: 0.9 }}>
                                        <TextInput
                                            ref="address"
                                            editable={false}
                                            style={styles.textinput_style}
                                            value={this.props.register.address}
                                            onChangeText={(text) => this.props.setRegisterValues('address', text)}
                                            autoCapitalize='none'
                                            placeholderTextColor={Colors.gray}
                                            placeholder="Enter Your Address"
                                            onSubmitEditing={(event) => {
                                                this.refs.city.focus();
                                            }} />
                                    </View>
                                    <View style={{ flex: 0.1, alignContent: 'center' }}>
                                        <MaterialIcons name='location-on' style={{ color: Colors.gray, fontSize: 24 }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.divider_line}></View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.textInputHeader}>City</Text>
                            <TextInput
                                ref="city"
                                style={styles.textInputValue}
                                value={this.props.register.city}
                                onChangeText={(text) => this.props.setRegisterValues('city', text)}
                                autoCapitalize='none'
                                placeholderTextColor={Colors.gray}
                                placeholder="City"
                                onSubmitEditing={(event) => {
                                    this.refs.state.focus();
                                }} />
                            <View style={styles.divider_line}></View>
                        </View>


                        <View style={{ flexDirection: 'row', flex: 1, marginTop: 15 }}>

                            <View style={{ flex: 0.5, marginRight: 3 }}>
                                <Text style={styles.textInputHeader}>State</Text>
                                <TextInput
                                    ref="state"
                                    style={styles.textInputValue}
                                    value={this.props.register.state}
                                    onChangeText={(text) => this.props.setRegisterValues('state', text)}
                                    autoCapitalize='none'
                                    placeholderTextColor={Colors.gray}
                                    placeholder="State"
                                    onSubmitEditing={(event) => {
                                        this.refs.zipcode.focus();
                                    }} />
                                <View style={styles.divider_line}></View>
                            </View>

                            <View style={{ flex: 0.5, marginLeft: 3 }}>
                                <Text style={styles.textInputHeader}>Postal Code</Text>
                                <TextInput
                                    ref="zipcode"
                                    style={styles.textInputValue}
                                    value={this.props.register.zipcode}
                                    onChangeText={(text) => this.props.setRegisterValues('zipcode', text)}
                                    autoCapitalize='none'
                                    placeholderTextColor={Colors.gray}
                                    placeholder="Postal Code"
                                    onSubmitEditing={(event) => {
                                        this.refs.country.focus();
                                    }} />
                                <View style={styles.divider_line}></View>
                            </View>

                        </View>


                        <View style={styles.marginTop15}>
                            <Text style={styles.textInputHeader}>Country</Text>
                            <TextInput
                                ref="country"
                                style={styles.textInputValue}
                                value={this.props.register.country}
                                onChangeText={(text) => this.props.setRegisterValues('country', text)}
                                autoCapitalize='none'
                                placeholderTextColor={Colors.gray}
                                placeholder="Country"
                                onSubmitEditing={(event) => {
                                    this.refs.password.focus();
                                }} />
                            <View style={styles.divider_line}></View>
                        </View>

                        <View style={styles.marginTop15}>
                            <Text style={styles.textInputHeader}>Password</Text>
                            <TextInput
                                ref="password"
                                style={styles.textInputValue}
                                value={this.props.register.password}
                                onChangeText={(text) => this.props.setRegisterValues('password', text)}
                                placeholderTextColor={Colors.gray}
                                placeholder="********"
                                secureTextEntry={true}
                                placeholder="Password"
                                onSubmitEditing={(event) => {
                                    this.refs.confirm_password.focus();
                                }} />
                            <View style={styles.divider_line}></View>
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.textInputHeader}>Confirm Password</Text>
                            <TextInput
                                ref="confirm_password"
                                style={styles.textInputValue}
                                value={this.props.register.confirm_password}
                                onChangeText={(text) => this.props.setRegisterValues('confirm_password', text)}
                                placeholderTextColor={Colors.gray}
                                secureTextEntry={true}
                                placeholder="********"
                                returnKeyType='done'
                                placeholder="Confirm Password"
                            />
                            <View style={styles.divider_line}></View>
                        </View>

                        <ButtonComponent title="Create Account" color={Colors.white}
                            backgroundColor={Colors.darkPrimaryColor}
                            fontSize={responsiveFontSize(2.5)}
                            borderRadius={30}
                            marginTop={30}
                            padding={5}
                            onPress={this.onSignUpPress}
                        />

                        <View style={styles.bottomView}>
                            <Text style={styles.haveAccountText}>HAVE AN ACCOUNT?</Text>
                            <Text style={styles.signUpText} onPress={() => this.navigateToLogin()}>Login</Text>
                        </View>
                    </View>

                    <ActivityLoader
                        isLoading={this.props.register.isLoading}>
                    </ActivityLoader>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.black,
        padding: 20
    },
    textInputValue: {
        color: Colors.white,
        padding: 5,
    },
    textInputHeader: {
        color: Colors.white,
        padding: 5,
        fontSize: responsiveFontSize(2.5),
    },
    haveAccountText: {
        color: Colors.white,
        alignSelf: 'center',
        padding: 3,
        textAlign: 'center',
    },
    signUpText: {
        color: Colors.darkPrimaryColor,
        alignSelf: 'center',
        padding: 3,
        fontSize:responsiveFontSize(2),
        fontWeight:'600',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    divider_line: {
        borderWidth: 0.5,
        borderRadius: 1,
        marginBottom: 10,
        marginTop: 10,
        borderColor: Colors.white
    },
    bottomView: {
        flex: 1,
        marginTop: 10
    },
    marginTop15:{
        marginTop:15
    }

})
 // *** MAP STATE FROM REDUCER ***//
function mapStateToProps(state) {
    return {
        register: state.register,
    }
}

// *** DISPATCH ACTION FUNCTION ***//
function mapDispatchToPropes(dispatch) {
    return {
        setRegisterValues: (key, val) => dispatch(setRegisterValues(key, val)),
        registerNewUser: (data) => dispatch(registerUser(data)),
        setRegisterEmpty: () => dispatch(setRegisterEmpty()),
        setRouterValues: (key, val) => dispatch(setRouterValues(key, val)),
    }
}

export default connect(mapStateToProps, mapDispatchToPropes)(Register)
