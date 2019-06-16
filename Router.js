import React from 'react'
import { Text} from 'react-native'
import WeatherApp from './WeatherApp'
import ForeCast53 from './forecast5Day3hr'
import demo from './demo'
import Forecast5Day from './ForeCast5Day'
import currentAcc from './12hForcast'
import Header from './Header'
import {createStackNavigator,createMaterialTopTabNavigator,} from 'react-navigation'

// export const HomeStack = createStackNavigator({
//     weather: {
//         screen: Header
//     },
// },
// {
//         mode: 'modal',
//         headerMode: 'none',
//     }
//     )
export const StackCurrent = createStackNavigator({
    weather: {
        screen: WeatherApp
    },
},
{ 
    mode: 'modal',
    headerMode: 'none',
}
)
export const stackForeCast12h = createStackNavigator({
    ForeCast12: {
        screen: currentAcc
    }
},
{
    mode: 'modal',
    headerMode: 'none',
}
)
export const stackForeCast5day = createStackNavigator({
    ForeCast5: {
        screen: Forecast5Day
    },
},
{
    mode: 'modal',
    headerMode: 'none',
}
)
export const HomeStack = createMaterialTopTabNavigator({
    current: {
        screen: StackCurrent,
        
            navigationOptions: {
                tabBarLabel: 'Now'
            }
        
    },
    weather: {
        screen: stackForeCast12h,
            navigationOptions: {
                tabBarLabel: '12H'
            }   
    },
    Forecast:{
        screen: stackForeCast5day,
        navigationOptions: {
            tabBarLabel: '5 Day'
        }
    }
},
{
    tabBarOptions: {
        swipeEnabled: true,
        showIcon: true,
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        style : {
            backgroundColor: '#325A7D',
           
        }
}
}
)
