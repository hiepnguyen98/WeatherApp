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
    FlatList,
    ImageBackground
} from 'react-native';
import moment from 'moment'
import Header from './Header'
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
export default class currentAcc extends Component {
  
  constructor() {
    super()
    this.state = {
      DailyForecast : [],
      apikey: '',
      latitude : '',
      longitude : '',
    }
  this.layAPI = this.layAPI.bind(this)
  this.getLocation = this.getLocation.bind(this)
  this.layDuLieu = this.layDuLieu.bind(this)
  } 
  getLocation(){
    // Get the current position of the user
    navigator.geolocation.getCurrentPosition(
     
    (position) => {
        this.setState(
        {
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude
        }, () => { this.layAPI(); }
        );
    },
        (error) => this.setState({ forecast: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
   
}
layGio(gio){
  return gio.slice(11, 16)
}
layNgay(ngay){
    let day = new Date(ngay);
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[day.getDay()]
  }
  layIcon(img){
    const so = parseInt(img);
    if(so <= 9) {
      return 'https://developer.accuweather.com/sites/default/files/0'+img+'-s.png' ;
    }else{
      return 'https://developer.accuweather.com/sites/default/files/'+img+'-s.png';
    }
  }
  layAPI(){
    fetch('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json?q='+this.state.latitude+','+this.state.longitude+'&apikey=Jb9123wXawr3qjoAqA4fLen3GA2Q9tvM')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        apikey: responseJSON.ParentCity.Key
        },() => {this.layDuLieu();}
        );
    })
    .catch((error) => {
    alert(error)
    });
   
 }
 layDuLieu = () =>{
  fetch('http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/'+this.state.apikey+'?apikey=Jb9123wXawr3qjoAqA4fLen3GA2Q9tvM&language=vi&details=true&metric=true')
  .then((response) => response.json())
  .then((responseJSON) => {
    this.setState({
      DailyForecast: responseJSON
      });
  })
  .catch((error) => {
  alert(error)
  });
 }
  componentDidMount(){
   this.getLocation()
  }
  render() {
     return( 
      <ImageBackground source={require('./img/detailBG.jpg')} resizeMode = 'cover'
      style={styles.backdrop}>
        <View style={styles.container}>
          <View style={styles.contentHead}>
            <View style={styles.head}>
              <Icon style={{marginLeft:'30%'}}  name='av-timer' size={33} color='white'  />
            </View>
            <View style={styles.head}>
              <Icon style={{marginLeft:'30%'}}  name='oil-temperature' size={33} color='white'  />
            </View>
            <View style={styles.head}>
              <Icon style={{marginLeft:'30%'}}  name='weather-windy' size={33} color='white'  />
            </View>
            <View style={styles.head1}>
              <Icon style={{marginLeft:'30%'}}  name='eye' size={33} color='white'  />
            </View>
          </View>
          <FlatList data={this.state.DailyForecast}
          renderItem={({item,index}) => {
            return (
              <View style={styles.forecastDay}>
                <View style={styles.mota}>
                  <View style={{marginLeft:'28%',marginTop: 5}}>
                    <Text style={{color: 'white',}}> {this.layNgay(item.DateTime)}  {this.layGio(item.DateTime)}</Text>
                   
                  </View>
                  <View style={styles.icon}>
                    <Image style={{width:55,height:35}} source={{uri:this.layIcon(item.WeatherIcon)}}/>
                    <Text style={{color: 'white',}}> {item.IconPhrase}</Text>
                  </View>
                </View>
                <View style={styles.mota}>
                  <View style={{marginTop: 10,marginLeft:'25%'}}>
                    <Text style={{color: 'white',fontSize:16}}>{item.Temperature.Value}°C</Text>
                  </View>
                  <View style={styles.icon}>
                    <Text style={{color: 'white',fontSize:12}}>Real feel:</Text>
                    <Text style={{color: 'white',fontSize:12}}>{item.RealFeelTemperature.Value}°C</Text>
                  </View>
                </View>
                <View style={styles.mota}>
                  <Text style={{color: 'white', marginTop: 20,fontSize:16,marginLeft:'35%'}}>{item.Wind.Speed.Value}</Text>
                  <Text style={{color: 'white',marginLeft:'35%'}}>{item.Wind.Speed.Unit}</Text>
                </View>
                <View style={styles.mota}>
                  <View style={{marginLeft:5, marginTop: 20,marginLeft:'35%'}}>
                    <Text style={{color:'white',fontSize:16}}>{item.Visibility.Value}</Text>
                    <Text style={{color:'white'}}>{item.Visibility.Unit}</Text>
                </View>
              </View>
              </View>
            )
          }
        }
        keyExtractor={weather => weather.EpochDateTime.toString()}
        />
        </View>
      </ImageBackground>
    )
}
}
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    resizeMode: 'stretch',
  },
  container:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
    contentHead: {
      marginTop: 10,
      height:50,
      flexDirection:'row',
      textAlign: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#a097e6',
    },
    head: {
      flex: 1,
      flexDirection:'column',
      textAlign:'center',
      marginTop: 5,
      justifyContent: 'center',
      borderRightWidth: 1,
      borderRightColor: 'white'
    },
    head1: {
      flex: 1,
      flexDirection:'column',
      textAlign:'center',
      marginTop: 5,
      justifyContent: 'center',
    },
    forecastDay: {
      height: 'auto',
      flexDirection:'row',
      marginLeft: 10,
      marginRight: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#a097e6',
    },
    mota: {
      flex: 1,
      flexDirection:'column',
      textAlign:'center',
      justifyContent: 'center',
    },
    icon: {
      textAlign: 'center',
      marginTop: 5,
      marginLeft: '20%'
    },
    nhietdo: {
      flexDirection:'row',
      marginLeft:40
    }
  });
