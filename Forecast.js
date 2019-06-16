import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
//import console = require('console');

class Forecast extends React.Component {
    render() {
        return (
            <View style={styles.contain}>
                <Text style={styles.bigText}>{this.props.main}</Text>
                <View style={styles.container}>
                    <View ><Image style={styles.icon} source={{ uri: 'http://openweathermap.org/img/w/' + this.props.icon + '.png' }} /></View>
                    <View Style={styles.content}>
                        <Text style={styles.mainText1}>{this.props.temp}</Text>
                        <Text style={styles.mainText}> {this.props.description}</Text>
                    </View >
                </View>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    contain: {
        // flex: 1,
        // flexDirection: 'column',
        // borderRadius: 10,
        // width: '95%',
        // backgroundColor: '#2D566B',
        // opacity: 0.4,
    },
    bigText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    container: {
        marginTop: 20,
        flexDirection: "row",
    },
    content: {
        flexDirection: "column",
    },
    mainText: {
        paddingTop: 10,
        fontSize: 20,
        textAlign: 'right',
        color: '#FFFFFF',
    },
    mainText1: {
        paddingTop: 10,
        fontSize: 30,
        textAlign: 'right',
        color: '#FFFFFF',
    },
    icon: {
        height: 110,
        width: 100,
    }
})
export default Forecast