import React,{Component} from 'react'
import {View, Text , TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
// import {HomeStack} from './Router'
// import { createAppContainer} from 'react-navigation'

// const HomeScreen = createAppContainer(HomeStack);

export default class Header extends Component {
    render(){
        return(
            <View style={styles.container}>
                 <View style = {styles.icon1}>
                    <TouchableOpacity>
                        <Icon name='menu' size={28} color='white'/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.contentInput}>
                    <Text style={{color:'white',fontSize: 19}}>hiep</Text>
                </View>
                <View style = {styles.icon}>
                    <TouchableOpacity onPress= {()=> this.props.navigation.navigate('Detail')}>
                        <Icon name='more-vertical' size={28} color='white'/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{   
        backgroundColor: '#325A7D', 
        borderBottomWidth : 0.5,
        borderBottomColor: 'gray',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
       
    },
    contentInput:{
        height: 35,
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        width: '70%',
        borderRadius: 5
    },
    icon: {
        alignItems: 'flex-start',
        marginLeft: 5,
    },
    icon1:{
        marginLeft: 20
    }
})