import React from 'react'
import {View} from 'react-native'
import {HomeStack} from './Router'
import Header from './Header'
import { createAppContainer} from 'react-navigation'

const HomeScreen = createAppContainer(HomeStack);
export default class App extends React.Component {
    render(){
        return(
            <HomeScreen/>
          
        )
    }
}