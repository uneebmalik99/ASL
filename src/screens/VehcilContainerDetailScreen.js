import React, { Component } from 'react';
import { View, Text,ImageSlider, TouchableOpacity, StyleSheet, FlatList, Image,Modal, TextInput, ScrollView,  CameraRoll, Share, BackHandler } from 'react-native'

import Elavation from '../styles/Elavation';
import NetInfo from "@react-native-community/netinfo";
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import Toolbar from './Toolbar';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from './DialogLoder';
import renderIf from './renderif';
import { SliderBox } from "react-native-image-slider-box";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const images1 = [

    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
    // require('../Images/car_image1.jpg'),
    // require('../Images/car_image2.jpg'),
    // require('../Images/download.jpg'),
    // require('../Images/download1.jpg')
];

let vehicleObj = null;
let locationList = []
var baseImagePath = null;
var isCallingWithoutLogin = ''
var Exportdata = ''

let imageBasePath = null;


class VehcilContainerDetailScreen extends Component {
    constructor(props) {
        super(props);
        vehicleObj = this.props.navigation.state.params.vehicleObj;
        locationList = this.props.navigation.state.params.locationList;
        baseImagePath = this.props.navigation.state.params.baseImagePath;

        if (vehicleObj != undefined) {
            isCallingWithoutLogin = this.props.navigation.state.params.isCallingWithoutLogin
        } else {
            vehicleObj = ''
        }
        

        this.state = {

            exortList: [

            ],
        
            imagesq: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree",
               // require('./assets/images/girl.jpg'),
              ],

              Exportdata,
              img:false,
            isLoading: false,
            tabIndex: 0,
            V_cr:false,
            V_PDF:false,
            V_VEHICLEDETAIL:true,
            V_Export:false,
            isInternetNotConnected: false,
            images: [],
            imageSLiderPos: 0,
            isConnected:true,


            vehicleDetail: [
                {
                     'tabTitle': 'VEHICLE DETAILS',
                     'customerName': 'Johny Deep',
                 'buyerNo': '123',
                     'vehicleLocation': 'London',
                     'lotNo': 'abcd',
                     'year': '2018',
                    'make': 'Toyota',
                    'model': 'Camry',
                    'vin': '123',
                    'keys': 'abcdef',
                     'towing_titles': 'no',
                 'towingDate': '23-3-2019',
                     'deliveredDate': '25-3-2019',
                     'towLocation': 'London',
                     'towAmount': '$ 200',
                     'storage': 'high',
                     'titleType': 'Good Car',
                     'titleStatus': 'on going',
                     'titleAmount': '$100',
                     'titleNo': '12',
                     'titleState': 'Testing',
                 }, {
                     'tabTitle': 'CR',
                     'frontWindshiled': 'Damage',
                    'bonnet': 'Broken',
                    'grill': 'Torn',
                     'frontBumper': 'Damage',
                     'frontHeadLight': 'Broken',
                    'rearWindshield': 'Broken',
                     'trunkDoor': 'Broken',
                     'rearBumper': 'Good',
                     'rearBumperSupport': 'Good',
                     'tailLamp': 'Good',
                    'frontLeftFendar': 'Good',
                 'leftFrontDoor': 'Broken',
                     'leftRearDoor': 'Broken',
                     'leftRearFender': 'Broken',
                     'pillar': 'Good',
                     'roof': 'Dent & Scratches',
                     'rightRearFinder': 'Broken',
                     'rightRearDoor': 'Broken',
                     'rightFrontDoor': 'Broken',
                     'frontRightFender': 'Broken',
                     'frontTyres': 'Torn'
                 }, {
                     'tabTitle': 'EXPORT',
                     'status': 'MANIFEST OR SHIPPED',
                     'lodedForm': 'LOCAITON OF VEHICLE LIKE GA, NJ, TX, LA ETC',
                    'exportDate': 'SAME EXPORT DATE FROM SYSTEM',
                     'eta': 'SAME ETA FROM SYSTEM',
                     'bookingNo': 'SAME BOOKING NO FROM SYSTEM',
                     'containerNo': 'CONTAINER NUMBER FORM SYSTEM',
                    'size': 'CONTAINER SIZE',
                    'arNo': 'AR NUMBER',
                 'destination': 'LIKE,JEBEL ALI, SHARJAH, OMAN ETC'
                }
            ],

            
            vehicleDetail: [
                {
                     'tabTitle': 'VEHICLE DETAILS',
                     'customerName': 'Johny Deep',
                 'buyerNo': '123',
                     'vehicleLocation': 'London',
                     'lotNo': 'abcd',
                     'year': '2018',
                    'make': 'Toyota',
                    'model': 'Camry',
                    'vin': '123',
                    'keys': 'abcdef',
                     'towing_titles': 'no',
                 'towingDate': '23-3-2019',
                     'deliveredDate': '25-3-2019',
                     'towLocation': 'London',
                     'towAmount': '$ 200',
                     'storage': 'high',
                     'titleType': 'Good Car',
                     'titleStatus': 'on going',
                     'titleAmount': '$100',
                     'titleNo': '12',
                     'titleState': 'Testing',
                 }, {
                     'tabTitle': 'CR',
                     'frontWindshiled': 'Damage',
                    'bonnet': 'Broken',
                    'grill': 'Torn',
                     'frontBumper': 'Damage',
                     'frontHeadLight': 'Broken',
                    'rearWindshield': 'Broken',
                     'trunkDoor': 'Broken',
                     'rearBumper': 'Good',
                     'rearBumperSupport': 'Good',
                     'tailLamp': 'Good',
                    'frontLeftFendar': 'Good',
                 'leftFrontDoor': 'Broken',
                     'leftRearDoor': 'Broken',
                     'leftRearFender': 'Broken',
                     'pillar': 'Good',
                     'roof': 'Dent & Scratches',
                     'rightRearFinder': 'Broken',
                     'rightRearDoor': 'Broken',
                     'rightFrontDoor': 'Broken',
                     'frontRightFender': 'Broken',
                     'frontTyres': 'Torn'
                 }, {
                     'tabTitle': 'EXPORT',
                     'status': 'MANIFEST OR SHIPPED',
                     'lodedForm': 'LOCAITON OF VEHICLE LIKE GA, NJ, TX, LA ETC',
                    'exportDate': 'SAME EXPORT DATE FROM SYSTEM',
                     'eta': 'SAME ETA FROM SYSTEM',
                     'bookingNo': 'SAME BOOKING NO FROM SYSTEM',
                     'containerNo': 'CONTAINER NUMBER FORM SYSTEM',
                    'size': 'CONTAINER SIZE',
                    'arNo': 'AR NUMBER',
                 'destination': 'LIKE,JEBEL ALI, SHARJAH, OMAN ETC'
                }
            ]
        }


    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.callingExportApin()
      if(this.state.images.length > 0)
{
    this.setState({ logo:false})
}      
                this.setState({ isLoading: true, images: [] })
                if (vehicleObj != undefined) {
                    this.callingVehicleDetailApi()
                    console.log('Vehicle sdasdasdasd', vehicleObj)
                    if (vehicleObj != undefined && vehicleObj.images != undefined) {
                        for (let index = 0; index < vehicleObj.images.length; index++) {
                            const element = vehicleObj.images[index];
                            this.state.images.push(baseImagePath + element.thumbnail)
                            console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
                        }
                        this.setState({ images: this.state.images })
                    }
                }
            
           
        

    }

    

    //check internet connection
   
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }


    // callingVehicleDetailApi = () => {
    //     if (isCallingWithoutLogin) {
    //         console.log('detail view wvehicl  IF ', AppUrlCollection.VEHICLE_TRACKING_DETAIL + '?id=' + vehicleObj.id)
    //         fetch(AppUrlCollection.VEHICLE_TRACKING_DETAIL + 'id=' + vehicleObj.id, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //             .then((response) => response.json())
    //             .then((responseJson) => {
    //                 console.log('Testing dsadaa ',responseJson)
    //                 this.setState({ isLoading: false })
    //                 //   this.setState({ vehicleList: responseJson.data.vehicle_details })
    //                 if (responseJson.status == AppConstance.API_SUCESSCODE) {
    //                     let vehicleDetailObj = responseJson.data.vehicle;
    //                     //console.log('Loation testing list ::' , vehicleDetailObj)
    //                     this.setState({ images: [] })
    //                     for (let index = 0; index < vehicleDetailObj.images.length; index++) {
    //                         const element = vehicleDetailObj.images[index];
    //                         this.state.images.push(baseImagePath + element.thumbnail)
    //                         console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
    //                     }
    //                     this.setState({ images: this.state.images })

    //                     let locationName = locationList.find((locationObj) => locationObj.id == vehicleDetailObj.location)
    //                     let vehicleDetail = [
    //                         {
    //                             'tabTitle': 'VEHICLE',
    //                             'customerName': 'Johny Deep',
    //                         'buyerNo': '123',
    //                             'vehicleLocation': 'London',
    //                             'lotNo': 'abcd',
    //                             'year': '2018',
    //                            'make': 'Toyota',
    //                            'model': 'Camry',
    //                            'vin': '123',
    //                            'keys': 'abcdef',
    //                             'towing_titles': 'no',
    //                         'towingDate': '23-3-2019',
    //                             'deliveredDate': '25-3-2019',
    //                             'towLocation': 'London',
    //                             'towAmount': '$ 200',
    //                             'storage': 'high',
    //                             'titleType': 'Good Car',
    //                             'titleStatus': 'on going',
    //                             'titleAmount': '$100',
    //                             'titleNo': '12',
    //                             'titleState': 'Testing',
    //                         }, {
    //                             'tabTitle': 'CR',
    //                             'frontWindshiled': 'Damage',
    //                            'bonnet': 'Broken',
    //                            'grill': 'Torn',
    //                             'frontBumper': 'Damage',
    //                             'frontHeadLight': 'Broken',
    //                            'rearWindshield': 'Broken',
    //                             'trunkDoor': 'Broken',
    //                             'rearBumper': 'Good',
    //                             'rearBumperSupport': 'Good',
    //                             'tailLamp': 'Good',
    //                            'frontLeftFendar': 'Good',
    //                         'leftFrontDoor': 'Broken',
    //                             'leftRearDoor': 'Broken',
    //                             'leftRearFender': 'Broken',
    //                             'pillar': 'Good',
    //                             'roof': 'Dent & Scratches',
    //                             'rightRearFinder': 'Broken',
    //                             'rightRearDoor': 'Broken',
    //                             'rightFrontDoor': 'Broken',
    //                             'frontRightFender': 'Broken',
    //                             'frontTyres': 'Torn'
    //                         }, {
    //                             'tabTitle': 'EXPORT',
    //                             'status': 'MANIFEST OR SHIPPED',
    //                             'lodedForm': 'LOCAITON OF VEHICLE LIKE GA, NJ, TX, LA ETC',
    //                            'exportDate': 'SAME EXPORT DATE FROM SYSTEM',
    //                             'eta': 'SAME ETA FROM SYSTEM',
    //                             'bookingNo': 'SAME BOOKING NO FROM SYSTEM',
    //                             'containerNo': 'CONTAINER NUMBER FORM SYSTEM',
    //                            'size': 'CONTAINER SIZE',
    //                            'arNo': 'AR NUMBER',
    //                         'destination': 'LIKE,JEBEL ALI, SHARJAH, OMAN ETC'
    //                        }
    //                     ]
    //                     this.setState({ locationList: responseJson.data, vehicleDetail: vehicleDetail })
    //                 } else {
    //                     AppConstance.showSnackbarMessage(responseJson.message)
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.warn(error)
    //             });
    //     } else {
    //         console.log('detail view wvehicl  ELSE ', AppUrlCollection.VEHICLE_DETAIL + '?id=' + vehicleObj.id)
    //         fetch(AppUrlCollection.VEHICLE_DETAIL + '?id=' + vehicleObj.id, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'authkey': AppConstance.USER_INFO.USER_TOKEN
    //             },
    //         })
    //             .then((response) => response.json())
    //             .then((responseJson) => {
    //                 console.log(responseJson)
    //                 this.setState({ isLoading: false })
    //               this.setState({ vehicleList: responseJson.data.vehicle_details })
    //                 if (responseJson.status == AppConstance.API_SUCESSCODE) {
    //                     let vehicleDetailObj = responseJson.data.vehicle;
    //                     console.log('Loation testing list ::', vehicleDetailObj)
    //                     this.setState({ images: [] })
    //                     for (let index = 0; index < vehicleDetailObj.images.length; index++) {
    //                         const element = vehicleDetailObj.images[index];
    //                         this.state.images.push(baseImagePath + element.thumbnail)
    //                         console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
    //                     }
    //                     this.setState({ images: this.state.images })
    //                     let locationName = locationList.find((locationObj) => locationObj.id == vehicleDetailObj.location)
    //                     let vehicleDetail = [
    //                         {
    //                             'tabTitle': 'VEHICLE DETAILS',
    //                             'customerName': 'Johny Deep',
    //                         'buyerNo': '123',
    //                             'vehicleLocation': 'London',
    //                             'lotNo': 'abcd',
    //                             'year': '2018',
    //                            'make': 'Toyota',
    //                            'model': 'Camry',
    //                            'vin': '123',
    //                            'keys': 'abcdef',
    //                             'towing_titles': 'no',
    //                         'towingDate': '23-3-2019',
    //                             'deliveredDate': '25-3-2019',
    //                             'towLocation': 'London',
    //                             'towAmount': '$ 200',
    //                             'storage': 'high',
    //                             'titleType': 'Good Car',
    //                             'titleStatus': 'on going',
    //                             'titleAmount': '$100',
    //                             'titleNo': '12',
    //                             'titleState': 'Testing',
    //                         }, 
    //                         // {
    //                         //     'tabTitle': 'CR',
    //                         //     'frontWindshiled': 'Damage',
    //                         //    'bonnet': 'Broken',
    //                         //    'grill': 'Torn',
    //                         //     'frontBumper': 'Damage',
    //                         //     'frontHeadLight': 'Broken',
    //                         //    'rearWindshield': 'Broken',
    //                         //     'trunkDoor': 'Broken',
    //                         //     'rearBumper': 'Good',
    //                         //     'rearBumperSupport': 'Good',
    //                         //     'tailLamp': 'Good',
    //                         //    'frontLeftFendar': 'Good',
    //                         // 'leftFrontDoor': 'Broken',
    //                         //     'leftRearDoor': 'Broken',
    //                         //     'leftRearFender': 'Broken',
    //                         //     'pillar': 'Good',
    //                         //     'roof': 'Dent & Scratches',
    //                         //     'rightRearFinder': 'Broken',
    //                         //     'rightRearDoor': 'Broken',
    //                         //     'rightFrontDoor': 'Broken',
    //                         //     'frontRightFender': 'Broken',
    //                         //     'frontTyres': 'Torn'
    //                         // }, {
    //                          {   'tabTitle': 'EXPORT',
    //                             'status': 'MANIFEST OR SHIPPED',
    //                             'lodedForm': 'LOCAITON OF VEHICLE LIKE GA, NJ, TX, LA ETC',
    //                            'exportDate': 'SAME EXPORT DATE FROM SYSTEM',
    //                             'eta': 'SAME ETA FROM SYSTEM',
    //                             'bookingNo': 'SAME BOOKING NO FROM SYSTEM',
    //                             'containerNo': 'CONTAINER NUMBER FORM SYSTEM',
    //                            'size': 'CONTAINER SIZE',
    //                            'arNo': 'AR NUMBER',
    //                         'destination': 'LIKE,JEBEL ALI, SHARJAH, OMAN ETC'
    //                        }
    //                     ]
    //                     this.setState({ locationList: responseJson.data, vehicleDetail: vehicleDetail })
    //                 } else {
    //                     AppConstance.showSnackbarMessage(responseJson.message)
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.warn(error)
    //             });
    //     }



    // }


  callingExportApin=() =>{
    fetch(AppUrlCollection.EXPORT_LIST, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ isLoding: false })
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                imageBasePath = responseJson.data.other.export_image
                console.log('image da ', responseJson)
                this.setState({ exortList: responseJson.data.export })

            } else {
                AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
            console.warn(error)
        });
  }















    callingVehicleDetailApi = () => {
        if (isCallingWithoutLogin) {
            console.log('detail view wvehicl  IF ', AppUrlCollection.VEHICLE_TRACKING_DETAIL + '?id=' + vehicleObj.id)
            fetch(AppUrlCollection.VEHICLE_TRACKING_DETAIL + 'id=' + vehicleObj.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('Testing dsadaa ',responseJson)
                    this.setState({ isLoading: false })
                    //   this.setState({ vehicleList: responseJson.data.vehicle_details })
                    if (responseJson.status == AppConstance.API_SUCESSCODE) {
                        let vehicleDetailObj = responseJson.data.vehicle;
                        //console.log('Loation testing list ::' , vehicleDetailObj)
                        this.setState({ images: [] })
                        for (let index = 0; index < vehicleDetailObj.images.length; index++) {
                            const element = vehicleDetailObj.images[index];
                            this.state.images.push(baseImagePath + element.thumbnail)
                            console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
                        }
                        this.setState({ images: this.state.images })

                        let locationName = locationList.find((locationObj) => locationObj.id == vehicleDetailObj.location)
                        let vehicleDetail = [
                            {
                                'tabTitle': 'VEHICLE',
                                'customerName': 'Johny Deep',
                            'buyerNo': '123',
                                'vehicleLocation': 'London',
                                'lotNo': 'abcd',
                                'year': '2018',
                               'make': 'Toyota',
                               'model': 'Camry',
                               'vin': '123',
                               'keys': 'abcdef',
                                'towing_titles': 'no',
                            'towingDate': '23-3-2019',
                                'deliveredDate': '25-3-2019',
                                'towLocation': 'London',
                                'towAmount': '$ 200',
                                'storage': 'high',
                                'titleType': 'Good Car',
                                'titleStatus': 'on going',
                                'titleAmount': '$100',
                                'titleNo': '12',
                                'titleState': 'Testing',
                            }, {
                                'tabTitle': 'CR',
                                'frontWindshiled': 'Damage',
                               'bonnet': 'Broken',
                               'grill': 'Torn',
                                'frontBumper': 'Damage',
                                'frontHeadLight': 'Broken',
                               'rearWindshield': 'Broken',
                                'trunkDoor': 'Broken',
                                'rearBumper': 'Good',
                                'rearBumperSupport': 'Good',
                                'tailLamp': 'Good',
                               'frontLeftFendar': 'Good',
                            'leftFrontDoor': 'Broken',
                                'leftRearDoor': 'Broken',
                                'leftRearFender': 'Broken',
                                'pillar': 'Good',
                                'roof': 'Dent & Scratches',
                                'rightRearFinder': 'Broken',
                                'rightRearDoor': 'Broken',
                                'rightFrontDoor': 'Broken',
                                'frontRightFender': 'Broken',
                                'frontTyres': 'Torn'
                            }, {
                                'tabTitle': 'EXPORT',
                                'status': 'MANIFEST OR SHIPPED',
                                'lodedForm': 'LOCAITON OF VEHICLE LIKE GA, NJ, TX, LA ETC',
                               'exportDate': 'SAME EXPORT DATE FROM SYSTEM',
                                'eta': 'SAME ETA FROM SYSTEM',
                                'bookingNo': 'SAME BOOKING NO FROM SYSTEM',
                                'containerNo': 'CONTAINER NUMBER FORM SYSTEM',
                               'size': 'CONTAINER SIZE',
                               'arNo': 'AR NUMBER',
                            'destination': 'LIKE,JEBEL ALI, SHARJAH, OMAN ETC'
                           }
                        ]
                        this.setState({ locationList: responseJson.data, vehicleDetail: vehicleDetail })
                    } else {
                        AppConstance.showSnackbarMessage(responseJson.message)
                    }
                })
                .catch((error) => {
                    console.warn(error)
                });
        } else {
            console.log('detail view wvehicl  ELSE ', AppUrlCollection.VEHICLE_DETAIL + '?id=' + vehicleObj.id)
            fetch(AppUrlCollection.VEHICLE_DETAIL + '?id=' + vehicleObj.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authkey': AppConstance.USER_INFO.USER_TOKEN
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.setState({ isLoading: false })
                  this.setState({ vehicleList: responseJson.data.vehicle_details })
                    if (responseJson.status == AppConstance.API_SUCESSCODE) {
                        let vehicleDetailObj = responseJson.data.vehicle;
                        console.log('Loation testing list ::', vehicleDetailObj)
                        this.setState({ images: [] })
                        for (let index = 0; index < vehicleDetailObj.images.length; index++) {
                            const element = vehicleDetailObj.images[index];
                            this.state.images.push(baseImagePath + element.thumbnail)
                            console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
                        }
                        this.setState({ images: this.state.images })
                        let locationName = locationList.find((locationObj) => locationObj.id == vehicleDetailObj.location)
                        let vehicleDetail = [
                            {
                                'tabTitle': 'VEHICLE DETAILS',
                                'customerName': 'Johny Deep',
                            'buyerNo': '123',
                                'vehicleLocation': 'London',
                                'lotNo': 'abcd',
                                'year': '2018',
                               'make': 'Toyota',
                               'model': 'Camry',
                               'vin': '123',
                               'keys': 'abcdef',
                                'towing_titles': 'no',
                            'towingDate': '23-3-2019',
                                'deliveredDate': '25-3-2019',
                                'towLocation': 'London',
                                'towAmount': '$ 200',
                                'storage': 'high',
                                'titleType': 'Good Car',
                                'titleStatus': 'on going',
                                'titleAmount': '$100',
                                'titleNo': '12',
                                'titleState': 'Testing',
                            }, 
                            // {
                            //     'tabTitle': 'CR',
                            //     'frontWindshiled': 'Damage',
                            //    'bonnet': 'Broken',
                            //    'grill': 'Torn',
                            //     'frontBumper': 'Damage',
                            //     'frontHeadLight': 'Broken',
                            //    'rearWindshield': 'Broken',
                            //     'trunkDoor': 'Broken',
                            //     'rearBumper': 'Good',
                            //     'rearBumperSupport': 'Good',
                            //     'tailLamp': 'Good',
                            //    'frontLeftFendar': 'Good',
                            // 'leftFrontDoor': 'Broken',
                            //     'leftRearDoor': 'Broken',
                            //     'leftRearFender': 'Broken',
                            //     'pillar': 'Good',
                            //     'roof': 'Dent & Scratches',
                            //     'rightRearFinder': 'Broken',
                            //     'rightRearDoor': 'Broken',
                            //     'rightFrontDoor': 'Broken',
                            //     'frontRightFender': 'Broken',
                            //     'frontTyres': 'Torn'
                            // }, {
                             {   'tabTitle': 'EXPORT',
                                'status': 'MANIFEST OR SHIPPED',
                                'lodedForm': 'LOCAITON OF VEHICLE LIKE GA, NJ, TX, LA ETC',
                               'exportDate': 'SAME EXPORT DATE FROM SYSTEM',
                                'eta': 'SAME ETA FROM SYSTEM',
                                'bookingNo': 'SAME BOOKING NO FROM SYSTEM',
                                'containerNo': 'CONTAINER NUMBER FORM SYSTEM',
                               'size': 'CONTAINER SIZE',
                               'arNo': 'AR NUMBER',
                            'destination': 'LIKE,JEBEL ALI, SHARJAH, OMAN ETC'
                           }
                        ]
                        this.setState({ locationList: responseJson.data, vehicleDetail: vehicleDetail })
                    } else {
                        AppConstance.showSnackbarMessage(responseJson.message)
                    }
                })
                .catch((error) => {
                    console.warn(error)
                });
        }



    }

  

    renderVehicleDetail = ({ item, index }) => {
        if (this.state.V_VEHICLEDETAIL == true) {
            // {renderIf(this.state.V_VEHICLEDETAIL)(
               return <View

            >
             
                <Text style={styles.appDetailTitle}>{item.tabTitle}</Text>

             <Elavation
                 elevation={4}
                     style={{ width: deviceWidth * 0.95, backgroundColor: AppColors.white, marginBottom: 7, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, borderRadius: 10, padding: 10 }}
                 >
                     <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                         <View style={styles.detailMainViewStyle}>
                             <Text style={styles.detailHeadingTxtStyle}> Vehicle : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.vehicle}</Text>
                        </View>


                         <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Color : </Text>
                           <Text style={styles.detailValueTxtStyle}>{item.color}</Text>
                     </View>

          

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Make : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.make}</Text>
</View>


<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>model : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.model}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>keys : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.keys}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Towing Titles : </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towing_titles}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>towing date </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towingDate}</Text>
</View>


<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Delivered date</Text>
  <Text style={styles.detailValueTxtStyle}>{item.deliveredDate}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Tow Location </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towLocation}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Tow Amount  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.towAmount}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Storage </Text>
  <Text style={styles.detailValueTxtStyle}>{item.storage}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}> Title Type   </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleType}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Title status   </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleStatus}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Title Amount  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleAmount}</Text>
</View>

<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}> Title no.  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleNo}</Text>
</View>
<View style={styles.detailMainViewStyle}>
   <Text style={styles.detailHeadingTxtStyle}>Title State  </Text>
  <Text style={styles.detailValueTxtStyle}>{item.titleState}</Text>
</View>

                         <View style={styles.detailMainViewStyle}>
                             <Text style={styles.detailHeadingTxtStyle}>Location : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.vehicleLocation}</Text>
                         </View>


                         <View style={styles.detailMainViewStyle}>
                         <Text style={styles.detailHeadingTxtStyle}>Lot NO : </Text>
                             <Text style={styles.detailValueTxtStyle}>{item.lotNo}</Text>
                       </View>



                         <View style={styles.detailMainViewStyle}>
                         <Text style={styles.detailHeadingTxtStyle}>Vin : </Text>
                             <Text style={styles.detailValueTxtStyle}>{item.vin}</Text>
                         </View>


                         <View style={styles.detailMainViewStyle}>
                             <Text style={styles.detailHeadingTxtStyle}>Keys : </Text>
                             <Text style={styles.detailValueTxtStyle}>{item.keys}</Text>
                     </View>
                     </View>
                 </Elavation>
         </View>
          
          // )}
    } 
//     else  if (renderIf(this.state.V_VEHICLEDETAIL)
//         ) {
//             // return <View>

//             // <Text style={styles.appDetailTitle}>{item.tabTitle}</Text>
//             // <Elavation
//             //        elevation={4}
//             //        style={styles.dataChildViewElavationContainer}
//             //    >
//             //         <View style={{ paddingLeft: 10, paddingRight: 10 }}>
//             //         <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>frontwindshield </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.frontWindshiled}</Text>
//             //           </View>
//             //           <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>bonet </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.bonnet}</Text>
//             //           </View>
//             //           <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>grill</Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.grill}</Text>
//             //           </View>

   
//             //         <View style={styles.detailMainViewStyle}>
//             //             <Text style={styles.detailHeadingTxtStyle}>front bumper </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.frontBumper}</Text>
//             //           </View>


//             //             <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>front HeadeLight </Text>
//             //             <Text style={styles.detailValueTxtStyle}>{item.fromHeadLight}</Text>
//             //            </View>
                      

//             //             <View style={styles.detailMainViewStyle}>
//             //                 <Text style={styles.detailHeadingTxtStyle}>Rear WindShield </Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rearWindshield}</Text>
//             //         </View>


//             //         <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>trunk Door </Text>
//             //                <Text style={styles.detailValueTxtStyle}>{item.trunkDoor}</Text>
//             //             </View>


//             //     <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>rear Bumper</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rearBumper}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>rear Bumper Support</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rearBumperSupport}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>tail lamp</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.tailLamp}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Front Left Fendar</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.frontLeftFendar}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Left Front Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.leftFrontDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Left Rear Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.leftRearDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Left Rear Fender</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.leftRearFender}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>Pillar</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.pillar}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>roof</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.roof}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>right Rear Finder</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rightRearFinder}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>right Rear Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rightRearDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>right Front Door</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.rightFrontDoor}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>front Right Fender</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.frontRightFender}</Text>
//             //        </View>
//             //        <View style={styles.detailMainViewStyle}>
//             //                <Text style={styles.detailHeadingTxtStyle}>front tyres</Text>
//             //                 <Text style={styles.detailValueTxtStyle}>{item.frontTyres}</Text>
//             //        </View>


//             //         </View>
//             //    </Elavation>
//             // </View>
   
// } else if (index == 2) { 
//     }else{
//         alert('hj');
  //  }
    }

    switchTabWithScoll = (tabIndex, tabTitle) => {
        let scrollIndex = 0;
        for (let index = 0; index < this.state.vehicleDetail.length; index++) {
            const element = this.state.vehicleDetail[index];
            console.log('tabIndex id ', tabTitle.toUpperCase() + ' == ' + element.tabTitle.toUpperCase())
            if (tabIndex == 0 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 0 })
                break;
            } else if (tabIndex == 1 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 1 })
                break;
            } else if (tabIndex == 2 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 2 })
                break;
            } else if (tabIndex == 3 && tabTitle.toUpperCase() == element.tabTitle.toUpperCase()) {
                scrollIndex = index;
                this.setState({ tabIndex: 3 })
                break;
            }
        }
        setTimeout(() => this.refs.flatList.scrollToIndex({ animated: true, index: scrollIndex }));
    }


    saveImageFromLocal = () => {
        Share.share({
            message: this.state.images[this.state.imageSLiderPos],
            url: this.state.images[this.state.imageSLiderPos], // add image array 
            title: 'Galaxy APP' // add link 
        }, {
                // Android only:
                dialogTitle: 'Share BAM goodness',
                // iOS only:
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            })
        // CameraRoll.saveToCameraRoll(this.state.images[0], 'photo')
    }

    scrollFlatList = (e) => {
        let offset = e.nativeEvent.contentOffset.y;
        let index = parseInt(offset / 300);   // your cell height
        this.setState({ tabIndex: index })
         if (index == 3) {
            this.refs.headingScrollView.scrollToEnd({ animated: true });
         } else if (index == 1 || index == 2) {
         this.refs.headingScrollView.scrollTo({ x: 0, y: 0, animated: true })
         }
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                {/* <Image source={require('../Images/backgroundimage4.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 0.49, position: 'absolute' }} /> */}
             
                <DialogLoader loading={this.state.isLoading} />


                <View    style={{ 
              height:50,
          backgroundColor:AppColors.Headercolor,
  
          
          
          }}
    >       

<TouchableOpacity style={{position: 'absolute',
         
         justifyContent:"flex-start",
         marginLeft:5
     }  
         }
         //onPress={() => this.props.navigation.navigate('LeftSideBar')}      
               >

        
              <Image source={ require('../Images/logo_final.png')} 
         style={{ width:50, height:50, alignSelf: 'center', }} resizeMode='contain'
        />
          </TouchableOpacity>
   <View 
      style={{
          alignSelf:'center',

justifyContent:"center",
alignSelf:"center",
marginTop:13
      }}
   >
       <Image 
style={{width:25,height:25}}
       source={require('../Images/home-icon-23.png')}
       />
   </View>
   <TouchableOpacity style={{paddingHorizontal:10,marginTop:10, position: 'absolute',alignSelf:"flex-end", alignContent:"flex-end", justifyContent:"flex-end",alignItems:"flex-end",
            }  
            }
            onPress={() => this.props.navigation.navigate('RightDrawer')}            >

           
                 <Image source={ require('../Images/some_icon.png')} 
            style={{ width: 26, height:26, }} 
           />
             </TouchableOpacity>

    </View>


<View style={ {justifyContent:"center", paddingVertical:10, borderTopWidth:0.5, borderTopColor:'black',  backgroundColor:AppColors.Headercolor,  flexDirection:'row'}}>

<Text style={{fontSize:12, marginLeft:5, color:AppColors.Signincolor}}>
    {vehicleObj.year}
</Text>
<Text style={{fontSize:12, marginLeft:15 ,color:AppColors.Signincolor}}>

    {vehicleObj.make +"  "+ vehicleObj.model}
</Text>



</View>

                 {/* <View style={{ width: deviceWidth, height: 50, flexDirection: 'row', backgroundColor: AppColors.toolbarColor, alignContent: 'center', alignItems: 'center' }}>
                 
                    <Text style={{ fontFamily: AppFonts.SourceSansProBold, color: AppColors.white, fontSize: 17, flex: 1, textAlignVertical: 'center', textAlign: 'center' }}>Vehicle Detail</Text>
                    <View style={{ width: 30, height: 1 }} />
                </View>  */}

{/* {alert(this.state.images.length)} */}
{/* {this.state.images.length > 0 ? */}

{/* {renderIf(this.state.img)( */}

    {this.state.images.length > 0 ? (
        <View style={{width:"100%"}}
>
<SliderBox 
          images={this.state.images}
          sliderBoxHeight={undefined}
          dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 13,
    height: 13,
    borderRadius: 15,
    marginHorizontal: -6,
    padding: 0,
    margin: 0
  }}
          resizeMethod={'resize'}  
          resizeMode={'cover'}
          autoplay
  circleLoop
          onCurrentImagePressed={index =>
            console.warn(`image ${index} pressed`)
          }
        />
</View>

      ) : (

          <View style={{width:"100%", position:'relative', height:225}}>
          <Image source={ require('../Images/logo_final.png')} 
         style={{  alignSelf: 'center', }} resizeMode='cover'
        />
      
       </View>
      )}


{/* //)}; */}


{/* <View> */}
    
{/* <ScrollView
pagingEnabled 
horizontal
showsVerticalScrollIndicator={false}
 style={{width:deviceWidth, height:"30%"}}
>
{
    images1.map((image, index) => ( */}
        
        {/* <Image 

            key={index}
            source={{uri: image}}
            style={{width:deviceWidth,height:"30%", resizeMode:'cover'}}
        />
            
 

    )) */}
{/* }



</ScrollView> */}
       {/* <View
        style={{flexDirection:'row',position:'absolute',bottom:0,alignSelf:'center'}} >

        </View>

</View> */}


                {/* {this.state.images.length > 0 ? <TouchableOpacity style={{ height: '45%', width: '100%' }}>
                    {console.log('Img Slider ', this.state.images)}
                    <Image
                        style={{ borderTopWidth:0.4, borderRightWidth:0.4, borderLeftWidth:0.4,borderColor:'black', flex: 1, width: '100%', height: '45%', }}
                        source={{ uri: this.state.images[0] }}
                        resizeMode='stretch'
                    />
                     <ImageSlider
                        loopBothSides
                        style={{ flex: 1, height: '30%', }}
                        autoPlayWithInterval={3000}
                        images={this.state.images}
                        onPositionChanged={(position) => this.setState({ imageSLiderPos: position })}
                        customSlide={({ index, item, style, width }) => (
                            // It's important to put style here because it's got offset inside
                            <View key={index} style={[style, { width: deviceWidth, flex: 1, backgroundColor: 'black' }]}>
                                <Image source={{ uri: item }} style={{ width: undefined, height: undefined, flex: 1 }} resizeMode='cover' />
                            </View>
                        )}
                        customButtons={(position, move) => (
                            <View style={{ position: 'absolute', flexDirection: 'row', height: 50, width: deviceWidth, bottom: 0, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: -10 }}>

                                {this.state.images.map((image, index) => {
                                    return (
                                        <View style={{ backgroundColor: position == index ? AppColors.toolbarColor : 'white', height: 8, width: 8, marginRight: 5, borderRadius: 5 }} />
                                    );
                                })}
                            </View>
                        )}
                    />
                    {this.state.images.length > 0 ? <TouchableOpacity style={{
                        right: 0, marginBottom: 10, marginRight: 10,
                        position: 'absolute', marginLeft: 8,
                        width: 40, height: 40, borderRadius: 40,
                        borderColor: AppColors.toolbarColor, borderWidth: 1, justifyContent: 'center',
                        alignContent: 'center', alignItems: 'center', bottom: 0,
                    }}
                        onPress={() => this.saveImageFromLocal()}
                    >
                        <MaterialCommunityIcons name='share-variant' color={AppColors.toolbarColor} size={20} />
                    </TouchableOpacity> : null} 

                </TouchableOpacity> : <View style={{ height: '30%' }}>
                        <Image source={require('../Images/logo_final.png')} style={{ width: deviceWidth, height: 150 }} resizeMode='cover' />
                    </View>} */}












                {vehicleObj != undefined && vehicleObj != '' ?
                    <View style={{ flex: 1 }}>
                
                    
                        <View style={{ flex: 1 }}>

                        
                            <View style={{ height: 53 }}>
                              
                                    <View style={{borderColor:'black',borderWidth:0.7, paddingHorizontal:7, paddingVertical:7, flex: 1, height: 50, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#d4eeeb' }}>
                                        <TouchableOpacity
                                            style={{ paddingHorizontal:18, borderRadius:20,borderWidth:1,borderColor:'black', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:'white' }}
                                            // onPress={() => this.switchTabWithScoll(0, 'Vehicle Details')}

                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:true});   this.setState({V_cr:false});  this.setState({V_Export:false}); this.setState({V_PDF:false}); }}

                                        >
                                            <Text style={styles.tabHeadingTxt}>VEHICLE</Text>
                                            {/* {this.state.tabIndex == 0 ? <View style={styles.tabDividerStyle} /> : null} */}

                                        </TouchableOpacity>



                                        <TouchableOpacity
                                            style={{ marginLeft:3, paddingHorizontal:22, borderRadius:20,borderWidth:1,borderColor:'black', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:'white' }}
                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:false});   this.setState({V_cr:true});  this.setState({V_Export:false}); this.setState({V_PDF:false}); }}
                                        >
                                            <Text style={styles.tabHeadingTxt}>CR</Text>
                                            {/* {this.state.tabIndex == 1 ? <View style={styles.tabDividerStyle} /> : null} */}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ marginLeft:3, paddingHorizontal:20, borderRadius:20,borderWidth:1,borderColor:'black', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:'white' }}
                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:false});   this.setState({V_cr:false});  this.setState({V_Export:true}); this.setState({V_PDF:false}); }}
                                        >
                                            <Text style={styles.tabHeadingTxt}>EXPORT</Text>
                                            {/* {this.state.tabIndex == 2 ? <View style={styles.tabDividerStyle} /> : null} */}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ marginLeft:3, paddingHorizontal:20, borderRadius:20,borderWidth:1,borderColor:'black', justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor:'white' }}
                                            onPress={() => {  this.setState({V_VEHICLEDETAIL:false});   this.setState({V_cr:false});  this.setState({V_Export:false}); this.setState({V_PDF:true}); }}
                                        >
                                            <Text style={styles.tabHeadingTxt}>PDF</Text>
                                            {/* {this.state.tabIndex == 2 ? <View style={styles.tabDividerStyle} /> : null} */}
                                        </TouchableOpacity>
                                    </View>
                            </View> 


               
        {renderIf(this.state.V_VEHICLEDETAIL)(


             <ScrollView>
 
    {/* <Text style={styles.appDetailTitle}>{vehicleObj.tabTitle}</Text> */}

         <View
    
         style={ { width: deviceWidth, backgroundColor: AppColors.white, marginBottom: 7,   marginBottom: 5, borderRadius: 10, padding: 10 }}
           >
         <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            


             <View style={styles.detailMainViewStyle}>
                <Text style={styles.detailHeadingTxtStyle}>YEAR </Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.year}</Text>
             </View>



<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>MAKE </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.make}</Text>
</View>


<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>MODEL </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.model}</Text>
</View>


<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>VIN </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.vin}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>KEYS </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.keys}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>COLORS </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.color}</Text>
</View>



<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>LOT NO </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.lot_number}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>BUYER NO </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.license_number}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>TOWING REQUEST </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.created_at}</Text>
</View>









<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>PICK UP DATE </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.updated_at}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>DELIVERY DATE </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.created_at}</Text>
</View>


<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>TOW FROM  </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.towed_from}</Text>
</View>

<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>TOW AMOUNT </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.towed_amount}</Text>
</View>

<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>STORAGE  </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.storage_amount}</Text>
</View>
<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}>TITLE </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.storage}</Text>
</View>
<View style={styles.detailMainViewStyle}>
<Text style={styles.detailHeadingTxtStyle}> TITLE AMOUNT </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.title_amount}</Text>
</View>
<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginTop:15}}>
<Text style={styles.detailHeadingTxtStyle}>LOCATION   </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.location}</Text>
</View>

<View style={{flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center', marginBottom:25}}><Text style={styles.detailHeadingTxtStyle}>NOTE  </Text>
<Text style={styles.detailValueTxtStyle}>{vehicleObj.notes_status}</Text>
</View>             
         </View>
         </View>
    
</ScrollView>
































        )}









        {renderIf(this.state.V_cr)(

     <ScrollView

>

<Elavation
      elevation={4}
      style={styles.dataChildViewElavationContainer}
  >
       <View style={{ paddingLeft: 10, paddingRight: 10 }}>
       <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>frontwindshield </Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.frontWindshiled}</Text>
         </View>
         <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>bonet </Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.bonnet}</Text>
         </View>
         <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>grill</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.grill}</Text>
         </View>


       <View style={styles.detailMainViewStyle}>
           <Text style={styles.detailHeadingTxtStyle}>front bumper </Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.frontBumper}</Text>
         </View>


           <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>front HeadeLight </Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.fromHeadLight}</Text>
          </View>
         

           <View style={styles.detailMainViewStyle}>
               <Text style={styles.detailHeadingTxtStyle}>Rear WindShield </Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.rearWindshield}</Text>
       </View>


       <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>trunk Door </Text>
              <Text style={styles.detailValueTxtStyle}>{vehicleObj.trunkDoor}</Text>
           </View>


   <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>rear Bumper</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.rearBumper}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>rear Bumper Support</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.rearBumperSupport}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>tail lamp</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.tailLamp}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Front Left Fendar</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.frontLeftFendar}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Left Front Door</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.leftFrontDoor}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Left Rear Door</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.leftRearDoor}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Left Rear Fender</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.leftRearFender}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>Pillar</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.pillar}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>roof</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.roof}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>right Rear Finder</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.rightRearFinder}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>right Rear Door</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.rightRearDoor}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>right Front Door</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.rightFrontDoor}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>front Right Fender</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.frontRightFender}</Text>
      </View>
      <View style={styles.detailMainViewStyle}>
              <Text style={styles.detailHeadingTxtStyle}>front tyres</Text>
               <Text style={styles.detailValueTxtStyle}>{vehicleObj.frontTyres}</Text>
      </View>


       </View>
  </Elavation>
</ScrollView>

       )}











       {renderIf(this.state.V_Export)(

        <ScrollView
>
<View
   style={styles.dataChildViewElavationContainer}
>
   <View style={{ paddingLeft: 10, paddingRight: 10 }}>
   <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>status</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.status}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>loded Form</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.lodedForm}</Text>
  </View>

  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>export Date</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.exportDate}</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>eta</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.eta }</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>BOOKING NO</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.bookingNo }</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>CONTAINER NO</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.containerNo }</Text>
  </View>
  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>SIZE </Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.arNo }</Text>
  </View>



  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>POL</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.destination }</Text>
  </View>


  <View style={styles.detailMainViewStyle}>
          <Text style={styles.detailHeadingTxtStyle}>POD</Text>
           <Text style={styles.detailValueTxtStyle}>{vehicleObj.destination }</Text>
  </View>

  

 
   </View>
</View>
</ScrollView>

       )}









       {renderIf(this.state.V_PDF)(

<ScrollView
>
<View
style={{ width: deviceWidth,
        backgroundColor: AppColors.white,
        marginBottom: 7,
        height:225,
        width:deviceWidth,
        borderRadius: 10,
        padding: 10,
        backgroundColor:'white',
        }}
>
<View style={{ paddingLeft: 10, paddingRight: 10 }}>
</View>
</View>
</ScrollView>

)}










                           





                        </View>
                    </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 15 }}>No data found</Text>
                    </View>}




            </View>
        );
    }
}

const styles = StyleSheet.create({
    detailMainViewStyle: {
        flexDirection: 'row',
        flex: 1,
        alignContent: 'center', alignItems: 'center',
    },
    detailHeadingTxtStyle: {
        fontFamily: AppFonts.JosefinSansSemiBold,
        fontSize: 14,
        color: AppColors.textColor, flex: 0.95,

    }, detailValueTxtStyle: {
        fontFamily: AppFonts.SourceSansProRegular,
        fontSize: 14,
        color: AppColors.textColor, flex: 1
    },
    dividerStyleView: {
        width: deviceWidth * 0.85, height: 1, backgroundColor: '#A9A9A9', marginTop: 8, marginBottom: 8
    },
    dataHeadingTxtStyle: {
        flex: 1, fontFamily: AppFonts.JosefinSansBold,
        fontSize: 22,
        color: AppColors.textColor,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10
    },
    dataChildViewElavationContainer: {
        width: deviceWidth,
        backgroundColor: AppColors.white,
        marginBottom: 7,
    
        borderRadius: 10,
        padding: 10
    },
    tabHeadingTxt: {
        fontFamily: AppFonts.SourceSansProSemiBold,
        color: AppColors.Signincolor,
        fontSize: 15, textAlign: 'center'
    }, tabDividerStyle: {
        width: deviceWidth * 0.3,
        position: 'absolute',
        bottom: 0,
        height: 4, marginBottom: -1,
        backgroundColor: AppColors.white
    },
    appDetailTitle: {
        flex: 1,
        fontFamily: AppFonts.JosefinSansBold,
        fontSize: 15,
        color: AppColors.textColor,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        textAlign: 'center'
    }
})

export default VehcilContainerDetailScreen;