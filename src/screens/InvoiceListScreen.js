import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, BackHandler, ActivityIndicator, TextInput } from 'react-native'
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import Toolbar from './Toolbar';
import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from '../screens/DialogLoder';

let tabIndexApiCall = 0;
class InvoiceListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0,
            allInvoiceList: [],
            unpaidInvoiceList: [],
            paidInvoiceList: [],
            isLoading: false,
            searchTxt: '',
            allPagination: 0,
            unPaidPage: 0,
            paidPage: 0,
            allPageServiceCallStop: false,
            allFooterCalling: false,

            unPaidServiceCallStop: false,
            unPaidFooterCalling: false,

            paidServiceCallStop: false,
            paidFooterCalling: false,

        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
      
        this.props.navigation.goBack();
        return true;    }

    //calling invoice Api
    callingInvoceAPI = (tabIndex) => {
        this.setState({ isLoading: true })
        let url = '';
        if (tabIndex == 0) {
            url = AppUrlCollection.INVOICE + 'page=1'
        } else if (tabIndex == 1) {
            url = AppUrlCollection.INVOICE + 'status=1'
        } else if (tabIndex == 2) {
            url = AppUrlCollection.INVOICE + 'status=3'
        }
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
                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                this.setState({ allInvoiceList: [] })
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
                    this.setState({
                        allInvoiceList: responseJson.data, unpaidInvoiceList: this.state.unpaidInvoiceList,
                        paidInvoiceList: this.state.paidInvoiceList, allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: false
                    })
                } else {
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }


    //Check internet connection
   

    onTabChange = (event) => {
        this.setState({ tabIndex: event.i })
        this.callingInvoceAPI(event.i);
    }

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
            style={{ width: deviceWidth * 0.95, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
        >
            <TouchableOpacity style={{ width: deviceWidth * 0.3, height: 80 }}
            >
                {item.vehicle.image != null && item.vehicle.image.length > 0 ?
                    <Image style={{ width: undefined, height: undefined, flex: 1 }}
                        source={{ uri: item.vehicle.image[0].image }} /> :
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')}
                        resizeMode='contain'
                    />
                }

            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                onPress={() => this.props.navigation.navigate('InvoiceDetailsScreen', { 'invoceObj': item, })}
            >
                <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, color: AppColors.textColor, fontSize: 13 }}>{item.invoice_number != '' ? 'Invoice ID # ' + item.invoice_number : ' -'}</Text>
                <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{item.status != '' && item.status != null ? 'Status : ' + statusText : 'Status : - '}</Text>
                <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{item.final_total != '' && item.final_total != null ? 'Total Amount : ' + item.final_total : 'Total Amount : - '}</Text>
            </TouchableOpacity>
        </Elavation>
    }

    callingSearchAPI = () => {
        this.setState({ isLoading: false })
        let url = '';
        if (this.state.tabIndex == 0) {
            url = AppUrlCollection.INVOICE + 'invoice_no=' + this.state.searchTxt
        } else if (this.state.tabIndex == 1) {
            url = AppUrlCollection.INVOICE + 'status=1&invoice_no=' + this.state.searchTxt
        } else if (this.state.tabIndex == 2) {
            url = AppUrlCollection.INVOICE + 'status=3&invoice_no=' + this.state.searchTxt
        }
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
                this.setState({ isLoading: false })
                console.log('Invocie ::', responseJson)
                this.setState({ allInvoiceList: [] })
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
                    this.setState({
                        allInvoiceList: responseJson.data, unpaidInvoiceList: this.state.unpaidInvoiceList,
                        paidInvoiceList: this.state.paidInvoiceList, allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: false
                    })
                } else {
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //load more
    loadMoreDataAll = () => {
        setTimeout(() => {
            if (this.state.allInvoiceList.length >= 4) {
                if (this.state.allPageServiceCallStop) {
                } else {
                    if (this.state.noMoreDataFound) {
                    } else {
                        this.setState({ allPagination: this.state.allPagination + 1 }, () => this.callingAllInvoceAPI())
                    }
                }
            }
        }, 100)
    }


    //load more unpaid data
    loadMoreDataUnpaid = () => {
        setTimeout(() => {
            if (this.state.allInvoiceList.length >= 4) {
                if (this.state.unPaidServiceCallStop) {
                } else {
                    if (this.state.noMoreDataFound) {
                    } else {
                        this.setState({ unPaidPage: this.state.unPaidPage + 1 }, () => this.callingUnpaidInvoceAPI())
                    }
                }
            }
        }, 100)
    }

    //load more data paid
    loadMoreDataPaid = () => {
        setTimeout(() => {
            if (this.state.allInvoiceList.length >= 4) {
                if (this.state.paidServiceCallStop) {
                } else {
                    if (this.state.noMoreDataFound) {
                    } else {
                        this.setState({ paidPage: this.state.paidPage + 1 }, () => this.callingPaidInvoceAPI())
                    }
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
                this.setState({ allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: false })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({
                        allInvoiceList: this.state.allInvoiceList.concat(responseJson.data),
                        unpaidInvoiceList: this.state.unpaidInvoiceList, paidInvoiceList: this.state.paidInvoiceList, allPageServiceCallStop: false,
                        allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: false
                    })
                } else {
                    this.setState({ allPageServiceCallStop: true })

                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    //////

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
                this.setState({ allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: false })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({ allInvoiceList: this.state.allInvoiceList.concat(responseJson.data), unpaidInvoiceList: this.state.unpaidInvoiceList, paidInvoiceList: this.state.paidInvoiceList, unPaidServiceCallStop: false })
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
                this.setState({ allFooterCalling: false, unPaidFooterCalling: false, paidFooterCalling: false })
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({ allInvoiceList: this.state.allInvoiceList.concat(responseJson.data), unpaidInvoiceList: this.state.unpaidInvoiceList, paidInvoiceList: this.state.paidInvoiceList, paidServiceCallStop: false })
                } else {
                    this.setState({ paidServiceCallStop: true })
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    renderFooterAll = () => {
        if (this.state.allFooterCalling) {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        } else {
            return null;
        }
    }

    renderFooterUnpaid = () => {
        if (this.state.unPaidFooterCalling) {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        } else {
            return null;
        }
    }

    renderFooterPaid = () => {
        if (this.state.paidFooterCalling) {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <DialogLoader loading={this.state.isLoading} />
                <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    <Toolbar headerName={'Invoice'} isFilterIconShow={true} isInnerScreen={false} />
                </View>
                <View style={{ flex: 1 }}>
                    <Tabs
                        ref={(ref) => { this.tabView = ref; }}
                        tabBarUnderlineStyle={{ height: 4, backgroundColor: AppColors.white }}
                        tabContainerStyle={{ backgroundColor: AppColors.toolbarColor, height: 50, elevation: 0 }}
                        style={{ backgroundColor: AppColors.white, elevation: 0 }}
                        tabBarTextStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold, fontSize: 25 }}
                        tabBarActiveTextColor={AppColors.white}
                        tabBarInactiveTextColor={AppColors.black}
                        tabBarBackgroundColor={AppColors.toolbarColor}
                        onChangeTab={(event) => this.onTabChange(event)}

                    >
                        <Tab
                            heading={<TabHeading
                                activeTabStyle={{ backgroundColor: AppColors.white }}
                                activeTextStyle={{ color: AppColors.white }}
                                style={{ backgroundColor: this.state.tabIndex == 0 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                            >
                                <Text style={{ color: this.state.tabIndex == 0 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 0 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>ALL</Text></TabHeading>}
                            activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                            tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                            textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                            activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
                        >

                            <View style={{ flex: 1 }}>
                                <Elavation
                                    elevation={3}
                                    style={styles.searchElavationStyle}>
                                    <View style={styles.searchElvationViewStyle}>
                                        <TextInput style={styles.searchTxtInputStyle}
                                            placeholder='Search Invoice Numberr'
                                            placeholderTextColor={AppColors.toolbarColor}
                                            selectionColor={AppColors.toolbarColor}
                                            onChangeText={(text) => this.setState({ searchTxt: text })}
                                            onSubmitEditing={() => this.callingSearchAPI()}
                                            returnKeyType='search'
                                        />
                                        <AntDesign name='search1' color={AppColors.toolbarColor} size={20} />
                                    </View>
                                </Elavation>
                                {this.state.allInvoiceList.length > 0 ?
                                    <FlatList
                                        style={{ paddingTop: 5 }}
                                        data={this.state.allInvoiceList}
                                        renderItem={this.renderInvoiceContent}
                                        keyExtractor={(item, index) => index}
                                        extraData={this.state}
                                        onEndReached={this.loadMoreDataAll}
                                        onEndThreshold={0}
                                        ListFooterComponent={this.renderFooterAll}
                                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                                    /> :
                                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 15 }}>Invoice Not Found</Text>
                                    </View>}
                            </View>

                        </Tab>

                        <Tab
                            heading={<TabHeading
                                activeTabStyle={{ backgroundColor: AppColors.white }}
                                activeTextStyle={{ color: AppColors.white }}
                                style={{ backgroundColor: this.state.tabIndex == 1 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                            >
                                <Text style={{ color: this.state.tabIndex == 1 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 1 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>UNPAID</Text></TabHeading>}
                            activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                            tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                            textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                            activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
                        >

                            <View style={{ flex: 1 }}>
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
                                {this.state.allInvoiceList.length > 0 ?
                                    <FlatList
                                        style={{ paddingTop: 5 }}
                                        data={this.state.allInvoiceList}
                                        renderItem={this.renderInvoiceContent}
                                        keyExtractor={(item, index) => index}
                                        extraData={this.state}
                                        onEndReached={this.loadMoreDataUnpaid}
                                        onEndThreshold={0}
                                        ListFooterComponent={this.renderFooterUnpaid}
                                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                                    /> :
                                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 15 }}>Invoice Not Found</Text>
                                    </View>}
                            </View>
                        </Tab>

                        <Tab
                            heading={<TabHeading
                                activeTabStyle={{ backgroundColor: AppColors.white }}
                                activeTextStyle={{ color: AppColors.white }}
                                style={{ backgroundColor: this.state.tabIndex == 2 ? AppColors.toolbarColor : AppColors.toolbarColor }}
                            >
                                <Text style={{ color: this.state.tabIndex == 2 ? AppColors.white : AppColors.white, fontFamily: this.state.tabIndex == 2 ? AppFonts.JosefinSansBold : AppFonts.JosefinSansBold }}>PAID</Text></TabHeading>}
                            activeTabStyle={{ backgroundColor: AppColors.toolbarColor, }}
                            tabStyle={{ backgroundColor: AppColors.toolbarColor }}
                            textStyle={{ color: AppColors.white, fontFamily: AppFonts.JosefinSansSemiBold }}
                            activeTextStyle={{ color: AppColors.toolbarColor, fontFamily: AppFonts.JosefinSansSemiBold }}
                        >

                            <View style={{ flex: 1 }}>
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
                                {this.state.allInvoiceList.length > 0 ?
                                    <FlatList
                                        style={{ paddingTop: 5 }}
                                        data={this.state.allInvoiceList}
                                        renderItem={this.renderInvoiceContent}
                                        keyExtractor={(item, index) => index}
                                        extraData={this.state}
                                        onEndReached={this.loadMoreDataPaid}
                                        onEndThreshold={0}
                                        ListFooterComponent={this.renderFooterPaid}
                                        ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                                    /> :
                                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 15 }}>Invoice Not Found</Text>
                                    </View>}
                            </View>
                        </Tab>

                    </Tabs>
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
    searchElavationStyle: {
        height: 50, width: deviceWidth * 0.9,
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
})
export default InvoiceListScreen;