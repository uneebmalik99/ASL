import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Elavation from '../styles/Elavation';
import NetInfo from "@react-native-community/netinfo";
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toolbar from './Toolbar';

import moment from "moment";

let invoceObj = null;
let vehicleModelYear = ''
class AccountDetailsScreen extends Component {
    constructor(props) {
        super(props)
        invoceObj = this.props.navigation.state.params.invoceObj;
        if (invoceObj != undefined && invoceObj != null) {
            let yearVal = invoceObj.vehicle.year != '' ? invoceObj.vehicle.year + ' / ' : ' - '
            let makeVal = invoceObj.vehicle.make != '' ? invoceObj.vehicle.make + ' / ' : ' - '
            let modelVal = invoceObj.vehicle.model != '' ? invoceObj.vehicle.model + ' / ' : ' - '
            vehicleModelYear = yearVal + makeVal + modelVal;

            var dateString = moment.unix(invoice_date).format("MM/DD/YYYY");
            console.log('dsvadhjsadhjabdhjas ', dateString)
        }

        this.state = {
            isLoadScreen: false
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this._handleConnectivityChange
        );

        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected == true) {
                this.setState({ isLoadScreen: true })
            }
            else {
                this.setState({ isLoadScreen: false })
                AppConstance.APP_PROPS.navigation.navigate('NoInternetConnectionFoundScreen')
            }

        });

    }


    _handleConnectivityChange = (isConnected) => {
        if (isConnected) {
            this.setState({ isLoadScreen: true })
        } else {
            AppConstance.APP_PROPS.navigation.navigate('NoInternetConnectionFoundScreen')
        }
    }


    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    <Toolbar headerName={'Invoice Detail'} isFilterIconShow={true} isInnerScreen={true} />
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flexGrow: 1 }}>
                        <View style={{ width: deviceWidth, height: '30%' }}>
                            <Image source={{ uri: AppConstance.BASE_IMAGE_PATH + invoceObj.export.export_invoice }} style={{ width: undefined, height: undefined, flex: 1 }} />
                            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0, right: 0, marginBottom: 8, marginRight: 10 }}>
                                <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 30, borderColor: AppColors.toolbarColor, borderWidth: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', bottom: 0 }}>
                                    <MaterialCommunityIcons name='eye' color={AppColors.toolbarColor} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 8, width: 40, height: 40, borderRadius: 40, borderColor: AppColors.toolbarColor, borderWidth: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', bottom: 0 }}>
                                    <MaterialCommunityIcons name='download' color={AppColors.toolbarColor} size={20} />
                                </TouchableOpacity>
                            </View>

                        </View>

                        <Elavation
                            elevation={3}
                            style={{ width: deviceWidth, height: 50, backgroundColor: AppColors.toolbarColor, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 16, color: AppColors.white }}>Invoice Details</Text>
                        </Elavation>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Invoice ID : </Text>
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.invoice_number != '' ? invoceObj.invoice_number : '-'}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Invoice Issue Date : </Text>
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.invoice_date != null ? invoceObj.invoice_date : '-'}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Invoice Due Date: </Text>
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.due_date != '' ? invoceObj.due_date : '-'}</Text>
                            </View>

                            <View style={styles.dividerStyleView} />
                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Vehicle Vin : </Text>
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.vehicle_vin != null && invoceObj.vehicle_vin != '' ? invoceObj.vehicle_vin : '-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} />
                            {/* <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Vehicle Description : </Text>
                                <Text style={styles.detailValueTxtStyle}>{'-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} /> */}

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Lot No : </Text>
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.vehicle.lot_number != '' ? invoceObj.vehicle.lot_number : '-'}</Text>
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
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.vehicle.auction_name != '' ? invoceObj.vehicle.auction_name : ' - '}</Text>
                            </View>
                            <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Container No : </Text>
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.vehicle.container_number != '' ? invoceObj.vehicle.container_number : '-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} />

                            <View style={[styles.detailMainViewStyle, { marginBottom: 20 }]}>
                                <Text style={styles.detailHeadingTxtStyle}>Total Amount : </Text>
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.final_total != '' ? invoceObj.final_total : '-'}</Text>
                            </View>
                            {/* <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Vehicle Vin : </Text>
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.vehicle_vin!=null &&  invoceObj.vehicle_vin != '' ? invoceObj.vehicle_vin : '-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} />

                            <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Balance : </Text>
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.balance!=null &&  invoceObj.balance != '' ? invoceObj.balance : '-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} />

                             <View style={styles.detailMainViewStyle}>
                                <Text style={styles.detailHeadingTxtStyle}>Total Amount : </Text>
                                <Text style={styles.detailValueTxtStyle}>{invoceObj.total_amount!=null &&  invoceObj.total_amount != '' ? invoceObj.total_amount : '-'}</Text>
                            </View>
                            <View style={styles.dividerStyleView} /> */}
                        </View>
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
        fontSize: 13,
        color: AppColors.textColor, flex: 1
    },
    dividerStyleView: {
        width: deviceWidth * 0.85, height: 1, backgroundColor: '#A9A9A9', marginTop: 13, marginBottom: 8
    },
})
export default AccountDetailsScreen;

