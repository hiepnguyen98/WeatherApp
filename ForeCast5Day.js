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
    TextInput,
    ImageBackground,
    Image,
    Button,
    FlatList
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons'
export default class Forecast5Day extends Component {
  
  constructor() {
    super()
    this.state = {
      DailyForecast : [],
    }
  this.layAPI = this.layAPI.bind(this)
  this.getLocation = this.getLocation.bind(this)
  this.layDuLieu = this.layDuLieu.bind(this)
  } 
  layNgay(ngay,index){
    let day = new Date(ngay);
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    if(index === 0){
      return 'Today'
    }else if(index === 1){
      return 'Tomorrow'
    }else{
    return days[day.getDay()]
    }
  }
  layIcon(img){
    const so = parseInt(img);
    if(so <= 9) {
      return 'https://developer.accuweather.com/sites/default/files/0'+img+'-s.png' ;
    }else{
      return 'https://developer.accuweather.com/sites/default/files/'+img+'-s.png';
    }
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
  fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/'+this.state.apikey+'?apikey=Jb9123wXawr3qjoAqA4fLen3GA2Q9tvM&language=VI&details=true&metric=true')
  .then((response) => response.json())
  .then((responseJSON) => {
    this.setState({
      DailyForecast: responseJSON.DailyForecasts
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
       <FlatList data={this.state.DailyForecast}
          renderItem={({item,index}) => {
          return (
            <View style={styles.content}>
            <View style={styles.nhietdo}>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontSize:16,color: 'white',}}>{this.layNgay(item.Date)}</Text>
                    <Text style={{fontSize:14,color: 'white',}}>{moment(item.Date).format('DD/MM')}</Text>
                </View>
                <View style={{marginLeft: '35%',marginTop:7}}>
                    <Text style={{fontSize:16,color: 'white',}}>{item.Temperature.Minimum.Value}-{item.Temperature.Maximum.Value}°C</Text>
                </View>
            </View>
            <View style={styles.buoi}>
                <View style={styles.sang}>
                    <View style={styles.head}>
                        <Text style={{fontSize:16,color: 'white',}}>Day</Text>  
                    </View>
                    <View style={styles.detail}>
                        <View style={{marginLeft: 10,flex:1}}>
                            <Image style={{width:55,height:35}} source={{uri:this.layIcon(item.Day.Icon)}}/> 
                            <Text style={{fontSize:14,color: 'white',}}>{item.Day.IconPhrase}</Text>
                        </View>
                        <View style={{marginLeft: 15,flex:1}}>
                            <Icon name='weather-windy' size={40} color='white'/> 
                            <Text style={{fontSize:14,color: 'white',}}>{item.Day.Wind.Speed.Value}Km </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.toi}>
                <View style={styles.head}>
                        <Text style={{fontSize:16,color: 'white',}}>Night</Text>  
                    </View>
                    <View style={styles.detail}>
                        <View style={{marginLeft: 10,flex:1}}>
                          <Image style={{width:55,height:35}} source={{uri: this.layIcon(item.Night.Icon)}}/>
                          <Text style={{fontSize:14,color: 'white',}}>{item.Night.IconPhrase}</Text>
                        </View>
                        <View style={{marginLeft: 15,flex:1}}>
                          <Icon name='weather-windy' size={40} color='white'/> 
                          <Text style={{fontSize:14,color: 'white',}}>{item.Night.Wind.Speed.Value}Km </Text>
                        </View>
                    </View>
                </View>
            </View>
          </View>
         
          )
         
        }
        
      }
      keyExtractor={DATA =>DATA.Date.toString()}
      />
      </View>
      </ImageBackground>
    )
}
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    
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
    borderBottomColor: 'white', 
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
},
nhietdo: {
    flexDirection: 'row',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#a097e6',
},
buoi: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#a097e6',
    marginBottom: 10 
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
