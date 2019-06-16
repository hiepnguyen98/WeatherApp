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
    ImageBackground,
    ScrollView

} from 'react-native';
import Header from './Header'
import ForeCast53 from './forecast5Day3hr'
import Forecast from './Forecast'
import Detail from './DetailWeather'
//import console = require('console');

export default class WeatherApp extends Component {
  constructor() {
    super()
    this.state = {
     // text: '',
      forecast : '',
      icon : '',
      latitude : '',
      longitude : '',
    }
    this.getWeather = this.getWeather.bind(this)
    this.getLocation = this.getLocation.bind(this)
  } 
  laybackground(main){
  
    const hr = new Date();
    const laygio = hr.getHours();
    if(laygio <=18 && laygio >= 6){
      if(main === 'Clouds'){
        return require("./img/cloudSkyDay.png")
      }else if(main === 'Rain'){
        return require("./img/rain.png")
      }else if(main === 'Clear'){
        return require("./img/sky.png")
      }else if(main === 'Thunderstorm'){
        return require("./img/storm.png")
      }
    }else{
      if(main === 'Clouds'){
        return require("./img/NightSky.png")
      }else if(main === 'Rain'){
        return require("./img/NightRain.jpg")
      }else if(main === 'Clear'){
        return require("./img/sky.png")
      }else if(main === 'Thunderstorm'){
        return require("./img/storm.png")
      }
    }
  }
  componentDidMount(){
    this.getLocation();
  }
  getLocation(){
    // Get the current position of the user
    navigator.geolocation.getCurrentPosition(
     
    (position) => {
        this.setState(
        {
            latitude: position.coords.latitude, // vĩ độ
            longitude: position.coords.longitude // kinh độ
        }, () => { this.getWeather(); }
        );
    },
        (error) => this.setState({ forecast: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
   
}
 getWeather(){
     fetch('http://api.openweathermap.org/data/2.5/weather?lat='+this.state.latitude+'&lon='+this.state.longitude+'&units=metric&appid=734a8bba2c73c986eb6579072083ed6b ')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        forecast: {
           main: responseJSON.weather[0].main,
           description: responseJSON.weather[0].description,
           temp: responseJSON.main.temp +'°C',
           name: responseJSON.name,
           speedWind: responseJSON.wind.speed,
           hum: responseJSON.main.humidity,
           pressure: responseJSON.main.pressure
        },
        icon : responseJSON.weather[0].icon  
      });
    })
    .catch((error) => {
      //alert(error)
      alert(error) ;
    });
    
  }
  render() {
    
    return (
      
     <View style={{flex: 1}}>
       
        <ImageBackground source={this.laybackground(this.state.forecast.main)}
            resizeMode = 'cover'
            style={styles.backdrop}>
            <View style={styles.chua}>
              <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.welcome}>{this.state.forecast.name}</Text>  
                    <View style={styles.content}>
                        <Forecast
                        icon={this.state.icon}
                        main={this.state.forecast.main}
                        description={this.state.forecast.description}
                        temp={this.state.forecast.temp} />
                </View> 
                  
                </View> 
                <View style={styles.forecast}>
                  <ForeCast53 />
                </View>
                <View style={styles.detail}>
                  <Detail
                    wind = {this.state.forecast.speedWind}
                    temp = {this.state.forecast.temp}
                    hum = {this.state.forecast.hum}
                    press = {this.state.forecast.pressure}
                  />
                </View>
            </ScrollView>
          </View>
        </ImageBackground>
        </View>
    )
  }

}
const styles = StyleSheet.create({
  chua: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  container: {
    flex : 1,
    paddingTop: 5,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 4,
    height: 260
  },
  content: {
    flex : 2,
  },
  welcome: {
    flex : 1,
    fontSize: 20,
    textAlign: 'center',
    color:'#fff',
    margin: 10,
  },
  input: {
    textAlign: 'center',
    color:'white',
    fontSize: 20,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  backdrop: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    width: null,
    resizeMode: 'stretch',
    alignSelf: 'stretch',
    },
  forecast: {
    flex:1,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  detail:{
    flex:1,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 10
  }
  });