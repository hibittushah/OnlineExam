import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import AfterLoginRouter from './routes/afterLogin.router';
import BeforeLoginRouter from './routes/beforeLogin.router';
import { connect } from 'react-redux';

import { setRouterValues } from './redux/actions/index';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentDidMount() {
    this.getLoginInfo();
  }

  getLoginInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo')
      if (value != undefined && value != null) {
        this.props.setRouterValues('isUserLogin', true)
      }
      else {
        this.props.setRouterValues('isUserLogin', false)
      }
    } catch (e) {
      console.log(e)

    }

  }

  render() {
    return (
      (this.props.router.isUserLogin ?
        <AfterLoginRouter /> :
        <BeforeLoginRouter />)
    );
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setRouterValues: (key, val) => dispatch(setRouterValues(key, val)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
