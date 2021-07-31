import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ScrollView,  CameraRoll, Share, BackHandler } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';

import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from '../screens/DialogLoder';

const images = [
    require('../Images/car_image1.jpg'),
    require('../Images/car_image2.jpg'),
    require('../Images/download.jpg'),
    require('../Images/download1.jpg')
];

let vehicleObj = null;
let locationList = []
var baseImagePath = null;
var isCallingWithoutLogin = ''
class NotificationVehicleDetailscreen extends Component {
    constructor(props) {
        super(props);
        // if (vehicleObj != undefined) {
        //     isCallingWithoutLogin = this.props.navigation.state.params.isCallingWithoutLogin
        // } else {
        //     vehicleObj = ''
        // }
        console.log('vegicle obj ::', vehicleObj)
        console.log('with out login:', isCallingWithoutLogin)
        this.state = {
            isLoading: false,
            tabIndex: 0,
            isInternetNotConnected: false,
            images: [],
            imageSLiderPos: 0,
            vehicleDetail: [],
            locationList: []
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
       

        

    callingLocationApi = () => {
        fetch(AppUrlCollection.LOCATION, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({ locationList: responseJson.data })
                    this.callingVehicleDetailApi()
                } else {
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    //check internet connection
    

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    // handleBackPress = () => {
    //     this.props.navigation.goBack();
    //     return true;
    // }

    callingVehicleDetailApi = () => {
        console.log('detail view wvehicl  ELSE ', AppUrlCollection.VEHICLE_DETAIL + '?id=' + vehicleObj)
        fetch(AppUrlCollection.VEHICLE_DETAIL + '?id=' + vehicleObj, {
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
                //   this.setState({ vehicleList: responseJson.data.vehicle_details })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    let vehicleDetailObj = responseJson.data.vehicle;
                    console.log('Loation list ::' + locationList)
                    this.setState({ images: [] })
                    for (let index = 0; index < vehicleDetailObj.images.length; index++) {
                        const element = vehicleDetailObj.images[index];
                        this.state.images.push(baseImagePath + element.thumbnail)
                        console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
                    }
                    this.setState({ images: this.state.images })
                    let locationName = this.state.locationList.find((locationObj) => locationObj.id == vehicleDetailObj.location)
                    console.log('Locatiion :::::', locationName)
                    let vehicleDetail = [
                        {
                            'tabTitle': 'VEHICLE DETAILS',
                            'customerName': vehicleDetailObj.customerUser.customer_name,
                            'buyerNo': vehicleDetailObj.license_number,
                            'vehicleLocation': locationName.name,
                            'lotNo': vehicleDetailObj.lot_number,
                            'year': vehicleDetailObj.year,
                            'make': vehicleDetailObj.make,
                            'model': vehicleDetailObj.model,
                            'vin': vehicleDetailObj.vin,
                            'keys': vehicleDetailObj.keys != null && vehicleDetailObj.keys != '' && vehicleDetailObj.keys == 1 ? 'YES' : 'NO',
                            'towing_titles': vehicleDetailObj.towingRequest.title_recieved != null ? AppConstance.gettingTowingTitle(vehicleDetailObj.towingRequest.title_recieved) : '-',
                            'towingDate': vehicleDetailObj.towingRequest.title_recieved_date != null ? vehicleDetailObj.towingRequest.title_recieved_date : '-',
                            'deliveredDate': vehicleDetailObj.towingRequest.deliver_date != null ? vehicleDetailObj.towingRequest.deliver_date : '-',
                            'towLocation': '-',
                            'towAmount': vehicleDetailObj.towingRequest.tow_fee != null ? vehicleDetailObj.towingRequest.tow_fee : '-',
                            'storage': vehicleDetailObj.storage_amount,
                            'titleType': AppConstance.gettingTowingTitle(vehicleDetailObj.towingRequest.title_type),
                            'titleStatus': AppConstance.gettingStatusNameFromId(vehicleDetailObj.status),
                            'titleAmount': vehicleDetailObj.title_amount,
                            'titleNo': vehicleDetailObj.towingRequest.title_number != null ? vehicleDetailObj.towingRequest.title_number : '-',
                            'titleState': vehicleDetailObj.towingRequest.title_state,
                        }, {
                            'tabTitle': 'CONDITION REPORT',
                            'frontWindshiled': vehicleDetailObj.vehicleConditions[0].value != '' ? vehicleDetailObj.vehicleConditions[0].value : '-',
                            'bonnet': vehicleDetailObj.vehicleConditions[1].value != '' ? vehicleDetailObj.vehicleConditions[1].value : '-',
                            'grill': vehicleDetailObj.vehicleConditions[2].value != '' ? vehicleDetailObj.vehicleConditions[2].value : '-',
                            'frontBumper': vehicleDetailObj.vehicleConditions[3].value != '' ? vehicleDetailObj.vehicleConditions[3].value : '-',
                            'frontHeadLight': vehicleDetailObj.vehicleConditions[4].value != '' ? vehicleDetailObj.vehicleConditions[4].value : '-',
                            'rearWindshield': vehicleDetailObj.vehicleConditions[5].value != '' ? vehicleDetailObj.vehicleConditions[5].value : '-',
                            'trunkDoor': vehicleDetailObj.vehicleConditions[6].value != '' ? vehicleDetailObj.vehicleConditions[6].value : '-',
                            'rearBumper': vehicleDetailObj.vehicleConditions[7].value != '' ? vehicleDetailObj.vehicleConditions[7].value : '-',
                            'rearBumperSupport': vehicleDetailObj.vehicleConditions[8].value != '' ? vehicleDetailObj.vehicleConditions[8].value : '-',
                            'tailLamp': vehicleDetailObj.vehicleConditions[9].value != '' ? vehicleDetailObj.vehicleConditions[9].value : '-',
                            'frontLeftFendar': vehicleDetailObj.vehicleConditions[10].value != '' ? vehicleDetailObj.vehicleConditions[10].value : '-',
                            'leftFrontDoor': vehicleDetailObj.vehicleConditions[11].value != '' ? vehicleDetailObj.vehicleConditions[11].value : '-',
                            'leftRearDoor': vehicleDetailObj.vehicleConditions[12].value != '' ? vehicleDetailObj.vehicleConditions[12].value : '-',
                            'leftRearFender': vehicleDetailObj.vehicleConditions[13].value != '' ? vehicleDetailObj.vehicleConditions[13].value : '-',
                            'pillar': vehicleDetailObj.vehicleConditions[14].value != '' ? vehicleDetailObj.vehicleConditions[14].value : '-',
                            'roof': vehicleDetailObj.vehicleConditions[15].value != '' ? vehicleDetailObj.vehicleConditions[15].value : '-',
                            'rightRearFinder': vehicleDetailObj.vehicleConditions[16].value != '' ? vehicleDetailObj.vehicleConditions[16].value : '-',
                            'rightRearDoor': vehicleDetailObj.vehicleConditions[17].value != '' ? vehicleDetailObj.vehicleConditions[17].value : '-',
                            'rightFrontDoor': vehicleDetailObj.vehicleConditions[18].value != '' ? vehicleDetailObj.vehicleConditions[18].value : '-',
                            'frontRightFender': vehicleDetailObj.vehicleConditions[19].value != '' ? vehicleDetailObj.vehicleConditions[19].value : '-',
                            'frontTyres': vehicleDetailObj.vehicleConditions[20].value != '' ? vehicleDetailObj.vehicleConditions[20].value : '-'
                        }, {
                            'tabTitle': 'EXPORT',
                            'status': '-',
                            'lodedForm': '-',
                            'exportDate': vehicleDetailObj.vehicleExports != null ? vehicleDetailObj.vehicleExports.export.export_date : '-',
                            'eta': vehicleDetailObj.vehicleExports != null ? vehicleDetailObj.vehicleExports.export.eta : '-',
                            'bookingNo': vehicleDetailObj.vehicleExports != null ? vehicleDetailObj.vehicleExports.export.booking_number : '-',
                            'containerNo': vehicleDetailObj.vehicleExports != null && vehicleDetailObj.vehicleExports.export.container_number != null ? vehicleDetailObj.vehicleExports.export.container_number : '-',
                            'size': '-',
                            'arNo': vehicleDetailObj.vehicleExports != null ? vehicleDetailObj.vehicleExports.export.ar_number : '-',
                            'destination': vehicleDetailObj.vehicleExports != null ? vehicleDetailObj.vehicleExports.export.destination : '-',
                        }, {
                            'tabTitle': 'INVOICE', // invoice
                            'invoiceAmount': '-',
                            'paidAmount': '-',
                            'totalAmount': '-'
                        }
                    ]
                    this.setState({ vehicleDetail: vehicleDetail })
                } else {
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });



    }

    renderVehicleDetail = ({ item, index }) => {
        if (index == 0) {
            return <View>
                {/* <Elavation
                    elevation={4}
                    style={{ width: deviceWidth, height: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ flex: 1, fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 15, color: AppColors.textColor, }}>{item.tabTitle}</Text>
                </Elavation> */}
                <Text style={styles.appDetailTitle}>{item.tabTitle}</Text>

                <Elavation
                    elevation={4}
                    style={{ width: deviceWidth * 0.95, backgroundColor: AppColors.white, marginBottom: 7, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, borderRadius: 10, padding: 10 }}
                >
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        {/* <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Customer Name : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.customerName}</Text>
                        </View>

                        <View style={styles.dividerStyleView} /> */}

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Buyer NO : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.buyerNo}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Location : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.vehicleLocation}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Lot NO : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.lotNo}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Year : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.year}</Text>
                        </View>


                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Model : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.model}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Vin : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.vin}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Keys : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.keys}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>{'Towing ' + '&' + ' Titles'} : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.towing_titles}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Towing Date : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.towingDate}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Delivered Date : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.deliveredDate}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Tow Location : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.towLocation}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        {/* <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Tow Amount : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.towAmount}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Storage : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.storage}</Text>
                        </View>

                        <View style={styles.dividerStyleView} /> */}

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Title Type : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.titleType}</Text>
                        </View>

                        {/* <View style={styles.dividerStyleView} /> */}

                        {/* <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Title Status : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.titleStatus}</Text>
                        </View>

                        <View style={styles.dividerStyleView} /> */}

                        {/* <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Title Amount : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.titleAmount}</Text>
                        </View>

                        <View style={styles.dividerStyleView} /> */}

                        {/* <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Title NO : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.titleNo}</Text>
                        </View>

                        <View style={styles.dividerStyleView} /> */}

                        {/* <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Title State : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.titleState}</Text>
                        </View> */}
                    </View>
                </Elavation>
            </View>
        } else if (index == 1) {
            return <View>
                <Text style={styles.appDetailTitle}>{item.tabTitle}</Text>
                <Elavation
                    elevation={4}
                    style={styles.dataChildViewElavationContainer}
                >
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Front Windshiled : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.frontWindshiled}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Bonet : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.bonnet}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Grill : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.grill}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Front Bumper : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.frontBumper}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Frotn Head Light : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.frontHeadLight}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Rear Windshield :</Text>
                            <Text style={styles.detailValueTxtStyle}>{item.rearWindshield}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Trunk Door : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.trunkDoor}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Rear Bumper : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.rearBumper}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Rear Bumper Support : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.rearBumperSupport}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Tail Lamp : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.tailLamp}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Front Left Fender : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.frontLeftFendar}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Left Front Door : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.leftFrontDoor}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Tow Location :</Text>
                            <Text style={styles.detailValueTxtStyle}>{item.towLocation}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Left Rear Door : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.leftRearDoor}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Left Rear Fender : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.leftRearFender}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Pillar : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.pillar}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Roof : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.roof}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Right Rear Fender : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.rightRearFinder}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Right Rear Door : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.rightRearDoor}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Front Front Door : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.rightFrontDoor}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Front Right Fender : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.frontRightFender}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Front Tyres : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.frontTyres}</Text>
                        </View>

                    </View>
                </Elavation>
            </View>
        } else if (index == 2 && isCallingWithoutLogin != true) {
            return <View>
                <Text style={styles.appDetailTitle}>{item.tabTitle}</Text>
                <Elavation
                    elevation={4}
                    style={styles.dataChildViewElavationContainer}
                >
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        {/* <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Status : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.status}</Text>
                        </View>

                        <View style={styles.dividerStyleView} /> */}

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Loaded from : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.lodedForm}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Export Date : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.exportDate}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>ETA : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.eta}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        {/* <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Booking NO : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.bookingNo}</Text>
                        </View>

                        <View style={styles.dividerStyleView} /> */}

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Container NO : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.containerNo}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Size : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.size}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        {/* <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Ar NO : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.arNo}</Text>
                        </View>

                        <View style={styles.dividerStyleView} /> */}

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Destination : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.destination}</Text>
                        </View>

                    </View>
                </Elavation>
            </View>
        } else if (index == 3 && isCallingWithoutLogin != true) {
            return <View>
                <Text style={styles.appDetailTitle}>{item.tabTitle}</Text>
                <Elavation
                    elevation={4}
                    style={styles.dataChildViewElavationContainer}
                >
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Invoice Amount : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.invoiceAmount}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Paid Amount : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.paidAmount}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />

                        <View style={styles.detailMainViewStyle}>
                            <Text style={styles.detailHeadingTxtStyle}>Balance Amount : </Text>
                            <Text style={styles.detailValueTxtStyle}>{item.totalAmount}</Text>
                        </View>

                        <View style={styles.dividerStyleView} />
                    </View>
                </Elavation>
            </View>
        }
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
        let index = parseInt(offset / deviceHeight / 0.9);   // your cell height
        this.setState({ tabIndex: index })
        if (isCallingWithoutLogin == true) {
        } else {
            if (index == 3 || index == 2) {
                this.refs.headingScrollView.scrollToEnd({ animated: true });
            } else if (index == 1) {
                this.refs.headingScrollView.scrollTo({ x: 0, y: 0, animated: true })
            }
        }
    }



    handleBackPress = () => {
        this.props.navigation.goBack();

        return true;
        // if (this.props.setProps != undefined && this.props.setProps.navigation.isFocused()) {
        //     AppConstance.APP_PROPS.navigation.push('NavigationSideScreen', { 'isRefreshAllScreen': true })
        //     return true;
        // } else {
        //     return true;
        // }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <Image source={require('../Images/backgroundimage4.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 0.49, position: 'absolute' }} /> */}
                {/* <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    <Toolbar headerName={'Vehicle Detail'} isFilterIconShow={true} isInnerScreen={true} />
                </View> */}
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

    <Image
                        source={require('../Images/alert.png')}
                          style={{width:"100%", 
                           height:70
                        ,}}
                        resizeMode='contain'
                        />

                {this.state.images.length > 0 ?
                    <TouchableOpacity style={{ height: '45%', width: '100%' }}
                        onPress={() => this.callingImageList()}
                    >
                        <Image
                            style={{ flex: 1, width: '100%', height: '45%', }}
                            source={{ uri: this.state.images[0] }}
                            resizeMode='stretch'
                        />

                        {/* <ImageSlider
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
                    </TouchableOpacity> : null} */}

                    </TouchableOpacity> : <View style={{ height: '30%' }}>
                        {/* <Image source={require('../Images/logo_final.png')} style={{ width: deviceWidth, height: 150 }} resizeMode='cover' /> */}
                    </View>}

                {vehicleObj != undefined && vehicleObj != '' ?
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>

                            {isCallingWithoutLogin == true ?
                                <View style={{ height: 50 }}>
                                    <View style={{ flex: 1, height: 50, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: AppColors.toolbarColor }}>
                                        <TouchableOpacity
                                            style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1 }}
                                            onPress={() => this.switchTabWithScoll(0, 'Vehicle Details')}
                                        >
                                            <Text style={styles.tabHeadingTxt}>Vehicle Details</Text>
                                            {this.state.tabIndex == 0 ? <View style={styles.tabDividerStyle} /> : null}

                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 }}
                                            onPress={() => this.switchTabWithScoll(1, 'Condition Report')}
                                        >
                                            <Text style={styles.tabHeadingTxt}>Condition Report</Text>
                                            {this.state.tabIndex == 1 ? <View style={styles.tabDividerStyle} /> : null}
                                        </TouchableOpacity>
                                    </View>
                                </View> :
                                <View style={{ height: 50 }}>
                                    <ScrollView
                                        horizontal={true}
                                        style={{ flex: 1 }}
                                        ref='headingScrollView'
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        <View style={{ flex: 1, height: 50, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: AppColors.toolbarColor }}>
                                            <TouchableOpacity
                                                style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', width: 150 }}
                                                onPress={() => this.switchTabWithScoll(0, 'Vehicle Details')}
                                            >
                                                <Text style={styles.tabHeadingTxt}>Vehicle Details</Text>
                                                {this.state.tabIndex == 0 ? <View style={styles.tabDividerStyle} /> : null}

                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: 150 }}
                                                onPress={() => this.switchTabWithScoll(1, 'Condition Report')}
                                            >
                                                <Text style={styles.tabHeadingTxt}>Condition Report</Text>
                                                {this.state.tabIndex == 1 ? <View style={styles.tabDividerStyle} /> : null}
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: 150 }}
                                                onPress={() => this.switchTabWithScoll(2, 'Export')}
                                            >
                                                <Text style={styles.tabHeadingTxt}>Export</Text>
                                                {this.state.tabIndex == 2 ? <View style={styles.tabDividerStyle} /> : null}
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: 150 }}
                                                onPress={() => this.switchTabWithScoll(3, 'Invoice')}
                                            >
                                                <Text style={styles.tabHeadingTxt}>Invoice</Text>
                                                {this.state.tabIndex == 3 ? <View style={styles.tabDividerStyle} /> : null}
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                </View>
                            }
                            <FlatList
                                ref='flatList'
                                style={{ flex: 5 }}
                                data={this.state.vehicleDetail}
                                renderItem={this.renderVehicleDetail}
                                keyExtractor={(item, index) => index}
                                extraData={this.state}
                                ListFooterComponent={() => <View style={{ width: 1, height: 30 }} />}
                                onScroll={(e) => {
                                    // let offset = e.nativeEvent.contentOffset.y;
                                    // let index = parseInt(offset / deviceHeight);   // your cell height
                                    // this.setState({ tabIndex: index })
                                    this.scrollFlatList(e)
                                }}
                            />
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
        width: deviceWidth * 0.95,
        backgroundColor: AppColors.white,
        marginBottom: 7,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        borderRadius: 10,
        padding: 10
    },
    tabHeadingTxt: {
        fontFamily: AppFonts.SourceSansProSemiBold,
        color: AppColors.white,
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
        marginLeft: 10
    }
})

export default NotificationVehicleDetailscreen;