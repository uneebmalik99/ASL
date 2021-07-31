import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView, AsyncStorage, NetInfo } from 'react-native';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DialogLoder from '../screens/DialogLoder'
import ApiUrlCollecction from '../UrlCollection/AppUrlCollection';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import FCM, { FCMEvent, NotificationActionType, NotificationType } from "react-native-fcm";
import { registerKilledListener, registerAppListener } from "../FirebaseController/Listeners";
import { createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer, NavigationEvents} from 'react-navigation';
import VehicleContainerListScreen from "./VehcileContainerListScreen";
import ContainerTrackingScreen from "./ContainerTrackingScreen"; 
import LocationServiceScreen from "./LocationServiceScreen"; 
import ContactUsScreen  from "./ContactUsScreen";
import OurServiceListScreen from "./OurServiceListScreen";
import DashboardScreen from "../screens/DashboardScreen"; 
import { DrawerActions } from 'react-navigation';


// userName: 'info@impulsiontechnologies.com',
//             password: '20190021 



var deviceId = '';
 export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
      }
  
   
    constructor(props) {
        super(props)
        deviceId =  AppConstance.DEVICE_ID
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        console.log('DEVIDSDS ',AppConstance.DEVICE_ID  )
        this.state = {
            userName: 'nooraljabal1133@gmail.com',
            password: 'info@asl1001',
            isLoading: false,
            fireBaseToken:''
        }
    }

    

    callingLoginApi = () => {
        var uniqueId = DeviceInfo.getUniqueId();
        deviceId = uniqueId;
        // DeviceInfo.getDeviceId().then(uniqueId => {
        //     console.log(uniqueId)
        //     deviceId = uniqueId;
            // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
            // Android: "dd96dec43fb81c97"
   
        //this.props.navigation.navigate('NavigationSideScreen')
        if (this.state.userName.trim().length == 0) {

        alert('username can not be blank'); 

        } else if (this.state.password.trim().length == 0) {
            alert("password can not be blank"); 

        } else {
            // NetInfo.fetch().then(state => {
            //     if (state.isConnected == true) {
                console.warn("working1")
                    this.setState({ isLoading: true });
                    var url = 'http://manage.impulsion.live/webapi/login';

                    var value = new FormData();
                    // value.append('username', 'info@impulsiontechnologies.com');
                    // value.append('password', '20190021');
                    value.append('username',this.state.userName);
                    value.append('password', this.state.password);
                    value.append('token', this.state.fireBaseToken);
                    value.append('device_id', deviceId);
                    console.log('Login_key_vale ',value)
                    fetch(url, {
                        method: 'POST',
                        headers: {
                           
                           'Content-Type': 'multipart/form-data',
                        },
                        body: value,
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({ isLoading: false })
                            this.loginServiceCall(responseJson)
                        })
                        .catch((error) => {
                            this.setState({ isLoading: false })
                            console.warn(error)
                        });
                // }
                // else {
                //          alert("Internet not found")
                // }

            // });


        }
        //  this.props.navigation.navigate('NavigationSideScreen')
    }


     componentDidMount() {
     


      
        this.generateFCMToken();

//         if(AppConstance.USER_INFO.USER_NAME != null && AppConstance.password != null){
// console.log('passssss',AppConstance.password);

// userName=AppConstance.USER_INFO.USER_NAME;
// this.setState({userName :AppConstance.USER_INFO.USER_NAME })
// this.setState({password :AppConstance.password })
// this.callingLoginApi()
//         }
        //this.props.navigation.navigate('NavigationSideScreen')
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('USERLOGINED');
          if (value == '1') {
            this.props.navigation.push('DashboardScreen');

            // We have data!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
          alert(error);

        }
      };


    generateFCMToken = () => {
        FCM.createNotificationChannel({
            id: 'default',
            name: 'Default',
            description: 'used for example',
            priority: 'high'
        })
        registerAppListener(this.props.navigation);
        try {
            let result = FCM.requestPermissions({
                badge: false,
                sound: true,
                alert: true
            });
        } catch (e) {
            console.error(e);
        }

        FCM.getFCMToken().then(token => {
            console.log("TOKEN (getFCMToken)", token);
            this.setState({ fireBaseToken: token || "" });
          //  AsyncStorage.setItem(AppConstance.FCM_TOKEN, token)
            console.warn('Device Id :: ' + AppConstance.UDID)
        });

        if (Platform.OS === "ios") {
            FCM.getAPNSToken().then(token => {
                console.log("APNS TOKEN (getFCMToken)", token);
            });
        }
        registerKilledListener();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

   

    loginServiceCall = (responseJson) => {
        console.warn(responseJson)
      
        if (responseJson.status == AppConstance.API_SUCESSCODE) {

            this.props.navigation.push('DashboardScreen');
            
            //AppConstance.showSnackbarMessage(responseJson.message)
            this.callingUserService(responseJson.data.auth_key)
        } else {
            
            alert(responseJson.message);
        }
    }
    _storeData = async () => {
        try {
          await AsyncStorage.setItem(
            'USERLOGINED',
            '1'
          );
        } catch (error) {
          // Error saving data
          alert(error);

        }
      };
  
    //calling login service
    callingUserService = (authKey) => {
        var url = AppUrlCollection.USER;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                
                // 'Client-Service': AppConst.CLIENT_SERVICE,
                
                'authkey': authKey
            },
            // body: value,
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.warn('USER::: ', responseJson)
                AsyncStorage.setItem(AppConstance.USER_INFO_OBJ, JSON.stringify(responseJson.data))
                AsyncStorage.setItem(AppConstance.IS_USER_LOGIN, '1')

              //  this._storeData();

                
                let data = responseJson.data
                console.warn('json value', data)
                AppConstance.USER_INFO.USER_ID = data.id;
                AppConstance.USER_INFO.USER_NAME = data.username;
                AppConstance.USER_INFO.USER_TOKEN = data.auth_key;
                AppConstance.USER_INFO.USER_EMAIL = data.email;
                AppConstance.USER_INFO.USER_STATUS = data.status;
                AppConstance.USER_INFO.USER_DELETED = data.is_deleted;
                AppConstance.USER_INFO.USER_ADDRESS1 = data.address_line_1;
                AppConstance.USER_INFO.USER_ADDRESS2 = data.address_line_2;
                AppConstance.USER_INFO.USER_CITY = data.city;
                AppConstance.USER_INFO.USER_STATE = data.state;
                AppConstance.USER_INFO.USER_ZIP_CODE = data.zip_code;
                AppConstance.USER_INFO.USER_MOBILE = data.phone;
                AppConstance.USER_INFO.USER_FAX = data.fax;
                AppConstance.USER_INFO.USER_CUSTOMER_NAME = data.customer_name;
                AppConstance.USER_INFO.USER_IS_BLOCK = data.is_blocked;



                //this.props.navigation.goBack();
                this.props.navigation.navigate('NavigationSideScreen')
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.warn(error)
            });
    }


    handleBackButtonClick() {
        //this.props.navigation.goBack(null);
        BackHandler.exitApp();
        return true;
    }


    render() {
        return  <ScrollView>
            
            
            <View
                style={{backgroundColor:AppColors.Headercolor,
                height:60,
                justifyContent:'center',
                padding:10,

            }}
              >  


<TouchableOpacity 
              style={{width:60,height:60 ,alignContent:"flex-start", alignItems:"flex-start"}}
                        //   onPress={() => this.props.navigation.navigate('LoginScreen')}
>
              <Image source={ require('../Images/logo_final.png')} 
            style={{ width: 60, height:60, alignSelf: 'flex-start' }} resizeMode='contain'
           />
           </TouchableOpacity>
           <TouchableOpacity style={{position: 'absolute',
             alignContent:"flex-end",alignSelf:"flex-end",
            }  
            }
            
            onPress={() => {
                // this.props.navigation.dispatch(DrawerActions.openDrawer());

                this.props.navigation.navigate('RightDrawer')
            }}
            >
                 <Image source={ require('../Images/baru.jpg')} 
            style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
           />
             </TouchableOpacity>
                           </View>




            
            
            
            
            <View style={{ flex: 1, backgroundColor: AppColors.white, height: deviceHeight }}>
                <DialogLoder loading={this.state.isLoading} />
                



                        <ImageBackground style={{  flex: 1,
    resizeMode: 'cover',} } 
                 resizeMode='cover' 
                 source={require('../Images/dubia.jpg')}>
         

              

                <View 
                                    style={{ alignContent: 'center', alignItems: 'center', flex: 1 }}
                >

                    <Elavation
                     
                        elevation={3}
                        style={{   backgroundColor:AppColors.bg,marginBottom: 3, paddingTop: 8, paddingBottom: 8, borderRadius: 15, marginTop: 102 }}
                    >

             <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: 50, borderRadius: 20, paddingLeft: 10 }}>
                            <Text
                                style={{ width: deviceWidth * 0.8, height: 50,fontSize:22,fontWeight: "bold", color:AppColors.Signincolor, marginTop:13,paddingLeft: 10 }}
                            >Sign in </Text>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: 50, borderRadius: 20, paddingLeft: 10 }}>
                            <TextInput
                                style={{ width: deviceWidth * 0.8, height: 50, color: '#323232', paddingLeft: 10 }}
                                placeholder='Customer, username'
                                placeholderTextColor={AppColors.signinplaceholdercolor}
                                onChangeText={(text) => this.setState({ userName: text })}
                            />
                        </View>

                        <View style={{ width: deviceWidth * 0.8, height: 1, paddingHorizontal:20, backgroundColor: AppColors.signindivider, alignSelf: 'center', marginTop: 5}} />

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: 50, borderRadius: 20, paddingLeft: 10 }}>
                            <TextInput
                                style={{ width: deviceWidth * 0.8, height: 50, color: '#323232', paddingLeft: 10 }}
                                placeholder='Password'
                                placeholderTextColor={AppColors.signinplaceholdercolor}                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                        </View>
                        <View style={{ width: deviceWidth * 0.8, height: 20, paddingHorizontal:20, alignSelf: 'center', marginTop: 5, marginBottom: 5 }} />

                    </Elavation>

                    <TouchableOpacity
               
                    
                    style={{ width: deviceWidth * 0.81, height: 45, justifyContent: 'center',  marginTop: 8 }}
                        onPress={() => this.callingLoginApi()}
                    >
                    <Image
                    style={{ width: deviceWidth * 0.8, height: 45, justifyContent: 'center', borderRadius: 50, marginTop: 25 }}
                                   source={ require('../Images/picture2.png')} 
></Image>
                        {/* <Text style={{ color: AppColors.white, fontFamily: AppFonts.SourceSansProBold, textAlign: 'center', textAlignVertical: 'center', fontSize: 16 }}>LOG IN</Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1,  marginTop: 10,color: AppColors.blue }}
                        onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
                    >
                        <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.white, marginBottom: 20, fontSize: 15, marginTop: 10, justifyContent: 'center', paddingRight: 10 }}>Forgot Password?</Text>
                    </TouchableOpacity>

                </View>


                </ImageBackground>

            </View>
        </ScrollView>
    }
}

  




  