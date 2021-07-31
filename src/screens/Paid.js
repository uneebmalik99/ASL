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
class Paid extends Component {
    constructor(props) {
        super(props)

      //  tabp = this.props.navigation.state.params.tab;
        
        // var time = new Date();
        // time.setSeconds(1558265906)
        // var formatted = time.format("dd.mm.yyyy hh:MM:ss");
        // console.log('date and ime dad ',formatted)

        this.state = {
            tabIndex: 0,
            item_id:0,
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
    this.callingInvoceAPI11()
}


renderInvoiceContent = ({ item }) => {
    let statusText = '-';
    if (item.status == '2') {
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

renderFooterUnpaid = () => {
    if (this.state.unPaidServiceCallStop) {
        return null;
    } else {
        return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
    }
}

callingAllInvoceAPI = () => {
    let url = '';
    url = AppUrlCollection.INVOICE + 'status=1'+  'page=' + this.state.allPagination
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



generateFlatList = () => {
    if (this.state.allInvoiceList.length > 0) {
        if (this.state.allInvoiceList.length > 0) {
        
            return <View style={{ flex: 1 }}>
                <FlatList
                    style={{ paddingTop: 5 }}
                    data={this.state.allInvoiceList}
                    renderItem={this.renderInvoiceContent}
                    numColumns={numColumns}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                //    ListFooterComponent={this.renderFooterUnpaid}
                    ItemSeparatorComponent={() => <View style={styles.dividerViewStyle} />}
        //            onEndReached={this.loadMoreDataAll}
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
    
}

callingInvoceAPI11 = () => {

let url = AppUrlCollection.INVOICE + 'status=2'
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
        console.log('Invocie2111111 ::', responseJson.data)
        
        if (responseJson.status == AppConstance.API_SUCESSCODE) {
            this.setState({ allInvoiceList: responseJson.data, isLoading: false })
console.log("Fvfvfvfvffvfv",this.allInvoiceList);
        } else {
            AppConstance.showSnackbarMessage(responseJson.message)
            this.setState({ isLoading: false })
        }
    })
    .catch((error) => {
        console.warn(error)
    });
  
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


            {/* {this.generateFlatList()} */}


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

export default Paid;