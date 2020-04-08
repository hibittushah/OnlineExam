import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TextInput,Alert,alert, ScrollView, Keyboard, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import HeaderTitle from '../common/headerTitle';
import * as Constants from '../../utils/constants';
import Colors from '../../utils/Colors';
import { responsiveFontSizeX, responsiveWidth, responsiveScreenWidth } from '../common/ResponsiveScreen';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import * as  Common from '../../utils/common'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderIcon from '../common/headerIcon';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from "react-native-modal";
import ActivityLoader from '../common/activityIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    setChangePasswordValues,
    setChangePasswordEmpty,
    fetchChangePasswordApi,
    setLoginEmpty,
    setSideMenuValues,
    setForgotPasswordEmpty,
    setRegisterEmpty,
    setRouterValues,
    setProfileValues,
    updateUserProfile
} from '../../redux/actions/index';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
var _self;
var _ = require('lodash');

class Setting extends Component {


    static navigationOptions = ({ navigation }) => ({
        headerTintColor: 'white',
        headerTitle: <HeaderTitle title={"Setting"} />,
        headerStyle: {
            backgroundColor: Colors.darkPrimaryColor,
        },
        headerLeft: <HeaderIcon iconName='menu' onPress={() => navigation.openDrawer()} />,
        headerRight: <HeaderIcon iconName='logout' onPress={() => _self.logout()} />
    })

    constructor(props) {
        super(props)
        _self = this;
    }

    componentDidMount() {
        this.getUserDetail()
    }

    openImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.props.setProfileValues('profile_pic', source)
            }
        });
    }

    getUserDetail = async () => {
        try {
            const value = await AsyncStorage.getItem('userInfo')
            var obj = JSON.parse(value);
            console.log(value)
            if (obj != null) {
                this.props.setProfileValues('name', obj.full_name)
                this.props.setProfileValues('email', obj.email)
                this.props.setProfileValues('user_id', obj.id)
                //this.props.setProfileValues('profile_pic', obj.profile_photo)
                this.props.setProfileValues('phone', obj.mobile)
            }
        } catch (e) {
            console.log(e)

        }
    }

    showChangePasswod() {
        this.props.setChangePasswordEmpty()
        this.props.setChangePasswordValues('showChangePasswordModal', true)
    }

    validatePassword() {
        let message = "";
        const preg = Constants.PASSWORDREG;
        if (this.props.changePassword.old_password === "") {
            message = Constants.Messages.OldPassword;
        } else if (this.props.changePassword.password === "") {
            message = Constants.Messages.NewPassword;
        } else if (!preg.test(this.props.changePassword.password)) {
            message = Constants.Messages.SpaceInPassword;
        } else if (this.props.changePassword.password.length < 6) {
            message = Constants.Messages.PasswordLength
        } else if (this.props.changePassword.confirm_password === "") {
            message = Constants.Messages.CPassword;
        } else if (this.props.changePassword.confirm_password !== this.props.changePassword.password) {
            message = Constants.Messages.PasswordNotMatch;
        }
        if (message === "") {
            return true;
        }
        Common.showAlertWithDefaultTitle(message);
        return false;
    }

    validateProfile() {
        var msg = ""
        if (this.props.userProfile.name.trim() == "") {
            msg = Constants.Messages.Name
        } else if (this.props.userProfile.phone.trim() == "") {
            msg = Constants.Messages.Mobile
        }
        if (msg === "") {
            return true;
        }
        Common.showAlertWithDefaultTitle(msg);
        return false;
    }


    updateProfile() {
        if (this.validateProfile()) {

            // ** FORM DATA IS USED FOR IMAGE UPLOAD TO SWRVER **//  
            /* const body = new FormData();
               body.append('name', this.props.userProfile.name);
               body.append('email', this.props.userProfile.email);
               body.append('mobile', this.props.userProfile.phone);
               if (this.props.userProfile.updated_pic !== '') {
                   let photo = {
                       uri: this.props.userProfile.updated_pic, 
                       type: 'image/png', 
                       name: 'photo.png',
                     }
                   body.append('profile_photo_file', photo);
               }
           */

            this.props.updateUserProfile({
                email: this.props.userProfile.email,
                full_name: this.props.userProfile.name,
                mobile: this.props.userProfile.phone
            });
        }

    }

    onChangePassword() {
        if (this.validatePassword()) {
            this.props.fetchChangePasswordApi({
                password: this.props.changePassword.confirm_password,
                old_password: this.props.changePassword.password,
                user_id: this.props.userProfile.user_id
            });
        }
    }

    logout() {
        Alert.alert(
           Constants.PROJECTNAME,
            'Are you sure want to logout from the app?',
            [{
                text: 'Yes', onPress: () =>
                    this.logOut()
            }, {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },],
            { cancelable: false },
        );
    
    }
    logOut(){
        AsyncStorage.clear()
        this.props.setLoginEmpty();
        this.props.setForgotPasswordEmpty();
        this.props.setRegisterEmpty();
        this.props.setRouterValues('isUserLogin', false)
    }

    getChangePasswordResponse(response) {
        if (response.isLoading === false && response.error === false && response.isPasswordUpdated) {
            const actions = [
                {
                    text: 'Ok',
                    onPress: () => {
                        this.props.setChangePasswordValues('showChangePasswordModal', false)
                    }
                }
            ];
            Common.showAlertwithAction(Constants.PROJECTNAME, response.message, actions);
            this.props.setChangePasswordValues('isPasswordUpdated', false)

        }
    }

    getUpdateProfileResponse(response) {
        if (response.isLoading === false && response.error === false && response.isProfileUpdated) {
            Common.showAlertWithDefaultTitle(response.message);
            AsyncStorage.setItem('userInfo', response.profileResponse)
            this.props.setProfileValues('name', response.profileResponse.full_name)
            this.props.setProfileValues('email', response.profileResponse.email)
            this.props.setProfileValues('mobile', response.profileResponse.phone)
            this.props.setSideMenuValues('name', response.profileResponse.name)
            this.props.setSideMenuValues('email', response.profileResponse.email)
            this.props.setProfileValues('isProfileUpdated', false)
        }
        else if (response.errorMsg !== "") {
            Common.showAlertWithDefaultTitle(response.errorMsg);
        }
    }

    // *** RENDER IMAGE PROFILE VIEW ***//
    renderUserPhotoName() {
        return (
            <View style={styles.photoView}>
                <Image style={styles.imageView}
                    defaultSource={Constants.Images.defaultProfilePic}
                    source={this.props.userProfile.profile_pic}
                    resizeMode={'contain'}
                />
                <TouchableOpacity
                    onPress={() => this.openImagePicker()}>
                    <Ionicons size={25} name='ios-camera' style={{ position: 'absolute', bottom: -5, alignSelf: 'center' }} color={Colors.darkPrimaryColor} />
                </TouchableOpacity>
            </View>
        )
    }

    // *** RENDER SUNMIT BUTTON VIEW ***//
    renderSubmitView() {
        return (
            <TouchableWithoutFeedback style={{ flex: 0 }}
                onPress={() => this.updateProfile()}>
                <View style={styles.submitView}>
                    <Text style={styles.submitText}>SUBMIT</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    // *** RENDER CHANGE PASSWORD MODAL ***//
    renderChangepasswordModal() {
        return (
            <Modal isVisible={this.props.changePassword.showChangePasswordModal}
                animationType="fade"
                transparent={true}
                contentContainerStyle={{ justifyContent: 'center', }}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    this.props.setChangePasswordValues('showChangePasswordModal', false)
                }}
            >
                {/* <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}> */}
                <KeyboardAwareScrollView>
                    <View style={styles.changePasswordView}>
                       
                            <View style={styles.changePasswordView2}>


                                <Text style={styles.changePasswordHeader}>Change Password</Text>
                                <Text style={styles.textHeader}>Enter old password</Text>

                                <View style={styles.height40}>
                                    <TextInput
                                        style={styles.changePasswordInput}
                                        placeholderTextColor={Colors.black}
                                        placeholder=""
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={text => this.props.setChangePasswordValues('old_password', text)}
                                        value={this.props.changePassword.old_password}
                                        onSubmitEditing={(event) => {
                                            this.refs.password.focus();
                                        }}
                                    >
                                    </TextInput>
                                </View>

                                <Text style={styles.textHeader}>Enter New password</Text>
                                <View style={styles.height40}>
                                    <TextInput
                                        ref='password'
                                        style={styles.changePasswordInput}
                                        placeholderTextColor={Colors.black}
                                        placeholder=""
                                        secureTextEntry={true}
                                        underlineColorAndroid='transparent'
                                        onChangeText={text => this.props.setChangePasswordValues('password', text)}
                                        value={this.props.changePassword.password}
                                        onSubmitEditing={(event) => {
                                            this.refs.confirm_password.focus();
                                        }}>
                                    </TextInput>
                                </View>

                                <Text style={styles.textHeader}>Enter confirm password</Text>
                                <View style={styles.height40}>
                                    <TextInput
                                        ref='confirm_password'
                                        style={styles.changePasswordInput}
                                        placeholderTextColor={Colors.black}
                                        placeholder=""
                                        secureTextEntry={true}
                                        returnKeyType="done"
                                        underlineColorAndroid='transparent'
                                        onChangeText={text => this.props.setChangePasswordValues('confirm_password', text)}
                                        value={this.props.changePassword.confirm_password}
                                    >
                                    </TextInput>
                                </View>



                                <View
                                    style={styles.bottomButtonView}  >
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.onChangePassword()}  >
                                        <View style={styles.buttonShape}>
                                            <Text style={styles.buttonText}>Save</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.8}
                                        onPress={() => this.props.setChangePasswordValues('showChangePasswordModal', false)}
                                    >
                                        <View
                                            style={[styles.buttonShape, { backgroundColor: "#bfbfbf", marginLeft: 7 }]}>
                                            <Text style={styles.buttonText}>Cancel</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <ActivityLoader
                                    isLoading={this.props.changePassword.isLoading}>
                                </ActivityLoader>
                            </View>

                        
                    </View>
                </KeyboardAwareScrollView>
            </Modal>
        )
    }

    // *** RENDER CHANGE PASSWORD BUTTON VIEW ***//
    renderChangepasswordButton() {
        return (
            <TouchableWithoutFeedback onPress={() => this.showChangePasswod()}>
                <View style={styles.changePasswordButtonView}>

                    <View style={{ flex: 0.9 }}>
                        <Text style={{ fontSize: 18 }}>Change password</Text>
                    </View>
                    <View style={{ flex: 0.1, alignItems: 'flex-end' }}>
                        <Ionicons size={22} name='ios-arrow-forward' type='Ionicons' />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        this.getUpdateProfileResponse(this.props.userProfile)
        this.getChangePasswordResponse(this.props.changePassword)
        return (
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: Colors.white }} >

                    <SafeAreaView >
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={styles.margin50}>

                                {this.renderUserPhotoName()}

                                <View style={styles.marginBottom15}>
                                    <Text style={styles.textValue}>Email</Text>
                                    <TextInput
                                        ref='email'
                                        style={styles.textInputValue}
                                        editable={false}
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        keyboardType='email-address'
                                        value={this.props.userProfile.email}
                                        onChangeText={(value) => this.props.setProfileValues('email', value)}
                                        onSubmitEditing={() => this.refs.phone.focus()}
                                    />
                                    <View style={styles.dividerLine}
                                    />
                                </View>
                                <View style={styles.marginBottom15}>
                                    <Text style={styles.textValue}>Name</Text>
                                    <TextInput
                                        style={styles.textInputValue}
                                        autoCapitalize={'words'}
                                        placeholderTextColor={'black'}
                                        returnKeyType="next"
                                        keyboardType='default'
                                        value={this.props.userProfile.name}
                                        onChangeText={(value) => this.props.setProfileValues('name', value)}
                                        onSubmitEditing={() => this.refs.phone.focus()}
                                    />
                                    <View style={styles.dividerLine}
                                    />
                                </View>

                                <View style={styles.marginBottom15}>
                                    <Text style={styles.textValue}>Phone</Text>
                                    <TextInput
                                        ref='phone'
                                        style={styles.textInputValue}
                                        returnKeyType="done"
                                        autoCapitalize="none"
                                        keyboardType='phone-pad'
                                        value={this.props.userProfile.phone}
                                        onChangeText={(value) => this.props.setProfileValues('phone', value)}

                                    />
                                    <View style={styles.dividerLine}
                                    />

                                    {this.renderChangepasswordButton()}
                                    {this.renderSubmitView()}
                                    {this.renderChangepasswordModal()}
                                </View>


                            </View>

                        </TouchableWithoutFeedback>
                        <ActivityLoader
                            isLoading={this.props.userProfile.isLoading}>
                        </ActivityLoader>
                    </SafeAreaView>
                </View>
            </ScrollView>

        );
    }
}

function mapStateToProps(state) {
    return {
        userProfile: state.userProfile,
        changePassword: state.changePassword
    }
}
function mapDispatchToPropes(dispatch) {
    return {
        setLoginEmpty: () => dispatch(setLoginEmpty()),
        setRegisterEmpty: () => dispatch(setRegisterEmpty()),
        setForgotPasswordEmpty: () => dispatch(setForgotPasswordEmpty()),
        setRouterValues: (key, val) => dispatch(setRouterValues(key, val)),
        setProfileValues: (key, val) => dispatch(setProfileValues(key, val)),
        updateUserProfile: (data) => dispatch(updateUserProfile(data)),
        setChangePasswordValues: (key, val) => dispatch(setChangePasswordValues(key, val)),
        setSideMenuValues: (key, val) => dispatch(setSideMenuValues(key, val)),
        setChangePasswordEmpty: () => dispatch(setChangePasswordEmpty()),
        fetchChangePasswordApi: (data) => dispatch(fetchChangePasswordApi(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToPropes)(Setting)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveWidth(3),
        backgroundColor: 'black'
    },
    changePasswordButtonView: {
        flexDirection: 'row',
        marginTop: responsiveWidth(5)
    },
    margin50: {
        margin: responsiveWidth(15)
    },
    marginBottom15: {
        marginBottom: responsiveWidth(5)
    },
    textValue: {
        color: Colors.black,
        fontSize: responsiveFontSizeX(1.5),
    },
    textInputValue: {
        marginTop: 10,
        fontSize: responsiveFontSizeX(1.8),
        color: Colors.black,
    },
    dividerLine: {
        flex: 0,
        height: 1.0,
        backgroundColor: Colors.gray,
        marginTop: 5
    },
    // *** RENDER PHOTO VIEW STYLE***//
    photoView: {
        marginTop: responsiveWidth(5),
        marginBottom: responsiveWidth(5),
        alignItems: 'center'
    },
    imageView: {
        borderWidth: 2,
        borderColor: 'white',
        width: responsiveWidth(30),
        height: responsiveWidth(30),
        borderRadius: responsiveWidth(15),
    },
    // *** RENDER SUBMIT VIEW STYLE***//
    submitView: {
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: responsiveWidth(6),

        width: (responsiveScreenWidth(100) - 80),
        height: responsiveWidth(12),
        borderWidth: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        backgroundColor: Colors.darkPrimaryColor
    },
    submitText: {
        flex: 0,
        fontSize: responsiveFontSizeX(2.0),
        color: 'white'
    },
    // *** RENDER CHANGE PASSWORD MODAL STYLE***//
    changePasswordView: {
        flex: 1,
        justifyContent: 'center',
    },
    changePasswordView2: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        padding: responsiveWidth(3)
    },
    changePasswordHeader: {
        color: Colors.darkPrimaryColor,
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center'
    },
    changePasswordInput: {
        color: Colors.black,
        fontSize: responsiveFontSize(2),
        borderWidth: 1,
        padding: responsiveWidth(3),
        flex: 1
    },
    textHeader: {
        color: Colors.black,
        fontSize: responsiveFontSize(2),
        paddingBottom: 5,
        marginTop: responsiveWidth(5)
    },
    height40: {
        height: responsiveHeight(6)
    },
    bottomButtonView: {
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: responsiveWidth(4)
    },
    buttonShape: {
        height: responsiveHeight(5.5),
        padding:5,
        borderRadius: 22,
        backgroundColor: Colors.black,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(30),
    },
    buttonText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500',
        color: Colors.white,
    },

})