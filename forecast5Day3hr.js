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
    FlatList,
    Image,
} from 'react-native';
import moment, { months } from 'moment' 
export default class ForeCast53 extends Component {
  static navigationOptions = ({navigation}) =>{
    const headerTitle = 'Forecast';
    const headerStyle = {
      backgroundColor : '#46A7B8'
    }
    const headerTitleStyle ={
      color : 'red',
      marginRight: 100
    }
    return {headerTitle,headerTitleStyle ,headerStyle}
  }
  constructor() {
    super()
    this.state = {
     // text: '',
      forecast : '',
      icon : '',
      latitude : '',
      longitude : '',
      arr: ''
    }
    this.getWeather = this.getWeather.bind(this)
    this.getLocation = this.getLocation.bind(this)
    this.layDuLieu3h = this.layDuLieu3h.bind(this)
  } 
  layGio(gio){
    return gio.slice(11, 16)
  }
  getLocation(){
    // Get the current position of the user
    navigator.geolocation.getCurrentPosition(
    (position) => {
        this.setState(
        {
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude
        }, () => { this.getWeather(); }
        );
    },
      (error) => this.setState({ forecast: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
   
}
 getWeather(){
     fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+this.state.latitude+'&lon='+this.state.longitude+'&units=metric&appid=734a8bba2c73c986eb6579072083ed6b ')
    .then((response) => response.json())
    .then((responseJSON) => {
      this.setState({
        forecast: responseJSON.list
      },() => { this.layDuLieu3h() }
      )
    })
    .catch((error) => {
      alert(error) ;
    });
   }  
   layDuLieu3h(){
     const day = new Date();
     const dayNow = moment(day).format('DD MM YYYY') 
     const todayWeather = this.state.forecast.filter((item) => moment(item.dt_txt).format('DD MM YYYY') === dayNow )
     this.setState({
      arr: todayWeather
    })
   }
  componentDidMount(){
    this.getLocation();
  }
  render() {
    return (    
      <View style={styles.container}> 
            
            <Text style={{textAlign:"center",color: 'white',fontSize:15,margin: 10}}>Each 3 hours forecast</Text>
            <View style={{backgroundColor:'rgb(77,120,140)',height: 1}}></View>
             <FlatList data={this.state.arr}
             renderItem={({item,index})=>{ 
             return (
               <View style={styles.content} >
                  <View style={styles.ngay}> 
                    <View>
                      <Text style={{color: 'white',fontSize:14}}>{this.layGio(item.dt_txt)} : </Text>
                    </View>
                    <Text style={{marginLeft:10,color: 'white',fontSize:14}}>{item.weather[0].description}</Text>
                  </View>
                  <View style={styles.weather}>
                      <Image style={styles.icon} source={{uri : 'http://openweathermap.org/img/w/'+item.weather[0].icon+'.png'}}/>
                      <Text style={{marginLeft:10,marginTop: 15,fontSize:15,color: 'white'}}>{item.main.temp +'°C'} </Text>  
                  </View>
                  
               </View>
             )
            }}
            keyExtractor={item => item.dt.toString()}
             /> 
               
      </View>
         
    )   
  }

}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 10,
    width: '95%',
    height: 250,
    backgroundColor: 'rgba(46, 103, 107,0.7)',
    
   
  },
  content: {
    flexDirection:'row',
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#a097e6'
    
  },
  icon:{
    height:50,
    width: 50
  },
  ngay:{
    flexDirection:'row',
    width: 200,
    marginTop:15,
    marginLeft: 10,

  },
  weather:{
    flexDirection: 'row',
    textAlign: 'center'
  },
  
  });