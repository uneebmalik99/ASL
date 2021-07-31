import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView,  CameraRoll, BackHandler } from "react-native";
import FadeInView from '../styles/FadeInView'
import NetInfo from "@react-native-community/netinfo";
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import Toolbar from './Toolbar';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { FlatList } from 'react-native-gesture-handler';
import { heightPercentageToDP } from '../styles/ResponsiveScreen';

import RNFetchBlob from 'react-native-fetch-blob'

const { config, fs } = RNFetchBlob;

let exportObj = null;
let baseImagePath = null;
let vehicleList = null;
var isCallingWithoutLogin = null;

var exportImageBasePath = '';
var vehicleImageBAsePath = '';
class ExportDetailsScreen extends Component {
    constructor(props) {
        super(props)
        exportObj = this.props.navigation.state.params.itemObj;
        exportObj = this.props.navigation.state.params.itemObj;
        baseImagePath = this.props.navigation.state.params.baseImagePath;
        vehicleList = this.props.navigation.state.params.vehicleList;
        isCallingWithoutLogin = this.props.navigation.state.params.isCallingWithoutLogin;
        this.state = {
            exportDetailObj: '',
            vehicleList: [],
            locationList: [],
            imageList: []
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
     

        NetInfo.fetch().then(state => {
            if (state.isConnected == true) {
                //this.setState({ vehicleList: vehicleList })
                this.callingLocationAPI();
                if (isCallingWithoutLogin) {
                    console.log('Export url ::  IF = ', AppUrlCollection.CONTAINER_TRACKING_VIEW + 'id=' + exportObj.id)
                    fetch(AppUrlCollection.CONTAINER_TRACKING_VIEW + 'id=' + exportObj.id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log('export detail ', responseJson)
                            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                                ////TODO 
                                for (let index = 0; index < responseJson.data.export.exportImages.length; index++) {
                                    const element = responseJson.data.export.exportImages[index];
                                    this.state.imageList.push(baseImagePath + element.thumbnail)
                                }
                                this.setState({ exportDetailObj: responseJson.data.export, vehicleList: responseJson.data.export.vehicleExports, imageList: this.state.imageList })
                                //this.setState({ exportDetailObj: responseJson.data.export, vehicleList: responseJson.data.export.vehicle, imageList: this.state.imageList })
                            } else {
                                AppConstance.showSnackbarMessage(responseJson.message)
                            }
                        })
                        .catch((error) => {
                            console.warn(error)
                        });
                } else {
                    console.log('Export url ELE :: = ', AppUrlCollection.EXPORT_DETAIL + 'exportId=' + exportObj.id)
                    fetch(AppUrlCollection.EXPORT_DETAIL + 'exportId=' + exportObj.id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'authkey': AppConstance.USER_INFO.USER_TOKEN
                        },
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log('export detail ', responseJson)
                            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                                ////TODo
                                for (let index = 0; index < responseJson.data.export.exportImages.length; index++) {
                                    const element = responseJson.data.export.exportImages[index];
                                    this.state.imageList.push(baseImagePath + element.thumbnail)
                                }
                                //this.setState({ exportDetailObj: responseJson.data.export, vehicleList: responseJson.data.export.vehicleExports, imageList: this.state.imageList })
                                this.setState({ exportDetailObj: responseJson.data.export, vehicleList: responseJson.data.export.vehicle, imageList: this.state.imageList })
                                exportImageBasePath = responseJson.data.other.export_image;
                                // vehicleImageBAsePath = responseJson.other.vehicle_image;
                                console.log('dasda', exportImageBasePath)
                            } else {
                                AppConstance.showSnackbarMessage(responseJson.message)
                            }
                        })
                        .catch((error) => {
                            console.warn(error)
                        });
                }
            }
            else {
            alert('NO Internet Connection Found');
             }
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    callingLocationAPI = () => {
        fetch(AppUrlCollection.LOCATION2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //    'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({ locationList: responseJson.data })
                } else {
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    


    downloadImage = () => {
        console.log('Base Image path :: ', baseImagePath + exportObj.export_invoice)
        // CameraRoll.saveToCameraRoll(baseImagePath + exportObj.export_invoice, 'photo')
    }

    // callig vehicle deatail
    callingVehicleDetailScreen = (item) => {
        console.log('Auth token ', this.state.locationList)
        if (isCallingWithoutLogin) {
            this.props.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': 'https://erp.gwwshipping.com/uploads/', 'isCallingWithoutLogin': true })
        } else {
            //AppConstance.APP_PROPS.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': 'https://erp.gwwshipping.com/uploads/', 'isCallingWithoutLogin': isCallingWithoutLogin })
            console.log('BAsereer ', vehicleImageBAsePath)
            this.props.navigate.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': exportImageBasePath, 'isCallingWithoutLogin': isCallingWithoutLogin })
        }
        //AppConstance.APP_PROPS.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': 'http://erp.gwwshipping.com/uploads/', 'isCallingWithoutLogin': true })
        //AppConstance.APP_PROPS.navigation.navigate('VehcilDetailScreen', { 'vehicleObj': item.vehicle, 'locationList': this.state.locationList, 'baseImagePath': 'http://erp.gwwshipping.com/uploads/', 'isCallingWithoutLogin': isCallingWithoutLogin })

    }

    // render my vehicle content
    renderMyVehileList = ({ item, index }) => {
        if (isCallingWithoutLogin) {
            return (
                <View style={{ flexDirection: 'row', height: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.vehicle.year != null && item.vehicle.year != '' ? item.vehicle.year : '-'}</Text>
                    <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.vehicle.make != null && item.vehicle.make != '' ? item.vehicle.make : '-'}</Text>
                    <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.vehicle.model != null && item.vehicle.model != '' ? item.vehicle.model : '-'}</Text>
                    <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.vehicle.lot_number != null && item.vehicle.lot_number != '' ? item.vehicle.lot_number : '-'}</Text>
                    <TouchableOpacity
                        onPress={() => this.callingVehicleDetailScreen(item)}
                    >
                        <Text style={{ fontFamily: AppFonts.SourceSansProRegular, fontSize: 14, color: AppColors.textColor }}>VIEW</Text>
                        {/* <MaterialCommunityIcons name='eye' color={AppColors.textColor} size={18} /> */}
                    </TouchableOpacity>

                </View>
            )
        } else {
            return (
                <View style={{ flexDirection: 'row', height: 50, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.year != null && item.year != '' ? item.year : '-'}</Text>
                    <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.make != null && item.make != '' ? item.make : '-'}</Text>
                    <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.model != null && item.model != '' ? item.model : '-'}</Text>
                    <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, flex: 1 }}>{item.lot_number != null && item.lot_number != '' ? item.lot_number : '-'}</Text>
                    <TouchableOpacity
                        onPress={() => this.callingVehicleDetailScreen(item)}
                    >
                        <Text style={{ fontFamily: AppFonts.SourceSansProRegular, fontSize: 14, color: AppColors.textColor }}>VIEW</Text>
                        {/* <MaterialCommunityIcons name='eye' color={AppColors.textColor} size={18} /> */}
                    </TouchableOpacity>
                </View>
            )
        }
    }

    //  http://localhost/yii2_work/new_galaxy/webapi/export/billofladng-download?id=1
    //http://localhost/yii2_work/new_galaxy/webapi/export/manifest-download?id=1

    //http://erp.gwwshipping.com/webapi/export/billofladng-download?id=5

    downloadBill = (mode) => {
        let dirs = RNFetchBlob.fs.dirs
        if (mode == 1) {
            fetch(AppUrlCollection.DOWNLOAD_BILLE + 'id=' + exportObj.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authkey': AppConstance.USER_INFO.USER_TOKEN
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('responde da::', responseJson)
                    var date = new Date();
                    if (responseJson.status == AppConstance.API_SUCESSCODE) {
                        //  let url = 'http://erp.gwwshipping.com/backend/uploads/pdf/20190069H_BL_Mehul Test comp_CALB789763.pdf'
                        let PictureDir = fs.dirs.DownloadDir + '/Galaxy App';
                        let options = {
                            fileCache: true,
                            addAndroidDownloads: {
                                useDownloadManager: true,
                                notification: true,
                                path: PictureDir + '/Galaxy_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf',
                                description: 'Image'
                            }
                        }
                        config(options).fetch('GET', responseJson.data).then((res) => {
                            console.log('respose :: ', res)
                        });
                    } else {
                    }
                })
                .catch((error) => {
                    console.warn(error)
                });
        } else if (mode == 2) {
            fetch(AppUrlCollection.DOWNLOAD_MAINFEST + 'id=' + exportObj.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authkey': AppConstance.USER_INFO.USER_TOKEN
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('responde mni::', responseJson)
                    if (responseJson.status == AppConstance.API_SUCESSCODE) {
                        let PictureDir = fs.dirs.DownloadDir + '/Galaxy App';
                        let options = {
                            fileCache: true,
                            addAndroidDownloads: {
                                useDownloadManager: true,
                                notification: true,
                                path: PictureDir + '/Galaxy_' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.pdf',
                                description: 'Image'
                            }
                        }
                        config(options).fetch('GET', responseJson.data).then((res) => {
                            console.log('respose :: ', res)
                        });
                    } else {
                    }
                })
                .catch((error) => {
                    console.warn(error)
                });
        }

        //let url = 'http://dev.digitize-info.com/ci/culturally/assets/images/slider/audience.jpg';
        // let url = 'http://erp.gwwshipping.com/backend/uploads/pdf/20190069H_BL_Mehul Test comp_CALB789763.pdf'
        // let PictureDir = fs.dirs.DownloadDir + '/pdf';
        // let options = {
        //     fileCache: true,
        //     addAndroidDownloads: {
        //         useDownloadManager: true,
        //         notification: true,
        //         path: PictureDir + "/image2.pdf",
        //         description: 'Image'
        //     }
        // }
        // config(options).fetch('GET', url).then((res) => {
        //     console.log('respose :: ', res)
        // });


    }

    imageSlider = () => {
        if (exportObj.exportImages.length > 0) {
            this.props.navigation.navigate('ExportImageListScreen', { 'itemObj': exportObj, 'baseImagePath': baseImagePath,'vehicleList': this.state.vehicleList })
        } else {
            AppConstance.showSnackbarMessage('Image Not Found')
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    <Toolbar headerName={'Container Detail'} isFilterIconShow={true} isInnerScreen={true} />
                </View>
                <ScrollView
                    behaviour="height"
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, height: heightPercentageToDP('40%') }}>
                            {this.state.imageList.length > 0 ?
                                <TouchableOpacity style={{ height: heightPercentageToDP('40%') }}
                                    onPress={() => this.imageSlider()}
                                >
                                    <View style={{ height: heightPercentageToDP('40%') }}>
                                        <Image source={{ uri: this.state.imageList[0] }} style={{ width: undefined, height: undefined, flex: 1 }}
                                            resizeMode='stretch' />
                                    </View>
                                    {/* <ImageSlider
                                        loopBothSides
                                        style={{ flex: 1, height: heightPercentageToDP('30%'), }}
                                        autoPlayWithInterval={3000}
                                        images={this.state.imageList}
                                        customSlide={({ index, item, style, width }) => (
                                            // It's important to put style here because it's got offset inside
                                            <View key={index} style={[style, { width: deviceWidth, flex: 1, backgroundColor: 'black' }]}>
                                                <Image source={{ uri: item }} style={{ width: undefined, height: undefined, flex: 1 }} resizeMode='cover' />
                                            </View>
                                        )}
                                        customButtons={(position, move) => (
                                            <View style={{ position: 'absolute', flexDirection: 'row', height: 50, width: deviceWidth, bottom: 0, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: -10 }}>
                                                {this.state.imageList.map((image, index) => {
                                                    return (
                                                        <View style={{ backgroundColor: position == index ? AppColors.toolbarColor : 'white', height: 8, width: 8, marginRight: 5, borderRadius: 5 }} />
                                                    );
                                                })}
                                            </View>
                                        )}
                                    /> */}
                                </TouchableOpacity> :
                                <View style={{ height: '30%' }}>
                                    <Image source={require('../Images/logo_final.png')} style={{ width: deviceWidth, height: 150 }} resizeMode='cover' />
                                </View>
                            }


                            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, right: 0, marginBottom: 8, marginRight: 10 }}>
                                {/* <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 30, borderColor: AppColors.toolbarColor, borderWidth: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', bottom: 0 }}>
                                    <MaterialCommunityIcons name='eye' color={AppColors.toolbarColor} size={20} />
                                </TouchableOpacity> */}
                                {/* <TouchableOpacity
                                    style={{ marginLeft: 8, width: 40, height: 40, borderRadius: 40, borderColor: AppColors.toolbarColor, borderWidth: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', bottom: 0 }}
                                    onPress={() => this.downloadImage()}
                                >
                                    <MaterialCommunityIcons name='download' color={AppColors.toolbarColor} size={20} />
                                </TouchableOpacity> */}
                            </View>
                        </View>
                        <Elavation
                            elevation={3}
                            style={{ width: deviceWidth, height: 50, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 16, color: AppColors.white }}>Container Details</Text>
                        </Elavation>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                            {/* {isCallingWithoutLogin ?
                                null
                                : <View style={{ flex: 1 }}>
                                    <View style={styles.detailMainViewStyle}>
                                        <Text style={styles.detailHeadingTxtStyle}>Booking ID : </Text>
                                        <Text style={styles.detailValueTxtStyle}>{exportObj.booking_number}</Text>
                                    </View>
                                    <View style={styles.dividerStyleView} />
                                </View>
                            } */}

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>ContainerNo ID : </Text>
                                <Text style={styles.detailValueTxtStyle}>{exportObj.container_number}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Port of loading: </Text>
                                <Text style={styles.detailValueTxtStyle}>{exportObj.port != undefined && exportObj.port != null && exportObj.port.port_name != null && exportObj.port.port_name != '' ? exportObj.port.port_name : '-'}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />


                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Export Date: </Text>
                                <Text style={styles.detailValueTxtStyle}>{exportObj.export_date}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />


                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Port of discharge: </Text>
                                <Text style={styles.detailValueTxtStyle}>{exportObj.portOfDischarge != undefined && exportObj.portOfDischarge != null && exportObj.portOfDischarge.port_name != null && exportObj.portOfDischarge.port_name != '' ? exportObj.portOfDischarge.port_name : '-'}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>ETA: </Text>
                                <Text style={styles.detailValueTxtStyle}>{exportObj.eta}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />

                            {/* {isCallingWithoutLogin ?
                                null
                                : <View style={{ flex: 1 }}>
                                    <View style={styles.detailMainViewStyle}>
                                        <Text style={styles.detailHeadingTxtStyle}>Loading Date : </Text>
                                        <Text style={styles.detailValueTxtStyle}>{exportObj.loading_date}</Text>
                                    </View>
                                    <View style={styles.dividerStyleView} />
                                </View>
                            } */}


                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Arrived Date : </Text>
                                <Text style={styles.detailValueTxtStyle}>{exportObj.arrivalDate != null ? exportObj.arrivalDate : '-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} />

                            {/* // <View style={styles.detailMainViewStyle}>
                            //     <Text style={styles.detailHeadingTxtStyle}>Destination : </Text>
                            //     <Text style={styles.detailValueTxtStyle}>{exportObj.special_instruction}</Text>
                            // </View>
                            // <View style={styles.dividerStyleView} /> */}

                            {/* <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Location : </Text>
                                <Text style={styles.detailValueTxtStyle}>{exportObj.destination}</Text>
                            </View>
                            <View style={styles.dividerStyleView} /> */}

                            {/* <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Invoice Amount : </Text>
                                <Text style={styles.detailValueTxtStyle}>{'-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Paid Amount : </Text>
                                <Text style={styles.detailValueTxtStyle}>{'-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Balance Amount : </Text>
                                <Text style={styles.detailValueTxtStyle}>-</Text>
                            </View>
                            <View style={styles.dividerStyleView} /> */}

                            {/* {isCallingWithoutLogin ?
                                null
                                : <View style={{ flex: 1 }}>
                                    <View style={styles.detailMainViewStyle}>
                                        <Text style={styles.detailHeadingTxtStyle}>Note : </Text>
                                        <Text style={styles.detailValueTxtStyle}>{exportObj.special_instruction}</Text>
                                    </View>
                                    <View style={styles.dividerStyleView} />
                                </View>} */}
                            <View style={{ flex: 1 }}>
                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Note : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{exportObj.special_instruction}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />
                            </View>

                            {/* {isCallingWithoutLogin ? null
                                : <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Bill Of Lading : </Text>
                                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}
                                        onPress={() => this.downloadBill(1)}
                                    >
                                        <Text style={[styles.detailValueTxtStyle, { flex: 0, marginRight: 10 }]}>DOWNLOAD</Text>
                                        <MaterialCommunityIcons name='download' color={AppColors.textColor} size={15} />
                                    </TouchableOpacity>
                                </View>}

                            {isCallingWithoutLogin ? null :
                                <View style={styles.dividerStyleView} />
                            }

                            {isCallingWithoutLogin ? null :
                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Manifest : </Text>
                                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', paddingTop: 5 }}
                                        onPress={() => this.downloadBill(2)}
                                    >
                                        <Text style={[styles.detailValueTxtStyle, { flex: 0, marginRight: 10 }]}>DOWNLOAD</Text>
                                        <MaterialCommunityIcons name='download' color={AppColors.textColor} size={15} />
                                    </TouchableOpacity>

                                </View>
                            }
                            {isCallingWithoutLogin ? null :
                                <View style={styles.dividerStyleView} />
                            } */}

                        </View>
                        <Elavation
                            elevation={3}
                            style={{ width: deviceWidth, height: 50, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 16, color: AppColors.white }}>Vehicle</Text>
                        </Elavation>
                        <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', height: 30, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 14, flex: 1 }}>YEAR</Text>
                            <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 14, flex: 1 }}>MAKE</Text>
                            <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 14, flex: 1 }}>MODEL</Text>
                            <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 14, flex: 1 }}>LOT NO</Text>
                            <View style={{ width: 18, height: 1 }} />
                        </View>

                        <FlatList
                            style={{ flex: 1, marginLeft: 10, marginRight: 10 }}
                            data={this.state.vehicleList}
                            renderItem={this.renderMyVehileList}
                            keyExtractor={(item, index) => index}
                            extraData={this.state}
                            ItemSeparatorComponent={() => <View style={{ width: deviceWidth, height: 1, backgroundColor: AppColors.toolbarColor }} />}
                        />
                    </View>
                </ScrollView>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: AppColors.white
    }, detailMainViewStyle: {
        flexDirection: 'row',
        flex: 1, width: deviceWidth * 0.85,
        alignContent: 'center', alignItems: 'center', justifyContent: 'center'
    }, detailHeadingTxtStyle: {
        fontFamily: AppFonts.JosefinSansSemiBold,
        fontSize: 14,
        color: AppColors.textColor, flex: 0.95,

    }, detailValueTxtStyle: {
        fontFamily: AppFonts.SourceSansProRegular,
        fontSize: 14,
        color: AppColors.textColor, flex: 1
    },
    dividerStyleView: {
        width: deviceWidth * 0.85, height: 1, backgroundColor: '#A9A9A9', marginTop: 13, marginBottom: 8
    },
})
export default ExportDetailsScreen;

