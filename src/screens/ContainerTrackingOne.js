import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput, ActivityIndicator, BackHandler } from 'react-native'
import Elavation from '../styles/Elavation';
import NetInfo from "@react-native-community/netinfo";
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import InnerToolbar from '../screens/InnerToolbar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalDialog from "react-native-modal";
import DialogLoader from './DialogLoder';
import { heightPercentageToDP } from '../styles/ResponsiveScreen';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';



var imageBasePath = ''
class ContainerTrackingOne extends Component {
    
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            isDisplayView: 0,
            tabIndex: 0,
            selectFilterName: '',
            isModalVisible: false,
            searchLotNumber: '',
            isLoading: false,
            locationList: [],
            vehicleList: [

            ],
            categoryList: [
                'New Purchase', 'On Hand', 'Ready to Ship', 'Car on the way', 'Arrived', ''
            ],
            isFooterLoading: false,
            refreshing: false,
            page: 1,
            isStopCallingAPI: false,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
      }

    //Check internet connection
   

    callingVehicleContainerService = () => {
                this.ccallingLocationApi();
                this.setState({ isLoading: false })
                console.log('api calling ::', AppUrlCollection.CONTAINER_TRACKING + 'search=' + this.state.searchLotNumber + '&page=1')
                this.callingContainerApi(true)
            
         
        };


    
   
  

    //calling location api
    ccallingLocationApi = () => {
        fetch(AppUrlCollection.LOCATION2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //'authkey': AppConstance.USER_INFO.USER_TOKEN
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


    callingVehicleDetailSCreen = (item) => {
        if (item.exportImages.length > 0) {
            this.props.navigation.navigate('ExportImageListScreen', { 'itemObj': item, 'baseImagePath': imageBasePath,'vehicleList': this.state.vehicleList })
        } else {
         
             alert("no image found")


        }
    }

    //render Vehicle
    renderVehicle = ({ item, index }) => {
        let locationName = this.state.locationList.find((location) => location.id == item.location)
        return <Elavation
            elevation={2}
            style={{ width: deviceWidth * 0.95, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}>
            <TouchableOpacity style={{ width: deviceWidth * 0.3, height: 80 }}
                onPress = {()=>this.callingVehicleDetailSCreen(item)}
            >
                {item.exportImages.length > 0 ?
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={{ uri: imageBasePath + item.exportImages[0].thumbnail }} /> :
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} />}

            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                onPress={() =>
                    this.props.navigation.push('ExportDetailsScreen', { 'itemObj': item, 'baseImagePath': imageBasePath, 'vehicleList': this.state.vehicleList, 'isCallingWithoutLogin': true })}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>Container NO : </Text>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12, flex: 2 }}>{item.container_number}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>Port of loading : </Text>
                    <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, color: AppColors.textColor, fontSize: 13, flex: 2 }}>{item.port != undefined && item.port != null && item.port.port_name != null && item.port.port_name != '' ? item.port.port_name : '-'}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 13, flex: 1.4 }}>ETA : </Text>
                    <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12, flex: 2 }}>{item.eta}</Text>
                </View>

            </TouchableOpacity>
        </Elavation>
    }

    onTabChange = (event) => {
        this.setState({ tabIndex: event.i })
    }


    //set filter name
    setFiltername = (text) => {
        this.setState({ selectFilterName: text, isModalVisible: false })
    }

    //Rener Category Content
    renderCategoryContent = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ width: deviceWidth, height: 50, alignItems: 'center', alignContent: 'center', flexDirection: 'row', paddingLeft: 10 }}
                onPress={() => this.setFiltername(item)}
            >
                {this.state.selectFilterName == item ? <MaterialCommunityIcons name='check' color={AppColors.textColor} size={18} />
                    : <View style={{ width: 18 }} />}

                <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 15, paddingLeft: 10 }}>{item}</Text>
            </TouchableOpacity>
        );
    }

    //here is modal content
    renderModalContent = () => {
        return (
            <View style={styles.modalViewStyle}>
                <View style={{ flexDirection: 'row', height: 50, width: deviceWidth, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
                    <Text style={{ fontFamily: AppFonts.JosefinSansBold, color: AppColors.textColor, flex: 1, fontSize: 18 }}>Select Category</Text>
                    <TouchableOpacity
                        onPress={() => this.setState({ isModalVisible: false, selectFilterName: '' })}
                    >
                        <Image source={require('../Images/close_icon.png')} style={{ width: 18, height: 18 }} />
                    </TouchableOpacity>
                </View>
                {this.state.categoryList.length > 0 ?
                    <View style={{ flex: 1 }}>

                    </View> :
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontFamily: AppFonts.SourceSansProSemiBold,
                            color: AppColors.textColor, fontSize: 15
                        }}>Data not found</Text>
                    </View>
                }

            </View>
        );
    }

    isOpenFilterDialog = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    //Render Footer
    renderFooter = () => {
        if (this.state.isFooterLoading) {
            return <View><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
        } else {
            return null;
        }
    }

    loadMoreData = () => {
        setTimeout(() => {
            if (this.state.vehicleList.length >= 4) {
                if (this.state.noMoreDataFound) {
                } else {
                    this.setState({ page: this.state.page + 1 }, () => this.callingContainerApi(false))
                }
            }
        }, 100)
    }

    callingContainerApi = (isFirstTimeCaling) => {
        var url = ''
        if (isFirstTimeCaling) {
            this.setState({ isLoading: true, isFooterLoading: false })
            url = AppUrlCollection.CONTAINER_TRACKING + 'search=' + this.state.searchLotNumber + '&page=' + this.state.page
        } else {
            this.setState({ isLoading: false, isFooterLoading: true })
            url = AppUrlCollection.CONTAINER_TRACKING + 'search=' + this.state.searchLotNumber + '&page=' + this.state.page
        }
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'multipart/form-data',
                //  'authkey': AppConstance.USER_INFO.USER_TOKEN
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isLoading: false })
                console.log('Response data viw :: ', responseJson)
                if (responseJson.status == AppConstance.API_SUCESSCODE) {
                    imageBasePath = responseJson.data.other.export_image
                    if (responseJson.data.export.length > 0) {
                        if (isFirstTimeCaling) {
                            this.setState({ vehicleList: responseJson.data.export, noMoreDataFound: false, isFooterLoading: false })
                        } else {
                            this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.export), noMoreDataFound: false, isFooterLoading: false })
                        }
                    } else {
                        if (isFirstTimeCaling) {
                            this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                        } else {
                            this.setState({ isFooterLoading: false, noMoreDataFound: true })
                        }

                    }
                } else {
                    AppConstance.showSnackbarMessage(responseJson.message)
                }
            })
            .catch((error) => {
                console.warn(error)
            });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: AppColors.transplant, height: deviceHeight, }}>
                <DialogLoader loading={this.state.isLoading} />
              
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
                    <View style={{ width: deviceWidth, height: heightPercentageToDP('24%'),  }}>
                            
                <Image
                        source={require('../Images/containn.png')}
                          style={{alignSelf:'center', width: '100%',
                           height:120,}}
                        />    

                        <Elavation
                            elevation={0}
                            style={styles.searchElavationStyle}>
                            <View style={styles.searchElvationViewStyle}>
                                <TextInput style={styles.searchTxtInputStyle}
                                    placeholder='Search '
                                    placeholderTextColor='blue'
                                    selectionColor="white"
                                    autoFocus={true}
                                    onSubmitEditing={() => this.callingVehicleContainerService()}
                                    returnKeyType='search'
                                    onChangeText={(text) => this.setState({ searchLotNumber: text })}
                                />
                                <AntDesign name='search1'  size={20} />
                            </View>
                        </Elavation>
                    </View>


                {/* <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    <Toolbar setProps={this.props} headerName={'Car Tracking'}
                        isFilterIconShow={true} isModelVisible={this.isOpenFilterDialog} isInnerScreen={true} />
                </View>  */}
                {this.state.vehicleList.length > 0 ? <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ paddingTop: 5 }}
                        data={this.state.vehicleList}
                        renderItem={this.renderVehicle}
                        keyExtractor={(item, index) => index}
                        extraData={this.state}
                        onEndReached={this.loadMoreData}
                        onEndThreshold={0}
                        ListFooterComponent={this.renderFooter}
                    />
                </View> : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontFamily: AppFonts.SourceSansProSemiBold,
                             fontSize: 15
                        }}>Container data not found</Text>
                    </View>}


                <ModalDialog
                    isVisible={this.state.isModalVisible}
                    style={{
                        justifyContent: "flex-end",
                        margin: 0
                    }}
                    onBackButtonPress={() => this.setState({ isModalVisible: false })}
                    backdropOpacity={0.5}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                >
                    {this.renderModalContent()}
                </ModalDialog>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    vehicleHaxNoTxtStyle: {
        width: 30, fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.textColor, fontSize: 16
    },
    vehicleCustNameTxtStyle: {
        fontFamily: AppFonts.SourceSansProSemiBold, flex: 1, color: AppColors.textColor, fontSize: 16
    }, vehicleInnerTxtHeadinStyle: {
        fontFamily: AppFonts.SourceSansProSemiBold, fontSize: 14, color: AppColors.textColor, flex: 1.5
    }, vehicleInnerTxtValueStyle: {
        fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 15, flex: 2
    },
    vehicleInnerMainViewStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5
    },
    vehicleStatusTxtStyle: {
        fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor, fontSize: 14, marginRight: 10
    },
    vehicleInnreActionOpacityStyle: {
        borderRadius: 10, borderColor: AppColors.toolbarColor, borderWidth: 1,
    },
    vehicleInnreActionTxtStyle: {
        fontFamily: AppFonts.SourceSansProRegular, paddingLeft: 8, paddingRight: 8, paddingTop: 1, paddingBottom: 1, color: AppColors.textColor, fontSize: 12,
    }, modalViewStyle: {
        backgroundColor: AppColors.white,
        borderRadius: 4, flex: 0,
        //  height:deviceHeight*0.4,
        borderColor: AppColors.white, marginBottom: '-12%'
    },
    dialogMenuTxtStyle: {
        width: deviceWidth, height: 50,
        justifyContent: 'center',
        alignContent: 'center'
    }, dialogMenuTxtViewStyle: {
        fontFamily: AppFonts.JosefinSansRegular,
        color: AppColors.textColor,
        fontSize: 15,
        paddingLeft: 10
    }, dividerViewStyle: {
        width: deviceWidth,
        height: 0.5,
        backgroundColor: AppColors.textColor
    },
    searchBarMainView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 5
    },
    searchElavationStyle: {
        width: deviceWidth * 0.91, height: 40,
        borderRadius: 1,
        marginTop: 8,
        marginLeft: 5,
        marginRight: 5,
        alignSelf: 'center', borderRadius: 10
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
     fontSize: 15, paddingVertical: 0,
    },
    filterIconViewStyle: {
        marginLeft: 5, marginRight: 5,
        justifyContent: 'center', alignContent: 'center',
        alignItems: 'center', alignSelf: 'center', marginTop: 5
    }, filterIconStyle: {
        width: 25, height: 25
    }
})
export default ContainerTrackingOne;