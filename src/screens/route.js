import React from "react";
import { View, Text, Button } from "react-native";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './LoginScreen';
import LocationServiceScreen from './LocationServiceScreen';
import VehicleScreen from './VehicleScreen'; 
import ContactUsScreen from './ContactUsScreen';
import LeftDrawer from './LeftDrawer';
import DashboardScreen from './DashboardScreen';
import ExportListScreen from './ExportListScreen';
import ContainerTrackingScreen from './ContainerTrackingScreen';
import LeftSideBar from './leftsidebar';
import RightDrawer from './RightDrawer';
import OurServiceListScreen from './OurServiceListScreen';

import All from './All';
import Unpaid from './Unpaid';

import Paid from './Paid';

import PaymentHistory from './PaymentHistory';


import VehcileContinerListScreen from './VehcileContainerListScreen';
import LocationServiceOne from './LocationServiceOne';
import OurServiceOne from './OurServiceone';
import ContainerTrackingOne from './ContainerTrackingOne';
import ContactUsOne from './ContactUsOne';
import WishListScreen from './WishListScreen';
import AnnoucementDetailScreen from './AnnoucementDetailScreen';
import AccountDetailsScreen from './AccountDetailsScreen';
import AccountSectionMainScreen from './AccountSectionMainScreen';
import AnnouncementDetailScreen from './AnnoucementDetailScreen';
import ExportDetailsScreen from './ExportDetailsScreen';
import ExportImageListScreen from './ExportImageListScreen';
import ForgotPasswordScreen  from './ForgotPasswordScreen';
import ImageFullScreenShowingScreen from './ImageFullScreenShowingScreen';
import ImageSlidePallex from './ImageSlidePallex';
import InvoiceDetailsScreen from './InvoiceDetailsScreen';
import InvoiceListScreen from './InvoiceListScreen';
import NotificationInvoiceDetailsScreen from './NotificationInvoiceDetailsScreen';
import NotificationInvoiceVehicleScreen from './NotificationVehicleDetailscreen';
import OurServiceDetailScreen from './OurServiceDetailScreen';
import VehicilDetailScreen from './VehcilDetailScreen';
import PopUp from './PopUp';
import VehicleOne from './VehicleOne';
import VehcilContainerDetailScreen from './VehcilContainerDetailScreen';
import NotificationVehicleDetailscreen from'./NotificationVehicleDetailscreen';
import SplashScreen from './SplashScreen';





const MainNavigator = createStackNavigator({
  SplashScreen: {
    screen:SplashScreen,
    headerMode: 'none',
    navigationOptions: {
      header:false, //hide header if not needed so whole screen slide  
      drawerLabel: null,

},
  },
  
  LoginScreen: {
        screen:LoginScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      DashboardScreen: {
        screen:DashboardScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      AccountDetailsScreen: {
        screen:AccountDetailsScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      ExportListScreen: {
        screen:ExportListScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      LocationServiceScreen: {
        screen:LocationServiceScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      
      VehicleScreen: {
        screen:VehicleScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
    
      ContainerTrackingScreen: {
        screen:ContainerTrackingScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },


      OurServiceListScreen: {
        screen:OurServiceListScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
    
      ContactUsScreen: {
        screen:ContactUsScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },

      VehcilContainerDetailScreen : {
        screen:VehcilContainerDetailScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },

      VehcileContinerListScreen: {
        screen:VehcileContinerListScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      NotificationInvoiceDetailsScreen: {
        screen:NotificationInvoiceDetailsScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      LocationServiceOne: {
        screen:LocationServiceOne,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },


      ContactUsOne: {
        screen:ContactUsOne,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      OurServiceOne: {
        screen:OurServiceOne,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },

      ContainerTrackingOne: {
        screen:ContainerTrackingOne,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      WishListScreen: {
        screen:WishListScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      AnnoucementDetailScreen: {
        screen:AnnoucementDetailScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },

      AccountSectionMainScreen: {
        screen:AccountSectionMainScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      AnnouncementDetailScreen: {
        screen:AnnouncementDetailScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      ImageSlidePallex: {
        screen:ImageSlidePallex,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      ForgotPasswordScreen: {
        screen:ForgotPasswordScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      ImageFullScreenShowingScreen: {
        screen:ImageFullScreenShowingScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      
      ImageSlidePallex: {
        screen:ImageSlidePallex,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
    
      InvoiceDetailsScreen: {
        screen:InvoiceDetailsScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      ExportDetailsScreen: {
        screen:ExportDetailsScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      ExportImageListScreen: {
        screen:ExportImageListScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      InvoiceListScreen: {
        screen:InvoiceListScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      NotificationInvoiceDetailsScreen: {
        screen:NotificationInvoiceDetailsScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      NotificationInvoiceVehicleScreen: {
        screen:NotificationInvoiceVehicleScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      
      OurServiceDetailScreen: {
        screen:OurServiceDetailScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
    
      VehicilDetailScreen: {
        screen:VehicilDetailScreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },

      PopUp: {
        screen:PopUp,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
      VehicleOne: {
        screen:VehicleOne,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },
       VehicleOne: {
        screen:VehicleOne,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },

      All: {
        screen:All,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },

      
      Unpaid: {
        screen:Unpaid,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },

      Paid: {
        screen:Paid,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },

      PaymentHistory: {
        screen:PaymentHistory,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },



   









      NotificationVehicleDetailscreen: {
        screen:NotificationVehicleDetailscreen,
        headerMode: 'none',
        navigationOptions: {
          header:false, //hide header if not needed so whole screen slide  
          drawerLabel: null,
    
    },
      },

      RightDrawer:{
        screen:RightDrawer
      },

  



    LeftDrawer: {screen: LeftDrawer},
    LeftSideBar: {screen: LeftSideBar},







},
{
initialRouteName: "SplashScreen",
headerMode: "none",
swipeEnabled: false
});
const MainRoute = createAppContainer(MainNavigator);
export default MainRoute;