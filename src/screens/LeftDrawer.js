import React from "react";
import { View, Text, Button, Dimensions } from "react-native";
import {  createAppContainer } from "react-navigation";
import LeftSideBar from "./leftsidebar";
import {createDrawerNavigator}  from "react-navigation-drawer";
import LoginScreen from "./LoginScreen";
import LocationServiceScreen from './LocationServiceScreen';
import VehicleScreen from './VehicleScreen'; 
import ContactUsScreen from './ContactUsScreen';
import DashboardScreen from './DashboardScreen';
import ExportListScreen from './ExportListScreen';
import ContainerTrackingScreen from './ContainerTrackingScreen';
import OurServiceListScreen from './OurServiceListScreen';
import VehcileContainerListScreen from './VehcileContainerListScreen';
import SplashScreen from './SplashScreen';



const WIDTH = Dimensions.get('window').width;

const LeftDrawer = createDrawerNavigator({


 
  
  Home: {
        screen:LoginScreen,
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: "Login",
          drawerIcon: ({focused, size}) => (
              <Image source={ require('../Images/edit.png')} 
              style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
             />
            ),
            
              
    },
      },
     
      
      ContainerTrackingScreen: {
        screen:ContainerTrackingScreen,
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: "Container Tracking",
          drawerIcon: ({focused, size}) => (
            <Image source={ require('../Images/container_tracking.png')} 
            style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
           />
          ),
  
    },
      },
      LocationServiceScreen: {
        screen:LocationServiceScreen,
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: "Yard",
          drawerIcon: ({focused, size}) => (
            <Image source={ require('../Images/yard.png')} 
            style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
           />
          ),
  
    },
      },
      ContactUsScreen: {
        screen:ContactUsScreen,
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel:"Contact Us ",
          drawerIcon: ({focused, size}) => (
            <Image source={ require('../Images/contact_us.png')} 
            style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
           />
          ),
  
    },
      },

      OurServiceListScreen  : {
        
        screen:OurServiceListScreen,
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: " Our Services ",
          drawerIcon: ({focused, size}) => (
            <Image source={ require('../Images/our_services.png')} 
            style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
           />
          ),
  
    },
      },
      VehcileContainerListScreen  : {
        
        screen:VehcileContainerListScreen,
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: " Our Services ",
          drawerIcon: ({focused, size}) => (
            <Image source={ require('../Images/our_services.png')} 
            style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
           />
          ),
  
    },
      },
   



},



{
initialRouteName: "Home",
drawerWidth:WIDTH*0.80,
drawerPosition:'right',
contentOptions: {
activeTintColor: "#e91e63"
},
contentComponent: props => <LeftSideBar {...props} />,

}
);
export default LeftDrawer;