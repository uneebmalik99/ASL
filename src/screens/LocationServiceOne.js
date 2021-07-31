import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground,TextInput, StyleSheet, BackHandler, Easing, Image, ScrollView, FlatList } from 'react-native';
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InnerToolbar from "../screens/InnerToolbar";
import AppMainStylesSheet from '../styles/AppMainStylesSheet';
import Toolbar from './Toolbar';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DialogLoader from './DialogLoder';
class LocationServiceScreen extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  

        this.state = {
            isLoading: false,
            saveYadData: []
          
        }
    }


  


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

    }

    handleBackButtonClick() {
       
        this.props.navigation.goBack();
        return true;
      }
   
  /*  callingYardAPI = () => {
        this.setState({ isLoading: true })
        let url = AppUrlCollection.GET_YARD
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.text())
            .then((responseJson) => {
                console.log('Invocie ::', responseJson)
                if (responseJson != undefined && responseJson != null && responseJson != '') {
                    let value = responseJson.replace(/<\/?[^>]+(>|$\n)/g, '')
                    let newVal = JSON.parse(value)
                    this.setState({ isLoading: false })
                    this.setState({ saveYadData: newVal })
                    console.log('Invocie dadasdasdd::', JSON.parse(value))
                } else {

                }

                // if (responseJson.length > 0) {
                //     this.setState({ saveYadData: responseJson })
                // } else {
                //     this.setState({ saveYadData: [] })
                //     AppConstance.showSnackbarMessage('Data not found')
                // }
            })
            .catch((error) => {
                console.warn(error)
            });
    }*/
   

    renderYardCell = ({ item, index }) => {
        return (
            <View>
                <Text style={[styles.addressTextStyle, { marginBottom: 5, fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 16 }]}>{item.title}</Text>
                <Elavation
                    elevation={3}
                    style={styles.appHeaderElavationStyle}
                >
                    <View style={styles.appHeaderEmailmainViewStyle}>
                        <MaterialCommunityIcons name='map-marker-circle'  size={21} />
                        <Text style={styles.addressTextStyle}>{item.address}</Text>
                    </View>
                    <View style={styles.addressDividerStyle} />
                    <View style={styles.appHeaderEmailmainViewStyle}>
                        <MaterialCommunityIcons name='email-outline'  size={21} />
                        <Text style={styles.addressTextStyle}>{item.email}</Text>
                    </View>
                    <View style={styles.addressDividerStyle} />
                    <View style={styles.appHeaderEmailmainViewStyle}>
                        <MaterialCommunityIcons name='phone'size={21} />
                        <Text style={styles.addressTextStyle}>{item.phone}</Text>
                    </View>

                </Elavation>
                <View style={{ marginTop: 25 }} />
            </View>

        );
    }

    render() {
        return (
            <View style={AppMainStylesSheet.appMainContainer}>
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
                <DialogLoader loading={this.state.isLoading} />

                <ScrollView>

                <Image
                        source={require('../Images/location.png')}
                          style={{width:"100%", alignSelf:'center', 
                           height:80
                        ,}}
                        />
               <ImageBackground 
                  style={{flex:1,
                    width: null,
                    height: null,
                    resizeMode:'contain',
marginHorizontal:15                    
                  
                } }

               
                 source={require('../Images/backgroundimage4.png')}
                >




               <Text style={{fontSize:16, marginTop:18, marginBottom:5, marginLeft:20,color:AppColors.Signincolor}}>AMAYA WORLDWIDE DUBAI</Text>
               
<View style={{marginHorizontal:0,borderRadius:7,borderWidth:1,paddingHorizontal:10,paddingVertical:5}}>

<View style={{flexDirection: 'row',marginTop: 10, marginBottom: 10}}>
            <MaterialCommunityIcons
              style={{alignSelf: 'center'}}
              name="map-marker"
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft: 4,
                
              }}>
1205 12th Floor,Centurion Star Tower,Block A,Opp Deira City Center,Port Saeed,Po Box 172497,Dubai,United Arab Emirates</Text>
          </View>
          <View style={{flexDirection: 'row',marginLeft:8, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
           
           <Image 
           style={{ marginLeft:5, alignSelf:"center",width:18,height:18}}
           source={require('../Images/wall-clock.png')}></Image>
          <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
            <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft: 15,
              }}>
Mon-Thur      9.00 am - 6.00 pm
       </Text>

       <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft: 15,

              }}>
Sat:                9.00 am - 2.00 pm 
       </Text>
       </View>
          </View>
          <View style={{flexDirection: 'row',marginLeft:10, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
          <Image 
           style={{marginLeft:5, alignSelf:"center",width:18,height:18}}
           source={require('../Images/telephone.png')}></Image>

          <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
            <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft:15,
              }}>
+971-4-224-9714
       </Text>

       <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft: 15,
              }}>
+971-4-224-9715
       </Text>
       </View>
          </View>
          <View style={{flexDirection: 'row',marginVertical:5,marginLeft:10,marginHorizontal:5,marginTop: 8, marginBottom: 13}}>
            <MaterialCommunityIcons
              style={{ marginLeft:5, alignSelf: 'center'}}
              name="fax"
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft:15,
              }}>
+971-4-224-9718
</Text>
          </View>
          <View style={{flexDirection: 'row', marginLeft:10,marginTop: 5, marginBottom: 2}}>
            <MaterialCommunityIcons
              name="email-outline"
              style={{marginLeft:5}}
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft: 15,
              }}>
24seven@amayaworldwide.com            </Text>
          </View>
         
        </View>


</ImageBackground>
        
        <Text style={{fontSize:16,marginTop:15,marginBottom:5, marginLeft:30,color:AppColors.Signincolor}}>AMAYA WORLDWIDE CA</Text>

        <View style={{marginHorizontal:15,borderRadius:7,borderWidth:1,paddingHorizontal:10,paddingVertical:5}}>

<View style={{flexDirection: 'row',marginTop: 10, marginBottom: 10}}>
            <MaterialCommunityIcons
              style={{alignSelf: 'center'}}
              name="map-marker"
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft: 4,
              }}>
131 East Gardena,Boulevard Carson,                                CA 90247</Text>



          </View>


          <View style={{flexDirection: 'row',marginLeft:8, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
           
           <Image 
           style={{ marginLeft:5, alignSelf:"center",width:18,height:18}}
           source={require('../Images/wall-clock.png')}></Image>

           
            
          <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
            <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft: 15,
              }}>
Mon-Fri 9.00 am - 4.30 pm
       </Text>

      
       </View>
          </View>



          <View style={{flexDirection: 'row',marginLeft:10, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
          <Image 
           style={{marginLeft:5, alignSelf:"center",width:18,height:18}}
           source={require('../Images/telephone.png')}></Image>

          <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
            <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft:15,
              }}>
+1-310-593-9604
       </Text>

      
       </View>
          </View>



          <View style={{flexDirection: 'row',marginVertical:5,marginLeft:10,marginHorizontal:5,marginTop: 8, marginBottom: 13}}>
            <MaterialCommunityIcons
              style={{ marginLeft:5, alignSelf: 'center'}}
              name="fax"
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft:15,
              }}>
+1-424-203-3640
</Text>
          </View>



          <View style={{flexDirection: 'row', marginLeft:10,marginTop: 5, marginBottom: 2}}>
            <MaterialCommunityIcons
              name="email-outline"
              style={{marginLeft:5}}
              size={26}
              color={AppColors.textColor}
            />
            <Text
              style={{
                fontFamily: AppFonts.SourceSansProRegular,
                color: AppColors.textColor,
                fontSize: 15,
                marginLeft: 15,
              }}>
flor@amayaworldwide.com            </Text>
          </View>
         
        </View>

            <Text
              style={{
                fontSize: 16,
                marginTop: 18,
                marginBottom: 5,
                marginLeft: 30,
                color: AppColors.Signincolor,
              }}>
              AMAYA WORLDWIDE NY
            </Text>

               
               <View style={{marginHorizontal:15,borderRadius:7,borderWidth:1,paddingHorizontal:10,paddingVertical:5}}>
               
               <View style={{flexDirection: 'row',marginTop: 10, marginBottom: 10}}>
                           <MaterialCommunityIcons
                             style={{alignSelf: 'center'}}
                             name="map-marker"
                             size={26}
                             color={AppColors.textColor}
                           />
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 4,
                             }}>
      290 Nye Avenue, Irvington New Jersey                                      Zip code 07111     </Text>
                         </View>
                         <View style={{flexDirection: 'row',marginLeft:8, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                          
                          <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:18,height:18}}
                          source={require('../Images/wall-clock.png')}></Image>
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
               Mon-Fri 9.00 am - 4.30 pm
                      </Text>
               
                      
                      </View>
                         </View>
                         <View style={{flexDirection: 'row',marginLeft:10, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                         <Image 
                          style={{marginLeft:5, alignSelf:"center",width:18,height:18}}
                          source={require('../Images/telephone.png')}></Image>
               
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft:15,
                             }}>
               +1-862-237-7067
                      </Text>
               
                      
                      </View>
                         </View>
                         <View style={{flexDirection: 'row',marginVertical:5,marginLeft:10,marginHorizontal:5,marginTop: 8, marginBottom: 13}}>
                           <MaterialCommunityIcons
                             style={{ marginLeft:5, alignSelf: 'center'}}
                             name="fax"
                             size={26}
                             color={AppColors.textColor}
                           />
                       <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 14,
                             }}>+1-862-237-7068           </Text>
                         </View>
                         <View style={{flexDirection: 'row', marginLeft:10,marginTop: 5, marginBottom: 2}}>
                           <MaterialCommunityIcons
                             name="email-outline"
                             style={{marginLeft:5}}
                             size={26}
                             color={AppColors.textColor}
                           />
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
               abdul@amayaworldwide.com            </Text>
                         </View>
                        
                       </View>
               
               
               
               







                       <Text style={{fontSize:16,marginBottom:5,marginTop:15, marginLeft:30,color:AppColors.Signincolor}}>AMAYA WORLDWIDE GA</Text>
               
                       <View style={{marginHorizontal:15,borderRadius:7,borderWidth:1,paddingHorizontal:10,paddingVertical:5}}>
               
               <View style={{flexDirection: 'row',marginTop: 10, marginBottom: 10}}>
                           <MaterialCommunityIcons
                             style={{alignSelf: 'center'}}
                             name="map-marker"
                             size={26}
                             color={AppColors.textColor}
                           />
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 4,
                             }}>
               146 Commerence Court, Rincon, GA                                   31326, USA</Text>
                         </View>
               
               
                         <View style={{flexDirection: 'row',marginLeft:8, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                          
                          <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:18,height:18}}
                          source={require('../Images/wall-clock.png')}></Image>
               
                          
                           
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
               Mon-Fri 9.00 am - 4.30 pm
                      </Text>
               
                      
                      </View>
                         </View>
               
               
               
                         <View style={{flexDirection: 'row',marginLeft:10, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                         <Image 
                          style={{marginLeft:5, alignSelf:"center",width:18,height:18}}
                          source={require('../Images/telephone.png')}></Image>
               
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft:15,
                             }}>
               +1-912-826-0265
                      </Text>
               
                      
                      </View>
                         </View>
               
               
               
                         <View style={{flexDirection: 'row',marginVertical:5,marginLeft:10,marginHorizontal:5,marginTop: 8, marginBottom: 13}}>
                           <MaterialCommunityIcons
                             style={{ marginLeft:5, alignSelf: 'center'}}
                             name="fax"
                             size={26}
                             color={AppColors.textColor}
                           />
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft:15,
                             }}>
               shabir@amayaworldwide.com
               </Text>
                         </View>
               
               
               
                         <View style={{flexDirection: 'row', marginLeft:10,marginTop: 5, marginBottom: 2}}>
                           <MaterialCommunityIcons
                             name="email-outline"
                             style={{marginLeft:5}}
                             size={26}
                             color={AppColors.textColor}
                           />
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
               abdullah@amayaworldwide.com            </Text>
                         </View>
                        
                       </View>
               
               









                       <Text style={{fontSize:16,marginBottom:5,marginTop:15, marginLeft:30,color:AppColors.Signincolor}}>AMAYA WORLDWIDE TX</Text>
               
                       <View style={{marginHorizontal:15,borderRadius:7,borderWidth:1,paddingHorizontal:10,paddingVertical:5}}>
               
               <View style={{flexDirection: 'row',marginTop: 10, marginBottom: 10}}>
                           <MaterialCommunityIcons
                             style={{alignSelf: 'center'}}
                             name="map-marker"
                             size={26}
                             color={AppColors.textColor}
                           />
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 4,
                             }}>
               7801 Parkhurst Dr. Houston,                                                   TX 77028</Text>
                         </View>
               
               
                         <View style={{flexDirection: 'row',marginLeft:8, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                          
                          <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:18,height:18}}
                          source={require('../Images/wall-clock.png')}></Image>
               
                          
                           
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
               Mon-Fri 9.00 am - 4.30 pm
                      </Text>
               
                      
                      </View>
                         </View>
               
               
               
                         <View style={{flexDirection: 'row',marginLeft:10, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                         <Image 
                          style={{marginLeft:5, alignSelf:"center",width:18,height:18}}
                          source={require('../Images/telephone.png')}></Image>
               
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft:15,
                             }}>
               +1-818-606-8433
                      </Text>
               
                      
                      </View>
                         </View>
               
               
               
               
               
               
                         <View style={{flexDirection: 'row', marginLeft:10,marginTop: 5, marginBottom: 2}}>
                           <MaterialCommunityIcons
                             name="email-outline"
                             style={{marginLeft:5}}
                             size={26}
                             color={AppColors.textColor}
                           />
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
               sophia@amayaworldwide.com            </Text>
                         </View>
                        
                       </View>
               
               



















                       <Text style={{fontSize:16,marginTop:15,marginBottom:5, marginLeft:30,color:AppColors.Signincolor}}>AMAYA WORLDWIDE SHARJAH</Text>
               
                       <View style={{marginBottom:20, marginHorizontal:15,borderRadius:7,borderWidth:1,paddingHorizontal:10,paddingVertical:5}}>
               
               <View style={{flexDirection: 'row',marginTop: 10, marginBottom: 10}}>
                           <MaterialCommunityIcons
                             style={{alignSelf: 'center'}}
                             name="map-marker"
                             size={26}
                             color={AppColors.textColor}
                           />
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 4,
                             }}>
            Industrial area #2, behind the first Ind, SharjahPS 172497, UAE</Text>
                         </View>
               
               
                         <View style={{flexDirection: 'row',marginLeft:8, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                          
                          <Image 
                          style={{ marginLeft:5, alignSelf:"center",width:18,height:18}}
                          source={require('../Images/wall-clock.png')}></Image>
               
                          
                           
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
               Mon-Thrus       9.00 am - 1.00 pm
                      </Text>

                      <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
               Mon-Thrus       4.00 am - 9.00 pm
                      </Text>
               
                      
                      </View>
                         </View>
               
               
               
                         <View style={{flexDirection: 'row',marginLeft:10, marginTop: 2, paddingVertical:15, marginBottom: 2}}>
                         <Image 
                          style={{marginLeft:5, alignSelf:"center",width:18,height:18}}
                          source={require('../Images/telephone.png')}></Image>
               
                         <View style={{flexDirection:'column',marginLeft:3, marginTop: 2, marginBottom: 2}}>
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft:15,
                             }}>
               +1-912-826-0265
                      </Text>
               
                      
                      </View>
                         </View>
               
               
               
               
               
               
                         <View style={{flexDirection: 'row', marginLeft:10,marginTop: 5, marginBottom: 2}}>
                           <MaterialCommunityIcons
                             name="email-outline"
                             style={{marginLeft:5}}
                             size={26}
                             color={AppColors.textColor}
                           />
                           <Text
                             style={{
                               fontFamily: AppFonts.SourceSansProRegular,
                               color: AppColors.textColor,
                               fontSize: 15,
                               marginLeft: 15,
                             }}>
               salim@amayaworldwide.com            </Text>
                         </View>
                        
                       </View>
               











                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                    {/* <Text style={styles.addressTxtHeader}>OUR LOCATION</Text>
                    <View style={{ marginTop: 25 }} />
                    {this.state.saveYadData.length > 0 ?
                        <FlatList
                            data={this.state.saveYadData}
                            renderItem={this.renderYardCell}
                            keyExtractor={(item, index) => index}
                            extraData={this.state}
                        /> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold,fontSize: 15 }}>Data Not Found</Text>
                        </View>
                    } */}


                     {/* <Text style={styles.addressTxtHeader}></Text>  
                     <Elavation
                        elevation={3}
                        style={styles.appHeaderElavationStyle}
                    >
                        <View style={styles.appHeaderEmailmainViewStyle}>
                            <MaterialCommunityIcons name='map-marker-circle' color={AppColors.textColor} size={21} />
                            <Text style={styles.addressTextStyle}>UAE, Sharjah, Sharjah 83864, UAE.</Text>
                        </View>
                        <View style={styles.addressDividerStyle} />
                        <View style={styles.appHeaderEmailmainViewStyle}>
                            <MaterialCommunityIcons name='email-outline' color={AppColors.textColor} size={21} />
                            <Text style={styles.addressTextStyle}>info@gwwshipping.com</Text>
                        </View>
                        <View style={styles.addressDividerStyle} />
                        <View style={styles.appHeaderEmailmainViewStyle}>
                            <MaterialCommunityIcons name='phone' color={AppColors.textColor} size={21} />
                            <Text style={styles.addressTextStyle}>065328580</Text>
                        </View>

                    </Elavation>  */}



                </View>

                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    addressTxtHeader: {
        fontFamily: AppFonts.JosefinSansBold, color: AppColors.textColor,
        fontSize: 15, height: 80, textAlign: 'center', textAlignVertical: 'center'
    },
    appHeaderElavationStyle: {
        width: deviceWidth * 0.9,
        paddingLeft: 15, paddingRight: 15,
        borderRadius: 10, marginBottom:200,
    },
    appHeaderEmailmainViewStyle: {
        flexDirection: 'row',
        paddingTop: 15, paddingBottom: 15,
        alignContent: 'center',
        alignItems: 'center'
    },
    addressTextStyle: {
        fontFamily: AppFonts.SourceSansProRegular,
        fontSize: 15, color: AppColors.textColor,
        marginLeft: 8
    },
    addressDividerStyle: {
        width: deviceWidth * 0.80,
        height: 0.5, backgroundColor: AppColors.toolbarColor,
        alignContent: 'center', alignItems: 'center',
        justifyContent: 'center', alignSelf: 'center'
    }
})

export default LocationServiceScreen;
