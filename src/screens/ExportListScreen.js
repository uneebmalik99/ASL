import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, BackHandler } from 'react-native'
import Elavation from '../styles/Elavation';
import NetInfo from "@react-native-community/netinfo";
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import Toolbar from '../screens/Toolbar';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from './DialogLoder';

let filterItemObj = null;
let setProps = null;
let imageBasePath = null;
class ExportListScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isDisplayView: 0,
            tabIndex: 0,
            isInterNetConnectionNotFound: false,
            exortList: [

            ],
            searchExportStr: '',
            vehicleList: [
                {
                    id: 1,
                    hatNo: 1215,
                    customerName: 'Haqsoft Pvt Ltd.',
                    year: 2014,
                    make: 'Toyota',
                    model: 'Camry',
                    vin: '4T1BE30K14U8499171277',
                    condition: 'Non-Op',
                    status: 'SHIPPED',
                    titleRecieved: 'YES',
                    towed: 'YES',
                    lotNo: '12333',
                    location: 'Rajkot',
                    image: require('../Images/car_image2.jpg')
                }, {
                    id: 2,
                    hatNo: 1215,
                    customerName: 'Haqsoft Pvt Ltd.',
                    year: 2014,
                    make: 'Toyota',
                    model: 'Camry',
                    vin: '4T1BE30K14U8499171277',
                    condition: 'Non-Op',
                    status: 'SHIPPED',
                    titleRecieved: 'YES',
                    towed: 'YES',
                    lotNo: '12333',
                    location: 'Mumbai',
                    image: require('../Images/car_image1.jpg')
                }
            ],
            isLoding: false
        }
    }

   componentDidMount() {
     
        //   BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        //NetInfo.addEventListener(
          ///  'connectionChange',
           // this._handleConnectivityChange
   //     );
        console.log('Export url :: = ', AppUrlCollection.EXPORT_LIST + '  customerId= ' + AppConstance.USER_INFO.USER_TOKEN)
        this.setState({ isLoding: true })
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


 

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        // this.props.navigation.goBack();
        this.props.navigation("DashboardScreen");

     
    }

    showImgeGrid = (item)=>{
        if (item.exportImages.length > 0) {
                     this.props.naviagation.navigate('ExportImageListScreen', { 'itemObj': item, 'baseImagePath': imageBasePath,'vehicleList': this.state.vehicleList })
            //  AppConstance.APP_PROPS.navigation.navigate('ExportImageListScreen', { 'itemObj': item, 'baseImagePath': imageBasePath,'vehicleList': this.state.vehicleList })
        } else {
          alert("image not found"); 
          
        }
    }

    //AppConstance.APP_PROPS.navigation.navigate('ExportDetailsScreen ', { 'itemObj': item, 'baseImagePath': imageBasePath, 'vehicleList': this.state.vehicleList }
    //render Vehicle
    renderVehicle = ({ item, index }) => {
        return <Elavation
            elevation={2}
            style={{ width: deviceWidth * 0.95, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
        >
            <TouchableOpacity style={{ width: deviceWidth * 0.3, height: 80 }}
                onPress={() => this.showImgeGrid(item)}
            >
                {item.exportImages.length > 0 ?
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={{ uri: imageBasePath + item.exportImages[0].thumbnail }} /> :
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} />}

            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                onPress={() =>  this.props.navigation.navigate('ExportDetailsScreen', { 'itemObj': item, 'baseImagePath': imageBasePath, 'vehicleList': this.state.vehicleList })}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>Container NO : </Text>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12, flex: 2 }}>{item.container_number}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>Port of loading : </Text>
                    <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, color: AppColors.textColor, fontSize: 13, flex: 2 }}>{item.port != undefined && item.port != null && item.port.port_name != null && item.port.port_name != '' ? item.port.port_name : '-'}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>ETA : </Text>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12, flex: 2 }}>{item.eta}</Text>
                </View>
                {/* <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>Booking ID : </Text>
                    <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, color: AppColors.textColor, fontSize: 13, flex: 2 }}>{'#' + item.booking_number}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>Container NO : </Text>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12, flex: 2 }}>{item.container_number}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>Export DT : </Text>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12, flex: 2 }}>{item.export_date}</Text>
                </View> */}

            </TouchableOpacity>
        </Elavation>
    }

    onTabChange = (event) => {
        this.setState({ tabIndex: event.i })
    }

    callingSearchAPI = () => {
        this.setState({ isFilterOrSerachEnable: true })
        this.callingAPIWithLocation(this.state.searchExportStr)
    }

    callingAPIWithLocation = (exportSearch) => {
        this.setState({ isLoding: true })
        console.log('ExPORT :: ', AppUrlCollection.EXPORT_LIST + 'search=' + this.state.searchExportStr)
        fetch(AppUrlCollection.EXPORT_LIST + 'search=' + this.state.searchExportStr, {
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
                    this.setState({ exortList: [] })
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //render my main content
    renderMainContent = () => {
        if (this.state.isInterNetConnectionNotFound) {
            alert("internet not found ")
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: AppColors.toolbarColor }}>
                        {filterItemObj != null ?
                            <Toolbar setProps={this.props} headerName={'Container'}
                                isFilterIconShow={true} isInnerScreen={true} /> :
                            <Toolbar toggle={this.props.toggle} headerName={'Container'}
                                isFilterIconShow={true} isInnerScreen={false} />}
                    </View>
                    <View style={{ flex: 1 }}>
                        <Elavation
                            elevation={3}
                            style={{ width: deviceWidth * 0.96, height: 50, borderRadius: 10, marginTop: 8, marginLeft: 5, marginRight: 5, alignSelf: 'center' }}>
                            <View style={{ flexDirection: 'row', flex: 1, alignContent: 'center', alignItems: 'center', paddingLeft: 10, marginLeft: 10, marginRight: 10, paddingRight: 15 }}>
                                <TextInput style={{ flex: 1, fontFamily: AppFonts.SourceSansProRegular, color: AppColors.toolbarColor, fontSize: 18, }}
                                    placeholder='Search'
                                    placeholderTextColor={AppColors.toolbarColor}
                                    selectionColor={AppColors.toolbarColor}
                                    onSubmitEditing={() => this.callingSearchAPI()}
                                    returnKeyType='search'
                                    onChangeText={(text) => this.setState({ searchExportStr: text })}
                                />
                                <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                            </View>
                        </Elavation>
                        {this.state.exortList.length > 0 ? <FlatList
                            style={{ paddingTop: 5 }}
                            data={this.state.exortList}
                            renderItem={this.renderVehicle}
                            keyExtractor={(item, index) => index}
                            extraData={this.state}
                        /> : <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 15 }}>Export data not found</Text>
                            </View>}

                    </View>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: AppColors.transplant, height: deviceHeight, }}>
                {/* <Image source={require('../Images/backgroundimage4.jpg')} resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 0.49, position: 'absolute' }} /> */}
                <DialogLoader loading={this.state.isLoding} />
                {this.renderMainContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    vehicleHaxNoTxtStyle: {
        width: 30, fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 16
    },
    vehicleCustNameTxtStyle: {
        fontFamily: AppFonts.SourceSansProSemiBold, flex: 1, color: AppColors.textColor, fontSize: 16
    }, vehicleInnerTxtHeadinStyle: {
        fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 14, color: AppColors.textColor, flex: 1.5
    }, vehicleInnerTxtValueStyle: {
        fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 15, flex: 2
    },
    vehicleInnerMainViewStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    vehicleStatusTxtStyle: {
        fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, marginRight: 10
    },
    vehicleInnreActionOpacityStyle: {
        borderRadius: 10, borderColor: AppColors.toolbarColor, borderWidth: 1,
    },
    vehicleInnreActionTxtStyle: {
        fontFamily: AppFonts.SourceSansProRegular, paddingLeft: 8, paddingRight: 8, paddingTop: 1, paddingBottom: 1, color: AppColors.textColor, fontSize: 12,
    }
})
export default ExportListScreen;


