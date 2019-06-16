import React,{Component} from 'react'
import {View, Text, StyleSheet,Image} from 'react-native'

export default class extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.title}><Text style={{marginTop: 5,marginLeft:10,color:'white'}}>Detail</Text></View>
                <View style={styles.containt}>
                    <View style={styles.detail1}>
                        <View style={styles.chitiet1}>
                            <Text>Speed Wind</Text>
                            <Text style={{color:'white'}}>{this.props.wind}km/h</Text>
                        </View>
                        <Image style={styles.img} source={require('./icon/wind1.png')} />
                    </View>
                    <View style={styles.detail}>
                        <View  style={styles.chitiet}>
                            <Text>Real feel</Text>
                            <Text style={{color:'white'}}>{this.props.temp}</Text>
                        </View>
                        <Image style={styles.img} source={require('./icon/thermometer.png')} />
                    </View>
                </View>
                <View style={styles.containt}> 
                    <View style={styles.detail1}>
                        <View style={styles.chitiet}>
                            <Text>Humidity</Text>
                            <Text style={{color:'white'}}>{this.props.hum} %</Text>
                        </View>
                        <Image style={styles.img} source={require('./icon/water.png')} />
                    </View>
                    <View style={styles.detail}>
                        <View style={styles.chitiet}>
                            <Text>Pressure</Text>
                            <Text style={{color:'white'}}>{this.props.press} mb</Text>
                        </View>
                        <Image style={styles.img} source={require('./icon/car.png')} />
                    </View>
                </View>
            </View>
        )
    }
}
const styles =StyleSheet.create({
    container: {
        width: '95%',
        height: 150,
        flexDirection: 'column',
        backgroundColor: 'rgba(46, 103, 107,0.7)',
        borderRadius: 10,
    },
    title:{
        height: 30,
    },
    containt: {
        flexDirection: 'row',
        borderTopWidth: 1 ,
        borderTopColor: '#d4f1f1',
        borderTopWidth: 1 ,
        borderTopColor: '#d4f1f1',
    },
    detail:{
        width:'50%',
        height: 60,
        flexDirection: 'row',
    },
    detail1:{
        width:'50%',
        height: 60,
        flexDirection: 'row',
        borderRightWidth: 1 ,
        borderRightColor: '#d4f1f1',
    },
    chitiet:{
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 60,
        marginTop: 10
    },
    chitiet1:{
        flexDirection: 'column',
        marginLeft: 5,
        marginRight: 45,
        marginTop: 10
    },
    img: {
        height: 30,
        width: 30,
        marginTop: 20,
    }
})