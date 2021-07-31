import React, { Component } from 'react';
import { View, Text,ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, BackHandler,  ScrollView, TextInput, ActivityIndicator } from 'react-native'

import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import NetInfo from "@react-native-community/netinfo";
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';

import Toolbar from './Toolbar';
import InnerToolbar from './InnerToolbar';
import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalDialog from "react-native-modal";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from '../screens/DialogLoder';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../styles/ResponsiveScreen';


class AccountSectionMainScreen extends Component {
    constructor(props) {
        super(props)

        // var time = new Date();
        // time.setSeconds(1558265906)
        // var formatted = time.format("dd.mm.yyyy hh:MM:ss");
        // console.log('date and ime dad ',formatted)


        this.state = {
            tabIndex: 0,
            allInvoiceList: [
                // {
                //     'customer_user_id': '#12345',
                //     'total_amount': '$10,000',
                //     'paid_amount': '$5000',
                // }, {
                //     'customer_user_id': '#11111',
                //     'total_amount': '$10,000',
                //     'paid_amount': '$5000',
                // }, {
                //     'customer_user_id': '#22222',
                //     'total_amount': '$10,000',
                //     'paid_amount': '$5000',
                // }, {
                //     'customer_user_id': '#33333',
                //     'total_amount': '$10,000',
                //     'paid_amount': '$5000',
                // }
            ],
            unpaidInvoiceList: 
                {

                }
            ,
            paidInvoiceList: [],
            isLoading: false,
            paymentHistoryList: [],
            balancePrice: 0,

            allPagination: 1,
            unPaidPage: 1,
            paidPage: 1,
            paymentHistorypage: 1,

            allPageServiceCallStop: false,
            allFooterCalling: false,

            unPaidServiceCallStop: false,
            unPaidFooterCalling: false,

            paidServiceCallStop: false,
            paidFooterCalling: false,

            paymentHisServiceCallStop: false,
            paymentHisFooterCalling: false
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
     
            this.props.navigation.pop();
            return true;
        
    }

    //calling invoice Api
    callingInvoceAPI = (tabIndex) => {
        this.setState({ allInvoiceList: [], isLoading: true })
        let url = '';
        if (tabIndex == 3) {

            this.callingPaymentHistoryAPI()
        } else {
            if (tabIndex == 0) {
                url = AppUrlCollection.INVOICE
                console.log('url Change ::', url)
                alert('sdkvn')
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authkey': AppConstance.USER_INFO.USER_TOKEN
                    },
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('Invocie ::', responseJson)
                        if (responseJson.status == AppConstance.API_SUCESSCODE) {
    
                            // for (let index = 0; index < responseJson.data.length; index++) {
                            //     const element = responseJson.data[index];
                            //     let totalpaid = element.total_amount != null && element.total_amount != '' ? parseInt(element.total_amount) : 0
                            //     let paid = element.paid_amount != null && element.paid_amount != '' ? parseInt(element.paid_amount) : 0
                            //     if (paid == 0) {
                            //         console.log('My Value ::: 1 ', totalpaid, paid, totalpaid > paid)
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else if (paid < totalpaid) {
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else {
                            //         tshis.state.paidInvoiceList.push(element)
                            //     }
                            // }
    
    
                            this.setState({ allInvoiceList: responseJson.data, isLoading: false })
    
    
    
    
                        } else {
                            AppConstance.showSnackbarMessage(responseJson.message)
                            this.setState({ isLoading: false })
                        }
                    })
                    .catch((error) => {
                        console.warn(error)
                    });
            } else if (tabIndex == 1) {
                url = AppUrlCollection.INVOICE + 'status=1'
                console.log('url Change ::', url)
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authkey': AppConstance.USER_INFO.USER_TOKEN
                    },
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('Invocie ::', responseJson)
                        if (responseJson.status == AppConstance.API_SUCESSCODE) {

                            // for (let index = 0; index < responseJson.data.length; index++) {
                            //     const element = responseJson.data[index];
                            //     let totalpaid = element.total_amount != null && element.total_amount != '' ? parseInt(element.total_amount) : 0
                            //     let paid = element.paid_amount != null && element.paid_amount != '' ? parseInt(element.paid_amount) : 0
                            //     if (paid == 0) {
                            //         console.log('My Value ::: 1 ', totalpaid, paid, totalpaid > paid)
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else if (paid < totalpaid) {
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else {
                            //         this.state.paidInvoiceList.push(element)
                            //     }
                            // }
    
    alert('dvjv')
    this.props.navigation.navigate('All', { 'itemObj': responseJson })
                            
                           //this.setState({ unpaidInvoiceList: responseJson.data, isLoading: false })
    
    
    
    
                        } else {
                            AppConstance.showSnackbarMessage(responseJson.message)
                            this.setState({ isLoading: false })
                        }
                    })
                    .catch((error) => {
                        console.warn(error)
                    });
            } else if (tabIndex == 2) {
                url = AppUrlCollection.INVOICE + 'status=3'
                console.log('url Change ::', url)
                alert('sdkvn')
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authkey': AppConstance.USER_INFO.USER_TOKEN
                    },
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log('Invocie ::', responseJson)
                        if (responseJson.status == AppConstance.API_SUCESSCODE) {
    
                            // for (let index = 0; index < responseJson.data.length; index++) {
                            //     const element = responseJson.data[index];
                            //     let totalpaid = element.total_amount != null && element.total_amount != '' ? parseInt(element.total_amount) : 0
                            //     let paid = element.paid_amount != null && element.paid_amount != '' ? parseInt(element.paid_amount) : 0
                            //     if (paid == 0) {
                            //         console.log('My Value ::: 1 ', totalpaid, paid, totalpaid > paid)
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else if (paid < totalpaid) {
                            //         this.state.unpaidInvoiceList.push(element)
                            //     } else {
                            //         tshis.state.paidInvoiceList.push(element)
                            //     }
                            // }
    
    
                            this.setState({ allInvoiceList: responseJson.data, isLoading: false })
    
    
    
    
                        } else {
                            AppConstance.showSnackbarMessage(responseJson.message)
                            this.setState({ isLoading: false })
                        }
                    })
                    .catch((error) => {
                        console.warn(error)
                    });
            }
           
        }

    }

    callingPaymentHistoryAPI = () => {


        fetch(AppUrlCollection.PAYMENT_HISTORY, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("sdbsdbjdv","response ok");

                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                this.setState({ paymentHistoryList: [] })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    console.log('payment histtot :: ', responseJson)
                    alert('done')
                    this.setState({ paymentHistoryList: responseJson.data.history, balancePrice: responseJson.data.balance })
                } else {
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //Check internet connection
  



    //render invoice conetent
    renderInvoiceContent = ({ item, index }) => {
        var statusText = '-';
        if (item.status == '1') {
            statusText = 'Unpaid'
        } else if (item.status == '2') {
            statusText = 'Partial paid'
        } else if (item.status == '3') {
            statusText = 'Paid'
        }
        return <Elavation
            elevation={2}
            style={{ width: deviceWidth * 0.90, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
        >
            <TouchableOpacity style={{ width: deviceWidth * 0.3, height: 80 }}
            >
                {item.vehicle.image != null && item.vehicle.image.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
                    source={{ uri: item.vehicle.image[0].image }} /> :
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} resizeMode='contain' />}

            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                onPress={() => this.props.navigation.navigate('InvoiceDetailsScreen', { 'invoceObj': item, 'isCallingAccountScreen': true })}
            >
                <Text style={{
                    fontFamily: AppFonts.JosefinSansSemiBold,
                    color: this.state.tabIndex == 0 ? 'red' : this.state.tabIndex == 1 ? 'red' : 'green', fontSize: 13
                }}>
                    {item.id != '' ? 'Invoice ID # ' + item.id : '-'}</Text>
                <Text style={{
                    fontFamily: AppFonts.JosefinSansRegular,
                    color: this.state.tabIndex == 0 ? 'red' : this.state.tabIndex == 1 ? 'red' : 'green', fontSize: 12
                }}>{item.status != '' && item.status != null ? 'Status : ' + statusText : 'Status : - '}</Text>
                <Text style={{
                    fontFamily: AppFonts.JosefinSansRegular,
                    color: this.state.tabIndex == 0 ? 'red' : this.state.tabIndex == 1 ? 'red' : 'green',
                    fontSize: 12
                }}>{item.final_total != ' ' && item.final_total != null ? 'Total Amount : ' + item.final_total : 'Total Amount : - '}</Text>
            </TouchableOpacity>
        </Elavation>
    }

    //render invoice conetent
    renderpaymentHistoryContent = ({ item, index }) => {
        return <Elavation
            elevation={2}
            style={{ width: deviceWidth * 0.90, flex: 1, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
        >
            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
            >
                <View style={{ flexDirection: 'row', marginRight: 10, paddingTop: 3, paddingBottom: 3 }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignContent: 'center', }}>
                        <Text style={{
                            fontFamily: AppFonts.JosefinSansBold,
                            color: AppColors.textColor,
                            fontSize: 12,
                        }}>Payment Date : </Text>
                        <Text style={{
                            fontFamily: AppFonts.JosefinSansRegular,
                            color: AppColors.textColor,
                            fontSize: 12
                        }} numberOfLines={1}>{item.created_at != ' ' && item.created_at != null ? item.created_at : ' - '}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{
                            fontFamily: AppFonts.JosefinSansBold,
                            color: AppColors.textColor,
                            fontSize: 12,
                        }}>Voucher NO : </Text>
                        <Text style={{
                            fontFamily: AppFonts.JosefinSansRegular,
                            color: AppColors.textColor,
                            fontSize: 12
                        }} numberOfLines={1}>{item.voucher_no != ' ' && item.voucher_no != null ? item.voucher_no : ' - '}</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', marginRight: 10, paddingBottom: 3 }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignContent: 'center' }}>
                        <Text style={{
                            fontFamily: AppFonts.JosefinSansBold,
                            color: AppColors.textColor,
                            fontSize: 12
                        }}>Method : </Text>
                        <Text style={{
                            fontFamily: AppFonts.JosefinSansRegular,
                            color: AppColors.textColor,
                            fontSize: 12
                        }}>{item.payment_method != null ? item.payment_method : ' - '}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        <Text style={{
                            fontFamily: AppFonts.JosefinSansBold,
                            color: AppColors.textColor,
                            fontSize: 12
                        }}>Amount : </Text>
                        <Text style={{
                            fontFamily: AppFonts.JosefinSansRegular,
                            color: AppColors.textColor,
                            fontSize: 12
                        }}>{item.debit_amount != ' ' && item.debit_amount != null ? item.debit_amount : ' - '}</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignContent: 'center', paddingBottom: 3 }}>
                    <Text style={{
                        fontFamily: AppFonts.JosefinSansBold,
                        color: AppColors.textColor,
                        fontSize: 12
                    }}>Ref. NO. : </Text>
                    <Text style={{
                        fontFamily: AppFonts.JosefinSansRegular,
                        color: AppColors.textColor, fontSize: 12
                    }}>{item.ref_id != '' && item.ref_id != null ? item.ref_id : ' - '}</Text>
                </View>

                <View style={{ width: deviceWidth * 0.75, flexDirection: 'row', alignContent: 'center', paddingBottom: 3 }}>
                    <Text style={{
                        fontFamily: AppFonts.JosefinSansBold,
                        color: AppColors.textColor,
                        fontSize: 12
                    }}>Note : </Text>
                    <Text style={{
                        fontFamily: AppFonts.JosefinSansRegular,
                        color: AppColors.textColor, fontSize: 12, lineHeight: 20
                    }}>{item.note != '' && item.note != null ? item.note : ' - '}</Text>
                </View>


                {/* <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    <Text style={{
                        fontFamily: AppFonts.JosefinSansRegular,
                        color: AppColors.textColor,
                        fontSize: 12, flex: 1
                    }}>{item.debit_account != ' ' && item.debit_account != null ? 'Debit Account : ' + item.debit_account : 'Debit Account : - '}
                    </Text>

                    <Text style={{
                        fontFamily: AppFonts.JosefinSansRegular,
                        color: AppColors.textColor,
                        fontSize: 12
                    }}>{item.credit_amount != ' ' && item.credit_amount != null ? 'Credit Amount : ' + item.credit_amount : 'Credit Amount :  - '}</Text>


                </View>

                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                    <Text style={{
                        fontFamily: AppFonts.JosefinSansRegular,
                        color: AppColors.textColor,
                        fontSize: 12, flex: 1
                    }}>{item.credit_account != ' ' && item.credit_account != null ? 'Credit Account : ' + item.credit_account : 'Credit Account :  - '}</Text>


                    <Text style={{
                        fontFamily: AppFonts.JosefinSansRegular,
                        color: AppColors.textColor,
                        fontSize: 12
                    }}>{item.debit_amount != ' ' && item.debit_amount != null ? 'Debit Amount : ' + item.debit_amount : 'Debit Amount :  - '}</Text>
                </View> */}
            </TouchableOpacity>
        </Elavation>
    }

    callingTabApi = (tabIndex) => {
        this.setState({
            tabIndex: tabIndex,
            allPageServiceCallStop: false, paidServiceCallStop: false, unPaidServiceCallStop: false, allPagination: 1, unPaidPage: 1, paidPage: 1,
            paymentHisServiceCallStop: false, paymentHistorypage: 1
        })
        console.log('Invoice APi Calling :', tabIndex)
        setTimeout(() => {
            this.callingInvoceAPI(tabIndex)
        }, 200)

    }

    //load more
    loadMoreDataAll = () => {
        setTimeout(() => {
            if (this.state.allPageServiceCallStop) {
            } else {
                if (this.state.noMoreDataFound) {
                } else {
                    this.setState({ allPagination: this.state.allPagination + 1 }, () => this.callingAllInvoceAPI())
                }
            }
        }, 100)
    }


    //load more unpaid data
    loadMoreDataUnpaid = () => {
        setTimeout(() => {
            if (this.state.unPaidServiceCallStop) {
            } else {
                if (this.state.noMoreDataFound) {
                } else {
                    this.setState({ unPaidPage: this.state.unPaidPage + 1 }, () => this.callingUnpaidInvoceAPI())
                }
            }
        }, 100)
    }

    //load more data paid
    loadMoreDataPaid = () => {
        setTimeout(() => {
            if (this.state.paidServiceCallStop) {
            } else {
                if (this.state.noMoreDataFound) {
                } else {
                    this.setState({ paidPage: this.state.paidPage + 1 }, () => this.callingPaidInvoceAPI())
                }
            }
        }, 100)
    }

    //load more data paid
    loadMorePaymentHistory = () => {
        setTimeout(() => {
            if (this.state.paymentHisServiceCallStop) {
            } else {
                if (this.state.noMoreDataFound) {
                } else {
                    this.setState({ paymentHistorypage: this.state.paymentHistorypage + 1 }, () => this.callingPaymentHostoryAPI())
                }
            }
        }, 100)
    }

    callingAllInvoceAPI = () => {
        let url = '';
        url = AppUrlCollection.INVOICE + 'page=' + this.state.allPagination
        console.log('url Change ::NewDost', url)
        this.setState({ allFooterCalling: true, unPaidFooterCalling: false, paidFooterCalling: false })
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                this.setState({ allFooterCalling: false, unPaidFooterCalling: false, })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    //allInvoiceList: this.state.allInvoiceList.concat(responseJson.data),
                    this.setState({
                        allInvoiceList: [...this.state.allInvoiceList, ...responseJson.data],
                        unpaidInvoiceList: this.state.unpaidInvoiceList, paidInvoiceList: this.state.paidInvoiceList,
                        allPageServiceCallStop: false,
                        allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: false
                    })
                } else {
                    this.setState({ allPageServiceCallStop: true, paidFooterCalling: false })
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    callingUnpaidInvoceAPI = () => {
        let url = '';
        url = AppUrlCollection.INVOICE + 'page=' + this.state.unPaidPage + '&status=1'
        this.setState({ allFooterCalling: false, unPaidFooterCalling: true, paidFooterCalling: false })
        console.log('url Change ::NewDost', url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                this.setState({ allFooterCalling: false, unPaidFooterCalling: false, })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({
                        //allInvoiceList: this.state.allInvoiceList.concat(responseJson.data),
                        allInvoiceList: [...this.state.allInvoiceList, ...responseJson.data],
                        unpaidInvoiceList: this.state.unpaidInvoiceList,
                        paidInvoiceList: this.state.paidInvoiceList,
                        unPaidServiceCallStop: false,
                        paidFooterCalling: false
                    })
                } else {

                    this.setState({ unPaidServiceCallStop: true })
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //calling paid api
    callingPaidInvoceAPI = () => {
        let url = AppUrlCollection.INVOICE + 'page=' + this.state.paidPage + '&status=3'
        this.setState({ allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: true })
        console.log('paid API Caliing ::', url)
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                this.setState({ allFooterCalling: false, unPaidFooterCalling: false, })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({
                        //   allInvoiceList: this.state.allInvoiceList.concat(responseJson.data),
                        allInvoiceList: [...this.state.allInvoiceList, ...responseJson.data],
                        unpaidInvoiceList: this.state.unpaidInvoiceList,
                        paidInvoiceList: this.state.paidInvoiceList,
                        paidServiceCallStop: false,
                        paidFooterCalling: false
                    })
                } else {
                    this.setState({ paidServiceCallStop: true, paidFooterCalling: false })
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    callingPaymentHistoryAPI = () => {
        this.setState({ paymentHisFooterCalling: true })
        console.log('payment_historyv::', AppUrlCollection.PAYMENT_HISTORY + '?page=' + this.state.paymentHistorypage, AppConstance.USER_INFO.USER_TOKEN)
        fetch(AppUrlCollection.PAYMENT_HISTORY + '?page=' + this.state.paymentHistorypage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    console.log('payment histtot sdadada:: ', responseJson)
                    if (responseJson.data.history.length > 0) {
                        this.setState({
                            paymentHistoryList: this.state.paymentHistoryList.concat(responseJson.data.history),
                            balancePrice: responseJson.data.balance,
                            paymentHisServiceCallStop: false,
                            paymentHisFooterCalling: false
                        })
                    } else {
                        this.setState({ paymentHisServiceCallStop: true, paymentHisFooterCalling: true })
                        //AppConstance.showSnackbarMessage(responseJson.message)
                    }

                } else {
                    this.setState({ paymentHisServiceCallStop: true, paymentHisFooterCalling: true })
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    renderFooterAll = () => {
        if (this.state.allPageServiceCallStop) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }

        // if (this.state.allFooterCalling) {
        //     return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        // } else {
        //     return null;
        // }
    }

    renderFooterUnpaid = () => {
        if (this.state.unPaidServiceCallStop) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }
    }

    renderFooterPaid = () => {
        if (this.state.paidServiceCallStop) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }
    }

    renderPaymentHist = () => {
        if (this.state.paymentHisServiceCallStop) {
            return null;
        } else {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        }
    }

    generateFlatList = () => {
        if (this.state.tabIndex == 0) {
            if (this.state.allInvoiceList.length > 0) {
                return <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ paddingTop: 5 }}
                        data={this.state.allInvoiceList}
                        renderItem={this.renderInvoiceContent}
                        keyExtractor={(item, index) => index}
                        extraData={this.state}
                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                        extraData={this.state}
                        ListFooterComponent={this.renderFooterAll}
                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                        onEndReached={this.loadMoreDataAll}
                        // onEndThreshold={0.1}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            } else {
                return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 15 }}>Account Not Found</Text>
                </View>
            }
        } else if (this.state.tabIndex == 1) {
            if (this.state.allInvoiceList.length > 0) {
                return <View style={{ flex: 1 }}>
                    {/* <FlatList
                        style={{ paddingTop: 5 }}
                        data={this.state.allInvoiceList}
                        renderItem={this.renderInvoiceContent}
                        keyExtractor={(item, index) => index}
                        extraData={this.state}
                        ListFooterComponent={this.renderFooterUnpaid}
                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                        onEndReached={this.loadMoreDataUnpaid}
                        // onEndThreshold={0}
                        onEndReachedThreshold={0.5}
                    /> */}
                </View>
            } else {
                return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 15 }}>Invoice Not Found</Text>
                </View>
            }
        }
        else if (this.state.tabIndex == 2) {
            if (this.state.allInvoiceList.length > 0) {
                return <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ paddingTop: 5 }}
                        data={this.state.allInvoiceList}
                        renderItem={this.renderInvoiceContent}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={this.renderFooterPaid}
                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                        onEndReached={this.loadMoreDataPaid}
                        // onEndThreshold={0}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            } else {
                return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 15 }}>Invoice Not Found</Text>
                </View>
            }
        } else if (this.state.tabIndex == 3) {
            if (this.state.paymentHistoryList.length > 0) {
                return <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Elavation
                            elevation={3}
                            style={styles.searchElavationStyle}>
                            <View style={styles.searchElvationViewStyle}>
                                <TextInput style={styles.searchTxtInputStyle}
                                    placeholder='Search'
                                    placeholderTextColor={AppColors.toolbarColor}
                                    selectionColor={AppColors.toolbarColor}
                                    onChangeText={(text) => this.setState({ searchTxt: text })}
                                    onSubmitEditing={() => this.callingSearchAPI()}
                                    returnKeyType='search'
                                />
                                <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                            </View>
                        </Elavation>

                        <Elavation
                            elevation={5}
                            style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginLeft: 5, height: 48, flex: 0.2, marginRight: 15, alignSelf: 'center', marginTop: 8 }}
                        >
                            <Text style={{ fontFamily: AppFonts.SourceSansProBold, color: AppColors.textColor, fontSize: 13 }}>Balance</Text>
                            <Text style={{ fontFamily: AppFonts.SourceSansProBold, color: AppColors.textColor, fontSize: 14 }}>{this.state.balancePrice}</Text>
                        </Elavation>

                    </View>

                    <FlatList
                        style={{ paddingTop: 5 }}
                        data={this.state.paymentHistoryList}
                        renderItem={this.renderpaymentHistoryContent}
                        keyExtractor={(item, index) => index}
                        ListFooterComponent={this.renderPaymentHist}
                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                        onEndReached={this.loadMorePaymentHistory}
                        // onEndThreshold={0}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            } else {
                return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 15 }}>Payment History Not Found</Text>
                </View>
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <DialogLoader loading={this.state.isLoading} />
                {/* <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    <Toolbar headerName={'Account'} isFilterIconShow={true} isInnerScreen={true} />
                </View> */}

              
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
                        source={require('../Images/account-1.jpg')}
                          style={{ alignSelf:'center', resizeMode:'contain',
                           height:76,}}
                        />
                <View style={{ flex: 1, marginLeft: 11 }}>


{/* <ImageBackground
source={ require('../Images/bgimage.jpeg')} 
>



</ImageBackground> */}


                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                      //  onPress={() => this.callingTabApi(0)}
                            onPress={() => this.props.navigation.navigate('All',{'tab':'0'})}>
                            <Elavation
                                elevation={5}
                                style={[styles.actionMainElavationStyle, { backgroundColor: this.state.tabIndex == 0 ? '#F8F8F8' : 'white' }]}
                            >
                                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.tabIndex == 0 ?
                                        <Image source={require('../Images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        {/* <Image source={require('../Images/invoice_icon_default_color.png')} style={styles.imageIconStyle} /> */}
                                    }
                                    <Text style={styles.headingTxtStyle}>ALL</Text>
                                </View>
                            </Elavation>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Unpaid')}>
                        
                            <Elavation
                                elevation={5}
                                style={[styles.actionMainElavationStyle, { backgroundColor: this.state.tabIndex == 1 ? '#F8F8F8' : 'white' }]}
                            >
                                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.tabIndex == 1 ?
                                        <Image source={require('../Images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        <Image source={require('../Images/invoice_icon_default_color.png')} style={styles.imageIconStyle} />
                                    }
                                    <Text style={styles.headingTxtStyle}>UNPAID</Text>
                                </View>
                            </Elavation>
                        </TouchableOpacity>

                    
                    </View>


                    <View 
                    style={{flexDirection:'row'}}>
    <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Paid')}>
                        
                            <Elavation
                                elevation={5}
                                style={[styles.actionMainElavationStyle, { backgroundColor: this.state.tabIndex == 2 ? '#F8F8F8' : 'white' }]}
                            >
                                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.tabIndex == 2 ?
                                        <Image source={require('../Images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        <Image source={require('../Images/invoice_icon_default_color.png')} style={styles.imageIconStyle} />
                                    }
                                    <Text style={styles.headingTxtStyle}>PAID</Text>
                                </View>
                            </Elavation>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('PaymentHistory')}>
                        
                            <Elavation
                                elevation={5}
                                style={[styles.actionMainElavationStyle, { backgroundColor: this.state.tabIndex == 3 ? '#F8F8F8' : 'white' }]}
                            >
                                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    {this.state.tabIndex == 3 ?
                                        <Image source={require('../Images/invoice_price_icon.png')} style={styles.imageIconStyle} /> :
                                        <Image source={require('../Images/invoice_icon_default_color.png')} style={styles.imageIconStyle} />
                                    }
                                    <Text style={[styles.headingTxtStyle, { fontSize: 12, justifyContent: 'center', textAlign: 'center' }]}>Payment History</Text>
                                </View>
                            </Elavation>
                        </TouchableOpacity>


                    </View>
                    {this.generateFlatList()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    dividerViewStyle: {
        width: deviceWidth,
        height: 0.5,
        backgroundColor: AppColors.te
    },
    actionMainElavationStyle: {
        width: wp('45%'), height: hp('15%'), borderRadius: 3, borderColor: AppColors.toolbarColor, borderWidth: 0,
        marginTop: hp('1.0%'),
        marginBottom: hp('0.5%'), marginLeft: '1.5%', marginRight: '1.5%',
    },
    imageIconStyle: {
        width: 30, height: 30
    },
    headingTxtStyle: {
        fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.Signincolor,
        fontSize: 15, paddingTop: 11,
    },
    searchElavationStyle: {
        height: 50, flex: 0.8,
        borderRadius: 10,
        marginTop: 8,
        marginLeft: 5,
        marginRight: 5,
        alignSelf: 'center'
    },
    searchElvationViewStyle: {
        flexDirection: 'row', flex: 1,
        alignContent: 'center', alignItems: 'center',
        paddingLeft: 5, marginLeft: 5,
        marginRight: 5, paddingRight: 5
    },
    searchTxtInputStyle: {
        flex: 1,
        fontFamily: AppFonts.SourceSansProRegular,
        color: AppColors.toolbarColor, fontSize: 18,
    },
    detailMainViewStyle: {
        flexDirection: 'row',
        flex: 1, width: deviceWidth * 0.85,
        alignContent: 'center', alignItems: 'center', justifyContent: 'center'
    },
})
export default AccountSectionMainScreen;