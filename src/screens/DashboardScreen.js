import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Easing, Image, Alert, AppState, BackHandler, BackAndroid, ScrollView, FlatList,ImageBackground } from 'react-native';
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import Toolbar from '../screens/Toolbar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../styles/ResponsiveScreen';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import ContactUsScreen from "./ContactUsScreen"; 
import VehcileScreen from './VehicleScreen';
import ContainerTrackingScreen from './ContainerTrackingScreen';
import ContainerTrackingOne from './ContainerTrackingOne';
import PopUp from './PopUp';
// import { Icon } from 'react-native-vector-icons/Icon';


class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            all: 0,
            onHand: 0,
            manifest: 0,
            pickUp: 0,
            carOnTheWay: 0,
            newPurchase: 0,
            shipped: 0,
            arrived: 0,
            allContainer:0,
            dashboardSection: [
                {
                    id: 1,
                    name: 'All Vehicle',
                    icon: require('../Images/vehicle_icon_black.png'),
                    number: 2
                },
                {
                    id: 2,
                    name: 'New Purchased',
                    icon: require('../Images/vehicle_icon_black.png'),
                    number: 2
                },
                {
                    id: 3,
                    name: 'On Hand',
                    icon: require('../Images/car_onhand.png'),
                    number: 2
                },
                {
                    id: 4,
                    name: 'Ready to Ship',
                    icon: require('../Images/ready_for_rent_icon.png'),
                    number: 3
                },

                {
                    id: 5,
                    name: 'On the way',
                    icon: require('../Images/tow_truck.png'),
                    number: 2
                },
                {
                    id: 6,
                    name: 'Arrived',
                    icon: require('../Images/google_map_marker.png'),
                    number: 2
                }, {
                    id: 7,
                    name: 'Container',
                    icon: require('../Images/container_left_menu_icon.png'),
                    number: 2
                }, {
                    id: 8,
                    name: 'Accounting',
                    icon: require('../Images/accounting_icon.png'),
                    number: 5
                }
            ]
        }
    }



    //render dashboard backicon 
    dashboardiconUI = (item, index) => {
        if (index == 0) {
            return <Image source={item.icon} style={{ width: 60, height: 48, alignSelf: 'center' }} resizeMode='contain' />
        } if (index == 2) {
            return <Image source={item.icon} style={{ width: 60, height: 49, alignSelf: 'center' }} resizeMode='contain' />
        } if (index == 3) {
            return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='cover' />
        }
        if (index == 5) {
            return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='contain' />
        }
        else {
            return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='contain' />
        }
        // if (index == 0) {
        //     return <Image source={item.icon} style={{ width: 60, height: 48, alignSelf: 'center' }} resizeMode='contain' />
        // } if (index == 2) {
        //     return <Image source={item.icon} style={{ width: 60, height: 49, alignSelf: 'center' }} resizeMode='contain' />
        // } if (index == 3) {
        //     return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='contain' />
        // }
        // if (index == 5) {
        //     return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='contain' />
        // }
        // else {
        //     return <Image source={item.icon} style={{ width: 60, height: 50, alignSelf: 'center' }} resizeMode='contain' />
        // }
    }

    callingDashbard = (item) => {
        if (item.id == 7) {
            this.props.setProps.navigation.push('ExportListScreen', { 'itemObj': item })
        } else if (item.id == 8) {
            this.props.setProps.navigation.push('AccountListScreen')
        } else if (item.id == 1) {
            this.props.setProps.navigation.push('VehcileScreen', { 'itemObj': item, 'setProps': this.props.setProps });
        } else {
            //https://erp.gwwshipping.com/webapi/vehicle?page=1&location=1&search_str=&status=0
            this.props.setProps.navigation.push('VehcileScreen', { 'itemObj': item, 'setProps': this.props.setProps })
        }
    }

    componentDidMount() {


        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        AppState.addEventListener('change', this._handleAppStateChange);

        this.callingCounterAPI();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    callingCounterAPI = () => {
        fetch(AppUrlCollection.GET_COUNTER, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //   this.setState({ vehicleList: responseJson.data.vehicle_details })
                console.log('Load more data :: ', responseJson)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    this.setState({
                        all: responseJson.data.all != null && responseJson.data.all != '' ? responseJson.data.all : 0,
                        onHand: responseJson.data.on_hand != null && responseJson.data.on_hand != '' ? responseJson.data.on_hand : 0,
                        carOnTheWay: responseJson.data.car_on_way != null && responseJson.data.car_on_way != '' ? responseJson.data.car_on_way : 0,
                        newPurchase: responseJson.data.new_purchase != null && responseJson.data.new_purchase != '' ? responseJson.data.new_purchase : 0,
                        shipped: responseJson.data.shipped != null && responseJson.data.shipped != '' ? responseJson.data.shipped : 0,
                        arrived: responseJson.data.arrived != null && responseJson.data.arrived != '' ? responseJson.data.arrived : 0,
                        allContainer:responseJson.data.all_container != null && responseJson.data.all_container != '' ? responseJson.data.all_container : 0,
                    })
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            console.log('App has come to the foreground!');
        }
        this.setState({ appState: nextAppState });
        console.log('APPP STATE ::: ', this.state.appState)
    };


    handleBackButtonClick() {
        //this.props.navigation.goBack(null);
        BackHandler.exitApp();
        return true;
    }


    henlo=()=>{
        alert("henlo")
    }

    dahboardCounter = (item, index) => {
        if (index == 0) {
            return <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.all + ')'}</Text>
        } if (index == 1) {
            return <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.newPurchase + ')'}</Text>
        } if (index == 2) {
            return <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.onHand + ')'}</Text>
        } if (index == 3) {
            return <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.shipped + ')'}</Text>
        } if (index == 4) {
            return <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.carOnTheWay + ')'}</Text>
        } if (index == 5) {
            return <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.arrived + ')'}</Text>
        }
        // if(index==6){
        //     return <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.black, fontSize: 13, paddingBottom: 10 }}>{'(' + this.state.allContainer + ')'}</Text>
        // }

         
        
    }

    renderDashboard = ({ item, index }) => {
        return <TouchableOpacity
            onPress={() => this.callingDashbard(item)}
        >
            <Elavation
                elevation={5}
                style={{ width: wp('28%'), height: hp('19%'), borderRadius: 5, borderColor: AppColors.toolbarColor, borderWidth: 0, marginTop: hp('1.5%'), marginBottom: hp('1.5%'), marginLeft: '2.3%', marginRight: '2.3%', paddingTop: 16 }}
            >
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    {this.dashboardiconUI(item, index)}
                    <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.black, fontSize: 14, paddingTop: 15, }}>{item.name}</Text>
                    {this.dahboardCounter(item, index)}

                    {/* <Text style={{ fontFamily: AppFonts.SourceSansProLight, color: AppColors.black, fontSize: 28,paddingTop:15,paddingLeft:25 }}>{item.number}</Text> */}
                    {/* {this.dashboardiconUI(item, index)} */}
                </View>
            </Elavation>
        </TouchableOpacity>
    }


    render() {
        return(
                



<View style={styles.screen}>


          
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

           
                 <Image source={ require('../Images/d-2.png')} 
            style={{ width: 26, height:26, }} 
           />
             </TouchableOpacity>

    </View>

    

          <View 
          style={{ 
              marginTop:10,
            height:39,
        backgroundColor:AppColors.Headercolor,
flexDirection:'row',
justifyContent:"center",
        
        
        }}

          >
          <Image source={ require('../Images/d_preview_rev_1.png')} 
            style={{ width: 26, height:26, alignSelf: 'center' }} resizeMode='contain'
           />
              <Text  style={{marginTop:4, fontSize:16,color:AppColors.Signincolor,alignSelf:"center"
            
            }}>Dashboard</Text>
          </View>
         
          <ScrollView >
       
              <ImageBackground
                  style={{flex:1,
                    width: null,
                    height: null,
                    resizeMode:'contain',
                    
                    
                  
                } }

               
                 source={require('../Images/backgroundimage4.png')}
                >

<View style={{flexDirection:'row'}}>


              <View style={{width:"40%"}}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Vehicle')} style={styles.button}>
          <Text style={styles.textincards}>ON THE WAY</Text>

          
              <Image source={ require('../Images/car-2.jpg')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
        
          </TouchableOpacity>
              </View>



              <View style={{ marginLeft:25, width:"40%"}}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Vehicle')} style={styles.button}>
          <Text style={styles.textincards}>ON  HAND</Text>

          
              <Image source={ require('../Images/onhand-3.jpg')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
        
          </TouchableOpacity>
              </View>

            

</View>


















{/* 

<View style={styles.cardsview}>
                       

              <View>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Vehicle')} style={styles.button}>
          <Text style={styles.textincards}>On The WAY</Text>

          
              <Image source={ require('../Images/car.png')} 
               style={{ width: 80, height:80, alignSelf: 'center' }} resizeMode='contain'
              />
        
          </TouchableOpacity>
              </View>



              <View>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Vehicle')} style={styles.button}>
          <Text style={styles.textincards}>On  Hand</Text>

          
              <Image source={ require('../Images/onhand.png')} 
               style={{ width: 80, height:80, alignSelf: 'center' }} resizeMode='contain'
              />
        
          </TouchableOpacity>
              </View>

            

</View> */}
              
              
<View style={{flexDirection:'row'}}>
<View style={{width:"40%"}}>
<TouchableOpacity onPress={()=> this.props.navigation.navigate('Vehicle')} style={styles.button}>
<Text style={styles.textincards}>MANIFEST</Text>

<Image source={ require('../Images/edit.png')} 
 style={{ width: 60, height:60, alignSelf: 'center' }}resizeMode='contain'
/>

</TouchableOpacity>
</View>



<View style={{marginLeft:25, width:"40%"}}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Vehicle')} style={styles.button}>
          <Text style={styles.textincards}>SHIPPED</Text>

          
              <Image source={ require('../Images/ship-2.png')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
        
          </TouchableOpacity>
              </View>


               </View>


<View style={{flexDirection:'row'}}>


{/* <View style={{width:"40%"}}>
<TouchableOpacity onPress={()=> this.props.navigation.navigate('Vehicle')} style={styles.button}>
<Text style={styles.textincards}>MANIFEST</Text>

<Image source={ require('../Images/edit.png')} 
 style={{ width: 60, height:60, alignSelf: 'center' }}resizeMode='contain'
/>

</TouchableOpacity>
</View> */}


<View style={{  width:"40%"}}>
<TouchableOpacity onPress={()=> this.props.navigation.navigate('Vehicle')} style={styles.button}>
<Text style={styles.textincards}>ARRIVED</Text>


<Image source={ require('../Images/arrive.png')} 
 style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
/>

</TouchableOpacity>
</View>


<View style={{ marginLeft:25, width:"40%"}}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('ContainerTrackingOne')} style={styles.button}>
          <Text style={styles.textincards}>CONTAINER</Text>

          
              <Image source={ require('../Images/contain.png')} 
               style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
              />
        
          </TouchableOpacity>
              </View>


 </View>


 <View style={{flexDirection:'row'}}>
 <View style={{width:"40%"}}>
<TouchableOpacity onPress={()=> this.props.navigation.navigate('AccountSectionMainScreen')} style={styles.button}>
<Text style={styles.textincards}>ACCOUNTING</Text>


<Image source={ require('../Images/upgraph.png')} 
 style={{ width: 60, height:60, alignSelf: 'center' }} resizeMode='contain'
/>

</TouchableOpacity>
</View>


</View>


    </ImageBackground>
</ScrollView>


     
     </View>
            
            
   )
       
}
   




}


const styles = StyleSheet.create({


screen:{

   flex:1,
   fontSize:14,
   padding:2,
 




},

button:{

height:150,
width:150,
backgroundColor:'white',
borderColor:'white',
borderWidth:3,
padding:2,
marginTop:10,
marginBottom:10,
marginLeft:20,
marginRight:20,
padding:9,

},
txxt:{
color:'#228B22',
fontFamily:'UbuntuMono_B.tff',
fontSize: 20 , 
paddingTop:2,
},

headertext:{
color:"green",
alignItems:'center',
justifyContent:'center',
fontSize:30,
fontWeight:'bold',
fontFamily:'UbuntuMono_B.tff',
},
heading :{
marginLeft:70,
marginRight:70,
marginTop:20,
fontFamily:'UbuntuMono_B.tff',
padding:8,
paddingEnd:2,

},

cardsview:{
flexDirection:"row",
alignContent:"space-between",
marginBottom:20,
marginTop:20,

},

cardsvieww:{

    flexDirection:"row-reverse",
    
        marginTop:20,
    
    },
textincards:{
fontSize:14,
color:'#17b9b7',
textAlign: 'center',
marginVertical:5,
fontFamily:'UbuntuMono_B.tff',
},





})

export default createMaterialBottomTabNavigator({
    Dashboard: {
      
        screen:DashboardScreen ,
        tabBarLabel:<Text style={{color:'black'}}>Dashboard</Text>,
        navigationOptions:{
            tabBarIcon:<Image
            source={ require('../Images/homeicon.png')} 
 style={{ width: 20, height:20, alignSelf: 'center' }}
            />,
           },
    
    
    },
    Vehicle:{screen:VehcileScreen,
        navigationOptions:{
            tabBarIcon:<Image
            source={ require('../Images/car-2.jpg')} 
 style={{ width: 30, height:30, alignSelf: 'center', resizeMode:'contain'}} 
            />,
           },
    
    
    
    
    },
    Container:{
        screen:ContainerTrackingOne,
        navigationOptions:{
            tabBarIcon:<Image
            source={ require('../Images/ship-2.png')} 
 style={{ width: 35, height:35, alignSelf: 'center', resizeMode:'contain'}} 
            />,
           },
    
    },

   Inventory:{
        screen:ContainerTrackingOne,
        navigationOptions:{
            tabBarIcon:<Image
            source={ require('../Images/inventory_icon.png')} 
 style={{ width: 30, height:30, alignSelf: 'center', resizeMode:'contain'}} 
            />,
           },
    
    },
//     More:{
//      screen:PopUp,

//         navigationOptions:{
//             tabBarIcon:<Image
//             source={ require('../Images/some_icon.png')} 
//  style={{ width: 30, height:30, alignSelf: 'center', resizeMode:'contain'}} 
//             />,
//            },
    
//     },
    
   
    
  
  }, {
    initialRouteName: 'Dashboard',
    activeColor: '#00FFFF',
    inactiveColor:'black',
    barStyle: { backgroundColor: 'white' },
  });