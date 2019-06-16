/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground
    
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
export default class demo extends Component {
  render() {
     return( 
        <ImageBackground source={require('./img/detailBG.jpg')} resizeMode = 'cover'

        style={styles.backdrop}>
            <View style={styles.but}>
                <View style={styles.nut}>
                    <Text style={{ color: 'gray',fontSize: 15}}
                    onPress={() => this.props.navigation.navigate('ForeCast12')}>
                    12h</Text> 
                </View>
                <View style={styles.nut}>
                    <Text style={{ color: 'gray',fontSize: 15}}
                    onPress={() => this.props.navigation.navigate('ForeCast12')}>
                    12h</Text> 
                </View> 
                <View style={styles.nut}>
                    <Text style={{ color: 'gray',fontSize: 15}}
                    onPress={() => this.props.navigation.navigate('ForeCast12')}>
                    12h</Text> 
                </View> 
          </View>
          <View style={styles.content} >
        <View style={styles.container} >
            <View style={styles.nhietdo}>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontSize:14,color: 'white',}} >7/8</Text>
                </View>
                <View style={{marginLeft: '35%',marginTop:7}}>
                    <Text style={{fontSize:16,color: 'white',}}>20'C-30'C</Text>
                </View>
            </View>
            <View style={styles.buoi} >
                <View style={styles.sang}>
                    <Text style={{fontSize:16,color: 'white',}} >sun</Text>
                    <View style={styles.head}>
                        <Text style={{fontSize:16,color: 'white',}}>Day</Text>  
                    </View>
                        <View style={{marginLeft: 10}}>
                            <Icon name='weather-windy' size={40} color='white'/> 
                            <Text style={{fontSize:14,color: 'white',}}>hoi mua nha bi</Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Icon name='weather-windy' size={40} color='white'/> 
                            <Text style={{fontSize:14,color: 'white',}}>hoi mua </Text>
                        </View>
                    </View>
                    <View style={styles.detail}>
                </View>
                <View style={styles.toi}>
                <View style={styles.head}>
                        <Text style={{fontSize:16,color: 'white',}}>Night</Text>  
                    </View>
                    <View style={styles.detail}>
                        <View style={{marginLeft: 10}}>
                            <Icon name='weather-windy' size={40} color='white'/> 
                            <Text style={{fontSize:14,color: 'white',}}>hoi mua nha bi</Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Icon name='weather-windy' size={40} color='white'/> 
                            <Text style={{fontSize:14,color: 'white',}}>hoi mua </Text>
                        </View>
                    </View>
                </View>
            </View>
          </View>
        </View>
        </ImageBackground>
    )
}
}
const styles = StyleSheet.create({
    
    container:{
        flex: 1,
        backgroundColor: 'white',
        opacity: 0.7,
    },
    backdrop: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        resizeMode: 'stretch',
    },
    content: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#a097e6', 
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    nhietdo: {
        flexDirection: 'row',
        justifyContent:'center'
    },
    buoi: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#a097e6',
        marginBottom: 5 
    },
    sang: {
        flex: 1,
        flexDirection: 'column',
        borderRightWidth: 1,
        borderRightColor: '#a097e6'
    },
    toi: {
        flex: 1,
        flexDirection: 'column',
    },
    head : {
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: '#a097e6'
    },
    detail: {
        flexDirection: 'row',
    }
   
  });
