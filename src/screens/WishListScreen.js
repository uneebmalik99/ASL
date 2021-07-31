import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput,  BackHandler, ActivityIndicator, AppState } from 'react-native'

import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Toolbar from '../screens/Toolbar';
import InnerToolbar from './InnerToolbar';
import AppMainStylesSheet from "../styles/AppMainStylesSheet";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from '../screens/DialogLoder';

class WishListScreen extends Component {
    constructor(props) {
        super(props);
        this.handleBackPress = this.handleBackPress.bind(this);
        this.state = {
            isLoading: false,
            page: 0,
            isFooterCalling: false,
            isStopService: true,
            appstate: AppState.currentState,
            ourServiceList: [
                // {
                //     title: 'Diwali Wishing',
                //     detail: 'We offer fully integrated custom logistic service for freight transportation on LTL and FTL to/from anywhere in the USA. We can integrate all of your transportation needs into a simple and cost effective solution to ensure a safe and rapid delivery for all your valuable goods.'
                // }, {
                //     title: 'Eid Wishing',
                //     detail: 'We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it,We can pick up your vehicles from any location in the continental U.S. and transport them to your overseas destinations. Each  vehicle is securely blocked, braced and adequately tied down in the  freight container so that it will arrive at the destination in the same  condition as we received it'
                // }, {
                //     title: 'Moharam Wishing',
                //     detail: 'We provide a comprehensive U.S customs clearance service, ensuring speedy delivery of your cargo to its final destination. We help you to prepare all required documents..'
                // }, {
                //     title: 'Moharam Wishing',
                //     detail: 'As part of our comprehensive logistics solutions, we also offer our clients a range of warehousing services. Two warehouses in New York and Florida are in your service.'
                // }, {
                //     title: 'Edi Wishing',
                //     detail: 'We provide internet tracking and tracing to all out customers. Our custom made tracking solution provides complete cargo and shipping information.'
                // }, {
                //     title: 'Moharam Wishing',
                //     detail: 'Here at GALAXY SHIPPING we can help you with  purchasing your brand new or used vehicle, boat,bike,ATV and so on.   Custom made cars and trucks are made to order thru our licensed used car  dealer GALAXY USED CARS LLC.'
                // },
            ]
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.setState({ isLoading: true })
        fetch(AppUrlCollection.ANNOUCMENT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('sdsadada ', responseJson)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({ ourServiceList: responseJson.data })
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
        
            this.props.navigation.goBack();
            return true;
        
    }

    renderOurServiceContent = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.push('AnnoucementDetailScren', { 'itemObj': item })}>
                <Elavation
                    elevation={1}
                    style={{ flexDirection: 'row', width: deviceWidth * 0.95, height: 120, borderRadius: 10, marginBottom: 10 }}>
                    <View style={{ flex: 1, padding: 5, marginLeft: 5, marginRight: 5 }}>
                        <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, color: AppColors.textColor, fontSize: 15 }}>{item.subject}</Text>
                        <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, marginTop: 9 }} numberOfLines={3} ellipsizeMode='tail'>{item.message}</Text>
                        <Text style={{ fontFamily: AppFonts.JosefinSansRegular, fontSize: 14, color: AppColors.toolbarColor, textAlign: 'right' }}>View More...</Text>
                    </View>
                </Elavation>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={AppMainStylesSheet.appMainContainer}>
            
                <DialogLoader loading={this.state.isLoading} />
                {/* {this.props.isOuterCalling ?

                    
                    
                    <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    
                        <Toolbar headerName={'Announcement'} />
                    </View> :
                    <InnerToolbar headerName={'Announcement'} />} */}
                <View style={{  }}>

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




                <View 
                    style={{width:"100%",height:100}}>
                 <Image
                        source={require('../Images/announcment.jpg')}
                          style={{width:"100%", alignSelf:'center', 
                           height:90
                        ,}}
                        />
                        </View>
                    <FlatList
                        data={this.state.ourServiceList}
                        style={{ paddingTop: 10, paddingBottom: 15 }}
                        renderItem={this.renderOurServiceContent}
                        keyExtractor={(item, index) => index}
                        extraData={this.state}
                        ListFooterComponent={() => <View style={{ width: 1, height: 10 }} />}
                    />
                </View>

            </View>
        );
    }
}
export default WishListScreen;