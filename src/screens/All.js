import React, { Component } from 'react';
import { View, Text,ImageBackground, TouchableOpacity, StyleSheet, FlatList, Image, BackHandler,  ScrollView, TextInput, ActivityIndicator } from 'react-native'

import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import NetInfo from "@react-native-community/netinfo";
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';

import Toolbar from './Toolbar';
import InnerToolbar from './InnerToolbar';
import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading, Row } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalDialog from "react-native-modal";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from '../screens/DialogLoder';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../styles/ResponsiveScreen';

let v = []
let allInvoiceList = []
let tabp
const numColumns = 2
class All extends Component {
    constructor(props) {
        super(props)

        tabp = this.props.navigation.state.params.tab;
        cc:[],
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
            unpaidInvoiceList: [],
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

componentDidMount = () => {


    this.setState({isLoading:true})

    this.setState({tabIndex:tabp})
    this.callingInvoceAPI()




    console.log("dsvsdsv",this.v);
    this.setState({
        allInvoiceList:v
    })
    console.log("bjvjsnvjsnvjnjv",allInvoiceList);
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
    }, 100)

}


callingInvoceAPI = () => {
    this.state.tabIndex
    this.setState({ allInvoiceList: [], isLoading: true })
    let url = '';
    if (this.state.tabIndex == 3) {
        this.callingPaymentHistoryAPI()
    } 
    else {
        // if (this.state.tabIndex == 0) {
            url = AppUrlCollection.INVOICE
        } 
        // else if (tabIndex == 1) {

        //     url = AppUrlCollection.INVOICE + 'status=1'
        // } else if (tabIndex == 2) {
        //     url = AppUrlCollection.INVOICE + 'status=3'
        // }
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
renderInvoiceContent = ({ item }) => {
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
        style={{  borderColor:'black',borderRadius:18, borderWidth:0.7, paddingHorizontal:10, width: deviceWidth * 0.43, flexDirection:'column', marginBottom: 10, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}
    >
        <TouchableOpacity style={{marginTop:5,  width: deviceWidth * 0.37, height: 100 }}
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
                color: this.state.tabIndex == 0 ? 'grey' : this.state.tabIndex == 1 ? 'red' : 'green', fontSize: 12
            }}>
                {item.id != '' ? 'Invoice ID # ' + item.id : '-'}</Text>
            <Text style={{
                fontFamily: AppFonts.JosefinSansRegular,
                color: this.state.tabIndex == 0 ? 'grey' : this.state.tabIndex == 1 ? 'red' : 'green', fontSize: 12
            }}>{item.status != '' && item.status != null ? 'Status : ' + statusText : 'Status : - '}</Text>
            <Text style={{ marginBottom:5,
                fontFamily: AppFonts.JosefinSansRegular,
                color: this.state.tabIndex == 0 ? 'grey' : this.state.tabIndex == 1 ? 'red' : 'green',
                fontSize: 12
            }}>{item.final_total != ' ' && item.final_total != null ? 'Total Amount : ' + item.final_total : 'Total Amount : - '}</Text>
        </TouchableOpacity>
    </Elavation>
}
// callingInvoceAPI = () => {
//     this.setState({ allInvoiceList: [] })
//     let url = '';
//     // if (tabIndex == 3) {
//     //     this.callingPaymentHistoryAPI()
//     // } else {
//         // if (tabIndex == 0) {
//             url = AppUrlCollection.INVOICE
//         // } else if (tabIndex == 1) {
//         //     url = AppUrlCollection.INVOICE + 'status=1'
//         // } else if (tabIndex == 2) {
//         //     url = AppUrlCollection.INVOICE + 'status=3'
//         // }
//         console.log('url Change ::', url)
//         fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authkey': AppConstance.USER_INFO.USER_TOKEN
//             },
//         })
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 console.log('Invocie ::', responseJson)
//                 if (responseJson.status == AppConstance.API_SUCESSCODE) {

//                     // for (let index = 0; index < responseJson.data.length; index++) {
//                     //     const element = responseJson.data[index];
//                     //     let totalpaid = element.total_amount != null && element.total_amount != '' ? parseInt(element.total_amount) : 0
//                     //     let paid = element.paid_amount != null && element.paid_amount != '' ? parseInt(element.paid_amount) : 0
//                     //     if (paid == 0) {
//                     //         console.log('My Value ::: 1 ', totalpaid, paid, totalpaid > paid)
//                     //         this.state.unpaidInvoiceList.push(element)
//                     //     } else if (paid < totalpaid) {
//                     //         this.state.unpaidInvoiceList.push(element)
//                     //     } else {
//                     //         tshis.state.paidInvoiceList.push(element)
//                     //     }
//                     // }


//                     this.setState({ allInvoiceList: responseJson.data, isLoading: false })



//                 } else {
//                     AppConstance.showSnackbarMessage(responseJson.message)
//                     this.setState({ isLoading: false })
//                 }
//             })
//             .catch((error) => {
//                 console.warn(error)
//             });
    

// }
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
generateFlatList = () => {
    if (this.state.tabIndex == 0) {
        if (this.state.allInvoiceList.length > 0) {
            return <View style={{ flex: 1 }}>
            <ImageBackground 
            style={{width:undefined,height:undefined}}
       source={ require('../Images/bgimage.jpeg')} 

            >
                <FlatList
                    style={{ paddingTop: 5 }}
                    data={this.state.allInvoiceList} 
                         
                    renderItem={this.renderInvoiceContent}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                    extraData={this.state}
                    numColumns={numColumns}
                    ListFooterComponent={this.renderFooterAll}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
                    onEndReached={this.loadMoreDataAll}
                    // onEndThreshold={0.1}
                    onEndReachedThreshold={0.5}
                />
                </ImageBackground>
            </View>
        } else {
            return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 15 }}>Account Not Found</Text>
            </View>
        }
    } else if (this.state.tabIndex == 1) {
        if (this.state.allInvoiceList.length > 0) {
            let c=this.state.allInvoiceList
            console.log("dgfgf",c)
            console.log("44444444444444444444",c.length)

            for(let i=0; i<allInvoiceList.length; i++) {
                if(allInvoiceList[i].status == 1){
                    allInvoiceList.splice(i, 1)

                }
               
              }
            //   this.setState({allInvoiceList})



            return <View style={{ flex: 1 }}>
                <FlatList
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
                />
            </View>
        } else {
            return <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 15 }}>Invoice Not Found</Text>
            </View>
        }
    }
    else if (this.state.tabIndex == 2) {
        if (this.state.allInvoiceList.length > 0) {
let cc=this.state.allInvoiceList
            for(let i=0; i<cc.length; i++) {
                if(cc[i].status == 2){
                    cc.splice(i, 1)

                }
              }
            //  this.setState({allInvoiceList:cc}) 
            //   this.setState({allInvoiceList})

            return <View style={{ flex: 1 }}>
                <FlatList
                    style={{ paddingTop: 5 }}
                    data={this.state.cc}
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
            <View
            
            style={{flex:1}} >   
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


                {this.generateFlatList()}


                {/* <View style={{ flex: 1 }}>
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
                                        {this.generateFlatList()}

                </View> */}
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

export default All;