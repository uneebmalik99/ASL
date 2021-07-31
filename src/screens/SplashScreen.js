
import React, { Component } from 'react';
import { View, Alert, TouchableOpacity, TextInput, Linking, Platform, Animated, Easing, Image, BackHandler, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
// import FCM, { FCMEvent, NotificationActionType, NotificationType } from "react-native-fcm";
// import { registerKilledListener, registerAppListener } from "../FirebaseController/Listeners";
import VersionCheck from 'react-native-version-check';
import { getAppstoreAppVersion } from "react-native-appstore-version-checker";


     
class SplashScreen extends Component {
            constructor(props) {
                super(props)
                this.animatedWidth = new Animated.Value(0)
            }
        
            componentDidMount() {
                this.continueAPPRunning();

               // this.checkVersionStatus();
                   setTimeout(() => {


                    // this.props.navigation.push('LeftDrawer')
                }, 200);
            //  this.continueAPPRunning();
               
            }
            checkVersionStatus = () => {
                getAppstoreAppVersion("com.galaxyworldwide") //put any apps packageId here
                    .then(appVersion => {
                        console.log('app version_check_main::',appVersion , VersionCheck.getCurrentVersion())
                        if (appVersion != undefined && appVersion != null && appVersion != '') {
                            if (appVersion == VersionCheck.getCurrentVersion()) {
                                this.continueAPPRunning();
                            }
                            else if (appVersion > VersionCheck.getCurrentVersion()) {
                                console.log('play store verion is big')
                                Alert.alert(
                                    'New version available',
                                    'There is new version of this application available,click UPDATE to upgrade',
                                    [
                                        {
                                          text: 'Cancel',
                                          onPress: () => this.closeApp(),
                                          style: 'cancel',
                                        },
                                        {text: 'Update', onPress: () => this.openPlayStore()},
                                      ],
                                      {cancelable: false},
                                );
                            } else {
                                console.log('play store verion is small')
                            }
                        } else {
        
                        }
                        console.log("clashofclans android app version on playstore", appVersion);
                    })
                    .catch(err => {
                        console.log("error occurred", err);
                        AppConstance.showSnackbarMessage('Packag not found')
                    });
        
        
                // VersionCheck.getCountry()
                //     .then(country => console.log(country));          // KR
                // console.log('version : ', VersionCheck.getPackageName());        // com.reactnative.app
                // console.log('version : ', VersionCheck.getCurrentBuildNumber()); // 10
                // console.log('version : ', VersionCheck.getCurrentVersion());
        
                // VersionCheck.getLatestVersion({
                //     provider: 'playStore'  // for Android
                // })
                //     .then(latestVersion => {
                //         console.log('version play :', latestVersion);    // 0.1.2
                //     });
        
        
            }

            continueAPPRunning = ()=>{
               //4444
                // this.generateFCMToken();
                
                // NetInfo.addEventListener(
                //     'connectionChange',
                //     this._handleConnectivityChange
                // );
        
                try {
                    const granted = PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                    ).then((respons) => {
                        if (respons == PermissionsAndroid.RESULTS.GRANTED) {
                            this.continueAPp();
                            
                        } else {
                            BackHandler.exitApp();
                        }
                    })
                } catch (err) {
                    console.warn(err)
                }
            }
            openPlayStore = ()=>{
                //BackHandler.exitApp();
                Alert.alert(
                    'New version available',
                    'Please update app to new version to continue respoting',
                    [
                        {
                          text: 'Cancel',
                          onPress: () => this.closeApp(),
                          style: 'cancel',
                        },
                        {text: 'Update', onPress: () => this.openPlayStore()},
                      ],
                      {cancelable: false},
                );
                Linking.openURL("market://details?id=com.galaxyworldwide");
            }
            // generateFCMToken = () => {
            //     FCM.createNotificationChannel({
            //         id: 'default',
            //         name: 'Default',
            //         description: 'used for example',
            //         priority: 'high'
            //     })
            //     // 3333
            //     // registerAppListener(this.props.navigation);
        
        
            //     FCM.getInitialNotification().then(notif => {
            //         console.log('NOTTTTTTTTTTTIII ', notif)
        
            //         if (notif != undefined) {
            //             if (notif.type != undefined && notif.type != '') {
            //                 if (notif.type == 'V' || notif.type == 'v') {
            //                     this.setState({ isFindNotificationVehicleId: notif.vehicle_id })
            //                     this.props.navigation.push('NotificationVehicleDetailscreen', { 'vehicleObj': notif.vehicle_id })
            //                     return true;
            //                 } else if (notif.type == 'I' || notif.type == 'i') {
            //                     this.setState({ isInvoiceScreen: notif.invoice_id })
            //                     // this.props.navigation.push('NotificationInvoiceDetailsScreen', { 'invoceObj': notif.invoice_id })
            //                     //return true;
            //                 }
        
            //             }
            //         } else {
        
            //         }
        
            //     });
            //     try {
            //         let result = FCM.requestPermissions({
            //             badge: false,
            //             sound: true,
            //             alert: true
            //         });
            //     } catch (e) {
            //         console.error(e);
            //     }
        
            //     FCM.getFCMToken().then(token => {
            //         console.log("TOKEN (getFCMToken)", token);
            //         this.setState({ fireBaseToken: token || "" });
            //         // let deviceId = DeviceInfo.getDeviceId();
            //         // AppConstance.UDID = deviceId;
                 
            //         //  AsyncStorage.setItem(AppConstance.FCM_TOKEN, token)
            //         console.warn('Device Id :: ' + AppConstance.UDID)
            //     });
        
            //     if (Platform.OS === "ios") {
            //         FCM.getAPNSToken().then(token => {
            //             console.log("APNS TOKEN (getFCMToken)", token);
            //         });
            //     }
            //     //   FCM.removeAllDeliveredNotifications();

            //     //2222
            //     // registerKilledListener();
            // }  
            continueAPp = () => {
                this.setState({ writeStoragePermissin: true })
                setTimeout(() => {
                    // NetInfo.isConnected.fetch().done((isConnected) => {
                    //     if (isConnected == true) {
                            AsyncStorage.getItem(AppConstance.IS_USER_LOGIN).
                                then((value) => {
                                    if (value == '1') {
                                        AsyncStorage.getItem(AppConstance.USER_INFO_OBJ).
                                            then((value) => {
                                                console.warn('json value', value)
                                                if (value != null) {
                                                    let data = JSON.parse(value);
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
                                                   // this.props.navigation.goBack();
                                                    if (this.state.isFindNotificationVehicleId > 0) {
                                                        //66666
                                                        this.props.navigation.push('NotificationVehicleDetailscreen', { 'vehicleObj': this.state.isFindNotificationVehicleId })
                                                        this.props.navigation.push('LoginScreen', { 'vehicleObj': this.state.isFindNotificationVehicleId })
                                                    } else if (this.state.isInvoiceScreen > 0) {
                                                        ///7777
                                                        this.props.navigation.push('NotificationInvoiceDetailsScreen', { 'invoceObj': this.state.isInvoiceScreen })
                                                    }
                                                    else {
                                                    //5555
                                                        this.props.navigation.navigate('DashboardScreen')
                                                    }
        
                                                    // this.props.navigation.navigate('NoInternetConnectionFoundScreen')
                                                } else {
                                                    ///8888
                                                    //    this.props.navigation.navigate('LoginScreen')

                                                  //  this.switchToLoginScreen();
                                                }
                                            }).catch((error) => console.log(error))
                                    } else {
                                        ///999999
                                       this.props.navigation.navigate('LoginScreen')

                                    }
        
                                }).catch((error) => console.log(error))
                        // }
                        // else {
                        //     AppConstance.showSnackbarMessage(AppMessages.INTERNEt_NOT_FOUND)
                        // }
                    
                }, 3000)
            }

            // _handleConnectivityChange = (isConnected) => {
            //     if (isConnected == true) {
            //         this.setState({ isInternetNotFound: false })
            //     }
            //     else {
            //         this.setState({ isInternetNotFound: true })
            //     }
            // };
        
        
       
            render(){
                return(<Animated.View style={{ height:"100%", bottom: this.animatedWidth, flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center' }}>
                <Image source={require('../Images/logo_final.png')} style={{ width: 100, height: 100  }} resizeMode='stretch' />
            </Animated.View>)
            }
        }
    

        export default SplashScreen;































// import React, { Component } from 'react';
// import { View, Alert, TouchableOpacity, TextInput, Linking, Platform, Animated, Easing, Image, AsyncStorage, BackHandler, NetInfo, PermissionsAndroid } from 'react-native';

// import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
// import FCM, { FCMEvent, NotificationActionType, NotificationType } from "react-native-fcm";
// import { registerKilledListener, registerAppListener } from "../FirebaseController/Listeners";
// import VersionCheck from 'react-native-version-check';
// import { getAppstoreAppVersion } from "react-native-appstore-version-checker";


     
// class SplashScreen extends Component {
//             constructor(props) {
//                 super(props)
//                 this.animatedWidth = new Animated.Value(0)
//             }
        
//             componentDidMount() {
//                    setTimeout(() => {


//                     this.props.navigation.push('LeftDrawer')
//                 }, 200);
//             //  this.continueAPPRunning();
               
//             }
       
//             render(){
//                 return(<Animated.View style={{ height:"100%", bottom: this.animatedWidth, flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center' }}>
//                 <Image source={require('../Images/logo_final.png')} style={{ width: 100, height: 100  }} resizeMode='stretch' />
//             </Animated.View>)
//             }
//         }
    

//         export default SplashScreen;