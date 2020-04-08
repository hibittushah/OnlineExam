import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Colors from '../../utils/Colors';
import HeaderTitle from '../common/headerTitle';
import * as Constants from '../../utils/constants';
import HeaderIcon from '../common/headerIcon';
class Dashboard extends Component {

    // *** SET HEADER VIEW ***//
    static navigationOptions = ({ navigation }) => ({
        headerTintColor: 'white',
        headerTitle: <HeaderTitle title={"Dashboard"} />,
        headerStyle: {
            backgroundColor: Colors.darkPrimaryColor,
        },
        headerLeft: (
            <HeaderIcon iconName='menu' onPress={() => navigation.openDrawer()} />
        )
    })

    constructor(props) {
        super(props)
        this.state = {
            slides: [
                {
                    key: '1',
                    title: 'Title 1',
                    text: 'I\'m already out of descriptions Lorem ipsum',
                    image: Constants.Images.introduction1,
                },
                {
                    key: '2',
                    title: 'Title 2',
                    text: 'I\'m already out of descriptions Lorem ipsum',
                    image: Constants.Images.introduction2,
                },
                {
                    key: '3',
                    title: 'Title 3',
                    text: 'I\'m already out of descriptions Lorem ipsum',
                    image: Constants.Images.introduction3,
                },
                {
                    key: '4',
                    title: 'Title 4',
                    text: 'I\'m already out of descriptions Lorem ipsum',
                    image: Constants.Images.introduction1,
                },
                {
                    key: '5',
                    title: 'Title 4',
                    text: 'I\'m already out of descriptions Lorem ipsum',
                    image: Constants.Images.introduction2,
                },
                {
                    key: '5',
                    title: 'Title 5',
                    text: 'I\'m already out of descriptions Lorem ipsum',
                    image: Constants.Images.introduction3,
                },
                {
                    key: '6',
                    title: 'Title 5',
                    text: 'I\'m already out of descriptions Lorem ipsum',
                    image: Constants.Images.introduction1,
                },
            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.slides}
                    extraData={this.state}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyCart}>Cart is empty..</Text>
                    }
                    renderItem={({ item, index, separators }) => (
                        <View style={styles.flatListView}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailPage')}>
                                <View style={styles.flatListView2}>
                                    <View style={styles.flexView1}>
                                        <Image style={styles.imageItem}
                                            source={item.image}
                                            resizeMode='cover'>
                                        </Image>
                                    </View>
                                    <View style={styles.flexView2}>
                                        <Text style={styles.textItem}>{item.title}</Text>
                                        <Text style={styles.textItem2}>{item.text}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                
            </View>
        );
    }
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10
    },
    imageItem: {
        width: 120,
        height: 80,
        borderRadius: 5,
    },
    textItem: {
        color: Colors.black,
        fontSize: 16,
        paddingTop: 5
    },
    textItem2: {
        color: Colors.gray,
        fontSize: 16,
    },
    flatListView: {
        borderBottomColor: Colors.dividerColor,
        borderBottomWidth: 1
    },
    flatListView2: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    flexView1: {
        flex: 0.4,
        marginRight: 5
    },
    flexView2: {
        flex: 0.6,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    emptyCart: {
        textAlign: 'center',
        flex: 1,  
    },
})