import React, { Component } from 'react';
import {
  StyleSheet,
  Text, View
} from 'react-native';
import {   SearchBar, FormLabel, FormInput } from 'react-native-elements'
import { Container, Header, Content, Form, Item,
  Button, Input, Label, Body, Title, Left, Right,
  Icon} from 'native-base';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import { PermissionsAndroid } from 'react-native';



Mapbox.setAccessToken('pk.eyJ1IjoibWFya2gtdCIsImEiOiJjamtsaGNkNXAxdmNlM2xxaDU1ZG1oOGVmIn0.mWmaqttp-rJr2_YQhPIE9A');

export default class App extends Component  <{}> {

  //getting user current position
  constructor(props){
    super(props);

    this.state = {
      latitude: 32.574090,
      longitude: 0.316397,
      error: null
    };
  }

  componentDidMount() {
    this.requestLocationPermission().then(
      ()=>{

        //function requesting user current position
        navigator.geolocation.getCurrentPosition(
           (position) => {
             console.log("wokeeey");
             console.log(position);
             this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               error: null,
             });
           },
           (error) => this.setState({ error: error.message }),
           { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
         );
      }
    )


   }

//requesting permission for user to activate location
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location permission',
          'message': 'E-mech needs access to your location ' +
                     'so you can be accessed by your mechanic.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("Location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

  renderAnnotations () {
   return (
     <Mapbox.PointAnnotation
       key='pointAnnotation'
       id='pointAnnotation'
       coordinate={[this.state.longitude, this.state.latitude]}>

       <View style={styles.annotationContainer}>
         <View style={styles.annotationFill} />
       </View>
       <Mapbox.Callout title='Look! An annotation!' />
     </Mapbox.PointAnnotation>
   )
 }

someMethod(){
  console.log('hello')
}

 render() {
   return (
     <View style={styles.container}>
       <SearchBar
   round
   onChangeText={this.someMethod()}
   onClearText={this.someMethod()}
   placeholder='Type Here...' />
       <Mapbox.MapView
           styleURL={Mapbox.StyleURL.Street}
           zoomLevel={18}
           centerCoordinate={[this.state.longitude, this.state.latitude]}
           style={styles.container}
           showUserLocation={true}>
           {this.renderAnnotations()}
       </Mapbox.MapView>
     </View>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 annotationContainer: {
   width: 30,
   height: 30,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: 'white',
   borderRadius: 15,
 },
 annotationFill: {
   width: 30,
   height: 30,
   borderRadius: 15,
   backgroundColor: 'orange',
   transform: [{ scale: 0.6 }],
 },
});
