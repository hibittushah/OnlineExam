import React, { Component } from 'react';
import { ScrollView, SafeAreaView, Text, ToastAndroid, FlatList, Button, TouchableOpacity, Linking, View, Image, TouchableWithoutFeedback, TextInput, Keyboard, Alert } from 'react-native';
import { responsiveWidth, responsiveFontSizeX, responsiveScreenWidth } from './ResponsiveScreen';
import { connect } from 'react-redux';
import { setSideMenuValues } from '../../redux/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class SideMenu extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
        gesturesEnabled: false,
    });

    constructor(props) {
        super(props);
        _self = this;
        this.state = {
            rating: 0,
            profilePic: '',
            Data: [
                {
                    name: 'Home',
                    icon_name: 'home-outline'
                },
                {
                    name: 'Setting',
                    icon_name: 'settings-outline'
                },
            ],
        };


    }

    componentDidMount() {
        this.getUserDetail()
        this.forceUpdate()
    }

     // *** GET USER DETAILS FROM ASYNCSTORAGE ***//
    getUserDetail = async () => {
        try {
            const value = await AsyncStorage.getItem('userInfo')
            var obj = JSON.parse(value);
            console.log(obj)
            if (obj != null) {
                this.props.setSideMenuValues('name', obj.full_name)
                this.props.setSideMenuValues('email', obj.email)
            }
        } catch (e) {
            console.log(e)

        }
    }

     // *** SET ACTION ON SIDE MENU ITEM PRESS***//
    onMenuPressed(index) {
        switch (index) {
            case 0: this.props.navigation.navigate("Dashboard");
                break;
            case 1: this.props.navigation.navigate("Setting");
                break;
            default:
                break;
        }
        this.props.navigation.closeDrawer()
    }

     // *** RENDER USER PHOTO VIEW ***//
    renderUserPhotoName() {
        return (
            <View style={{ alignItems: 'center' }}>
                <MaterialIcons name='account-circle' size={60} color={'white'} />
                <Text style={{
                    marginTop: 10,
                    color: 'white',
                    fontSize: responsiveFontSizeX(2.3),
                }}>{this.props.sideMenu.email}</Text>
                <Text style={{
                    marginTop: 0,
                    color: 'white',
                    fontSize: responsiveFontSizeX(2.1),
                }}>{this.props.sideMenu.email}</Text>
                <View style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    width: responsiveScreenWidth(80),
                    borderBottomColor: 'rgba(92, 92, 92, 0.9)',
                    borderBottomWidth: 1
                }} />
            </View>
        )
    }
     // *** RENDER MENU ITEM ***//
    renderMenuItem(rowData, index) {
        return (
            <TouchableOpacity style={{ flex: 0 }} onPress={() => this.onMenuPressed(index)}>
                <View style={{ flex: 0, }}>
                    <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name={rowData.icon_name} size={22} color={'white'} />
                        <Text style={{
                            flex: 1,
                            margin: 12,
                            marginLeft: 10,
                            lineHeight: responsiveFontSizeX(3.3),
                            fontSize: responsiveFontSizeX(1.9),
                            color: 'white'

                        }}>{rowData.name}</Text>
                    </View>
                    <View style={{
                        marginLeft: 10,
                        height: 1,
                        borderBottomColor: 'rgba(92, 92, 92, 0.9)',
                        borderBottomWidth: 1
                    }} />
                </View>
            </TouchableOpacity>
        )
    }



    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ flex: 1 }}>
                    {this.renderUserPhotoName()}
                    
                    <FlatList
                        automaticallyAdjustContentInsets={false}
                        style={{ flex: 1, margin: 10, }}
                        data={this.state.Data}
                        renderItem={({ item, index }) =>
                            this.renderMenuItem(item, index)
                        }
                    />
                </View>

            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        sideMenu: state.sideMenu,
    }
}
function mapDispatchToPropes(dispatch) {
    return {
        setSideMenuValues: (key, val) => dispatch(setSideMenuValues(key, val)),
    }
}

export default connect(mapStateToProps, mapDispatchToPropes)(SideMenu)
