import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, BackHandler, PermissionsAndroid } from "react-native";
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toolbar from './Toolbar';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { heightPercentageToDP } from '../styles/ResponsiveScreen';
import DialogLoder from "./DialogLoder";
let invoceObj = null;

let vehicleModelYear = '';
let isCallingAccountScreen = false;
let imageList = [];
let statusTxt = '-';
import RNFetchBlob from 'react-native-fetch-blob'


var invoiceObj = '';
const { config, fs } = RNFetchBlob;
class NotificationInvoiceDetailsScreen extends Component {
    constructor(props) {
        super(props)
        invoceObj = this.props.navigation.state.params.invoceObj;
        //isCallingAccountScreen = this.props.navigation.state.params.isCallingAccountScreen;

        // if (invoceObj != undefined && invoceObj != null) {
        //     let yearVal = invoceObj.vehicle.year != '' ? invoceObj.vehicle.year + ' / ' : ' - '
        //     let makeVal = invoceObj.vehicle.make != '' ? invoceObj.vehicle.make + ' / ' : ' - '
        //     let modelVal = invoceObj.vehicle.model != '' ? invoceObj.vehicle.model : ' - '
        //     vehicleModelYear = yearVal + makeVal + modelVal;

        //     if (invoceObj.status == '1') {
        //         statusTxt = 'Unpaid'
        //     } else if (invoceObj.status == '2') {
        //         statusTxt = 'Partial paid'
        //     } else if (invoceObj.status == '3') {
        //         statusTxt = 'Paid'
        //     }
        //     for (let index = 0; index < invoceObj.vehicle.image.length; index++) {
        //         const element = invoceObj.vehicle.image[index];
        //         imageList.push(element.image)

        //     }

        //     // var dateString = moment(invoceObj.invoice_date,'DD/MM/YYYY').format();

        //     // var fulldate = new Date(1558224000);
        //     // var converted_date = moment(fulldate).format('');
        //     // console.log('dsvadhjsadhjabdhjas ',converted_date)
        // } else {

        // }

        this.state = {
            isLoadScreen: false,
            invoiceObj: '',
            isLoading:false
        }
        this.callingInvoiceData();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      



    }

    callingInvoiceData = () => {
        console.log('Invoic vie: ', AppUrlCollection.INVOICE_VIEW + 'id=' + invoceObj)
        this.setState({isLoading:true})
        fetch(AppUrlCollection.INVOICE_VIEW + 'id=' + invoceObj, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {

                console.log('invoice data ', responseJson)
                this.setState({ isLoading: false })
                //   this.setState({ vehicleList: responseJson.data.vehicle_details })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    invoiceObj = responseJson.data
                    this.setState({ invoiceObj: responseJson.data })
                    let yearVal = this.state.invoiceObj.vehicle.year != '' ? this.state.invoiceObj.vehicle.year + ' / ' : ' - '
                    let makeVal = this.state.invoiceObj.vehicle.make != '' ? this.state.invoiceObj.vehicle.make + ' / ' : ' - '
                    let modelVal = this.state.invoiceObj.vehicle.model != '' ? this.state.invoiceObj.vehicle.model : ' - '
                    vehicleModelYear = yearVal + makeVal + modelVal;

                    if (this.state.invoiceObj.status == '1') {
                        statusTxt = 'Unpaid'
                    } else if (this.state.invoiceObj.status == '2') {
                        statusTxt = 'Partial paid'
                    } else if (this.state.invoiceObj.status == '3') {
                        statusTxt = 'Paid'
                    }
                    for (let index = 0; index < this.state.invoiceObj.vehicle.image.length; index++) {
                        const element = this.state.invoiceObj.vehicle.image[index];
                        imageList.push(element.image)

                    }
                } else {
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });

    }

    getReadableDateFromTimestamp(timestamp) {
        var theDate = new Date(timestamp * 1000);
        return theDate.getDate() + "/" + (parseInt(theDate.getMonth()) + 1) + "/" + theDate.getFullYear();
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }


    handleBackPress = () => {
        this.props.navigation.goBack();
        return true;
    }

    

    callingInvoiceDoanload = () => {
        // try {
        //     const granted = PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        //     ).then((respons) => {
        //         if (respons == PermissionsAndroid.RESULTS.GRANTED) {

        //             console.log('APi CALLINGE ')

        //         } else {
        //             console.log('APi  NOT CALLINGE ')
        //         }
        //     })
        // } catch (err) {
        //     console.warn(err)
        // }

        console.log('response :: ', AppUrlCollection.DOWNLOAD_INVOICE + 'id=' + invoceObj.id)
        fetch(AppUrlCollection.DOWNLOAD_INVOICE + 'id=' + invoceObj.id, {
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
                AppConstance.showSnackbarMessage('Invoice download sucessfully.')
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
    }


    render() {
        //invoceObj.vehicle.year != '' ? invoceObj.vehicle.year : ' - ' ? invoceObj.vehicle.make != '' ? +'/ ' + invoceObj.vehicle.make : '-' ? invoceObj.vehicle.model != '' ? +' / '+invoceObj.vehicle.model :' - ' 
        return (
            <View style={styles.mainContainer}>
                <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    <Toolbar headerName={isCallingAccountScreen ? 'Account Details' : 'Invoice Detail'} isFilterIconShow={true} isInnerScreen={true} />
                </View>
                <DialogLoder loading={this.state.isLoading} />
                {this.state.invoiceObj != '' ?
                    <ScrollView style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <View style={{ flex: 1, flexGrow: 1 }}>

                            {imageList.length > 0 ?
                                <View style={{ height: heightPercentageToDP('40%'), width: deviceWidth }}>
                                    <Image style={{ width: undefined, height: undefined, flex: 1 }}
                                        source={{ uri: 'https://previews.123rf.com/images/arcady31/arcady311510/arcady31151000003/46532249-invoice-icon.jpg' }}
                                        resizeMode='cover'
                                    />
                                    {/* <ImageSlider
                            loopBothSides
                            style={{ flex: 1, height: heightPercentageToDP('30%'), }}
                            autoPlayWithInterval={3000}
                            images={imageList}
                            customSlide={({ index, item, style, width }) => (
                                // It's important to put style here because it's got offset inside
                                <View key={index} style={[style, { width: deviceWidth, flex: 1, backgroundColor: 'black' }]}>
                                    <Image source={{ uri: item }} style={{ width: undefined, height: undefined, flex: 1 }} resizeMode='cover' />
                                </View>
                            )}
                            customButtons={(position, move) => (
                                <View style={{ position: 'absolute', flexDirection: 'row', height: 50, width: deviceWidth, bottom: 0, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: -10 }}>
                                    {imageList.map((image, index) => {
                                        return (
                                            <View style={{ backgroundColor: position == index ? AppColors.toolbarColor : 'white', height: 8, width: 8, marginRight: 5, borderRadius: 5 }} />
                                        );
                                    })}
                                </View>
                            )}
                        /> */}

                                </View> :
                                <View style={{ width: deviceWidth, height: '30%' }}>
                                    <Image style={{ width: undefined, height: undefined, flex: 1 }}
                                        source={require('../Images/logo_final.png')}
                                        resizeMode='contain'
                                    />
                                    {/* {invoceObj.export != null && invoceObj.export != '' ?
                            <Image source={{ uri: AppConstance.BASE_IMAGE_PATH + invoceObj.export.export_invoice }}
                                style={{ width: undefined, height: undefined, flex: 1 }} /> :
                            <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../../Images/logo_final.png')} />
                        } */}
                                </View>
                            }
                            <TouchableOpacity
                                style={{ width: 30, height: 30, position: 'absolute', right: 0, margin: 10, borderRadius: 30, borderColor: AppColors.toolbarColor, borderWidth: 2, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                                onPress={() => this.callingInvoiceDoanload()}
                            >
                                <MaterialCommunityIcons name='download' color={AppColors.toolbarColor} size={20} />
                            </TouchableOpacity>

                            <Elavation
                                elevation={3}
                                style={{ width: deviceWidth, height: 50, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 16, color: AppColors.white }}>{isCallingAccountScreen ? 'Account Details ' : 'Invoice Details'}  </Text>
                            </Elavation>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Invoice ID : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.invoice_number != '' ? this.state.invoiceObj.invoice_number : '-'}</Text>
                                </View>

                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Invoice Issue Date : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.invoice_date != null ? this.state.invoiceObj.invoice_date : '-'}</Text>
                                </View>

                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Invoice Due Date : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.due_date != '' ? this.state.invoiceObj.due_date : '-'}</Text>
                                </View>

                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Vehicle Vin : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.vehicle.vin != null && this.state.invoiceObj.vehicle.vin != '' ? this.state.invoiceObj.vehicle.vin : '-'}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Lot No : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.vehicle.lot_number != '' ? this.state.invoiceObj.vehicle.lot_number : '-'}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />

                                {/* // <View style={styles.detailMainViewStyle}>
                    //     <Text style={styles.detailHeadingTxtStyle}>Destination : </Text>
                    //     <Text style={styles.detailValueTxtStyle}>{exportObj.special_instruction}</Text>
                    // </View>
                    // <View style={styles.dividerStyleView} /> */}

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Year/Make/Model : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{vehicleModelYear}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Auction : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.vehicle.auction_name != '' ? this.state.invoiceObj.vehicle.auction_name : ' - '}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Container NO : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.vehicle.container_number != '' ? this.state.invoiceObj.vehicle.container_number : '-'}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Total Amount : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.final_total != '' ? this.state.invoiceObj.final_total : '-'}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Amount Paid: </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.paid_amount != null && this.state.invoiceObj.paid_amount != '' ? this.state.invoiceObj.final_total : '-'}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Balance : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.balance_due != '' ? this.state.invoiceObj.balance_due : '-'}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Note : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.customer != null && this.state.invoiceObj.customer.note != null && this.state.invoiceObj.customer.note != '' ? this.state.invoiceObj.customer.note : '-'}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Status : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{statusTxt}</Text>
                                </View>
                                <View style={styles.dividerStyleView} />

                                <View style={styles.detailMainViewStyle}>
                                    <Text style={styles.detailHeadingTxtStyle}>Invoice : </Text>
                                    <Text style={styles.detailValueTxtStyle}>{this.state.invoiceObj.final_total != '' ? this.state.invoiceObj.final_total : '-'}</Text>
                                </View>
                                <View style={[styles.dividerStyleView, { marginBottom: 100 }]} />

                            </View>

                        </View>
                    </ScrollView>
                    : null
                }

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
export default NotificationInvoiceDetailsScreen;

