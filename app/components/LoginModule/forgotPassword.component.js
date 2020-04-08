import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import ButtonComponent from '../common/Button'
import { connect } from 'react-redux';
import Colors from '../../utils/Colors';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import * as  Constant from '../../utils/constants';
import * as  Common from '../../utils/common';
import ActivityLoader from '../common/activityIndicator';
var _ = require('lodash');
import {
    setForgotPasswordValue,
    setForgotPasswordEmpty,
    fetchForgotPassword
} from '../../redux/actions/index';

class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static navigationOptions = {
        header: null,
    };

    validateForgotPassword() {
        let message = "";
        if (this.props.forgotPassword.forgotEmail.trim() == "") {
            message = Constant.Messages.Email;
        }
        else if (!Constant.EMAILREG.test(this.props.forgotPassword.forgotEmail)) {
            message = Constant.Messages.ValidEmail;
        }
        if (message === "") {
            return true;
        }
        Common.showAlertWithDefaultTitle(message);
        return false;
    }

    // *** CALL FORGOT PASSWORD API ***//
    onForgotPasswordPress = () => {
        if (this.validateForgotPassword()) {
            this.props.fetchForgotPassword({ email: this.props.forgotPassword.forgotEmail });
        }
    }
    // *** GET FORGOT PASSWORD API RESPONSE ***//
    getForgotPasswordResponse(response) {
        if (response.isLoading === false && response.error === false && !_.isEmpty(response.forgotResponse)) {
            const actions = [
                {
                    text: 'Ok',
                    onPress: () => {
                        this.props.navigation.navigate('Login')
                    }
                }
            ];
            Common.showAlertwithAction(Constant.PROJECTNAME, response.forgotResponse.message, actions);
        }
        else if (response.errorMsg !== "") {
            Common.showAlertWithDefaultTitle(response.errorMsg);
        }
    }


    render() {

        this.getForgotPasswordResponse(this.props.forgotPassword)

        return (
            <View style={styles.container}>
                <IoniconsIcon name='md-arrow-round-back' style={styles.backIcon}
                    onPress={() => this.props.navigation.goBack()} />
                <View style={styles.forgotView}>
                    <View >
                        <Text style={styles.forgotText}>Forgot Password</Text>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.emailText}>Enter your email</Text>
                        <View style={styles.textInputView}>
                            <TextInput
                                autoCapitalize="none"
                                style={styles.textInputValue}
                                placeholderTextColor={Colors.white}
                                placeholder=""
                                keyboardType='email-address'
                                underlineColorAndroid='transparent'
                                onChangeText={text => this.props.setForgotPasswordValue(text)}
                                value={this.props.forgotPassword.forgotEmail}>
                            </TextInput>
                        </View>

                        <ButtonComponent title="Submit" color={Colors.white}
                            backgroundColor={Colors.darkPrimaryColor}
                            fontSize={16}
                            borderRadius={30}
                            marginTop={30}
                            padding={5}
                            onPress={this.onForgotPasswordPress}
                        />
                    </View>

                    <ActivityLoader
                        isLoading={this.props.forgotPassword.isLoading}>
                    </ActivityLoader>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black
    },
    forgotView: {
        marginTop: 50,
        padding: 30
    },
    backIcon: {
        color: Colors.white,
        fontSize: 30,
        marginTop: 44,
        marginLeft: 10
    },
    forgotText: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: 'bold'
    },
    emailText: {
        color: Colors.white,
        fontSize: 16,
        color: Colors.white,
        marginTop: 10
    },
    textInputValue: {
        color: Colors.white,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.white,
        padding: 3,
        flex: 1
    },
    textInputView: {
        height: 40,
        marginTop: 10
    }
})

function mapStateToProps(state) {
    return {
        forgotPassword: state.forgotPassword,
    }
}
function mapDispatchToPropes(dispatch) {
    return {
        setForgotPasswordValue: (key, val) => dispatch(setForgotPasswordValue(key, val)),
        fetchForgotPassword: (data) => dispatch(fetchForgotPassword(data)),
        setForgotPasswordEmpty: () => dispatch(setForgotPasswordEmpty()),
    }
}

export default connect(mapStateToProps, mapDispatchToPropes)(ForgotPassword)
