import React, { Component } from 'react';
import Dashboard from '../components/DashboardModule/dashboard.component';
import Setting from '../components/DashboardModule/setting.component';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Colors from '../utils/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  responsiveScreenWidth } from '../components/common/ResponsiveScreen'
import sideMenu from '../components/common/sideMenu'
const AppNavigator = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        title: "Dashboard"
      }
    },
  },
  {
    initialRouteName: 'Dashboard',
  
  },

);
const DashboardNavigation = createStackNavigator(
  {
    Dashboard: Dashboard,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerLayoutPreset: 'center',
      headerStyle: {
        backgroundColor: Colors.darkPrimaryColor,
      },
    },
  },
  {
    initialRouteName: 'Dashboard',
    headerLayoutPreset: 'center'

  },
);
const SettingNavigation = createStackNavigator(
  {
    Setting: Setting,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerLayoutPreset: 'center',
      headerStyle: {
        backgroundColor: Colors.darkPrimaryColor,
      },
    },
  },
  {
    initialRouteName: 'Setting',
    headerLayoutPreset: 'center'

  },
);
//   DashboardNavigation.navigationOptions = ({ navigation }) => {
//     let tabBarVisible = true;
//     if (navigation.state.index > 0) {
//       tabBarVisible = false;
//     }
//     return {
//       tabBarVisible,
//     };
// }

const TabNavigator = createMaterialBottomTabNavigator({
  Dashboard: DashboardNavigation,
  Setting: SettingNavigation
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        console.log("RouterName", routeName)
        var image
        if (routeName === 'Dashboard') {
          image = focused === true ? <MaterialCommunityIcons name='home-outline' style={styles.active_icon} /> : <MaterialCommunityIcons name='home-outline' style={styles.inactive_icon} />
        } else if (routeName === 'Setting') {
          image = focused === true ? <MaterialCommunityIcons name='settings-outline' style={styles.active_icon} /> : <MaterialCommunityIcons name='settings-outline' style={styles.inactive_icon} />
        }

        // You can return any component that you like here!
        return image;
      }
    }),
    tabBarOptions: {
      activeTintColor: Colors.white,
      inactiveTintColor: Colors.black,

    },
    activeColor: Colors.white,
    inactiveColor: Colors.lightGray,
    barStyle: { backgroundColor: Colors.darkPrimaryColor },
  }
);

const sideMenuNavigator = createDrawerNavigator({
  Home:TabNavigator,
 },
 {
  drawerWidth: responsiveScreenWidth(80),
  contentComponent: sideMenu,
  edgeWidth: 0,
  
},
{
  defaultNavigationOptions:
    {
      header: null,  
      gesturesEnabled:false,
      drawerLockMode:'locked-closed',
     
    },  
    
  },
 ) 

const Router = createAppContainer(sideMenuNavigator);
export default Router;
const styles = StyleSheet.create({
  active_icon: {
    color: Colors.white,
    fontSize: 26
  },
  inactive_icon: {
    color: Colors.lightGray,
    fontSize: 24

  }
})