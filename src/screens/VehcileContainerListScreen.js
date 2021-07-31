import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, TextInput,  ActivityIndicator,BackHandler, ImageBackground } from 'react-native'
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import NetInfo from "@react-native-community/netinfo";
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import InnerToolbar from '../screens/InnerToolbar';
import { Container, Header, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalDialog from "react-native-modal";
import DialogLoader from './DialogLoder';
import { heightPercentageToDP } from '../styles/ResponsiveScreen';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';


var imageBasePath = ''
class VehcileContainerListScreen extends Component {
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

    //Check internet connection
   

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    callingVehicleContainerService = () => {
                this.callingLocationApi();
                this.setState({ isLoading: false })
                console.log('api calling ::', AppUrlCollection.VEHICLE_CONTAINER + 'search_str=' + 29869868 + '&page=1')
                this.callingContainerApi(true)
            }
             
              
       

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
      }
  

    //calling location api
    callingLocationApi = () => {
        fetch(AppUrlCollection.LOCATION2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
               // 'authkey': AppConstance.USER_INFO.USER_TOKEN
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


    callingVehicleImageListSCreen = (item) => {
        if (item.images.length > 0) {
            this.props.navigation.navigate('VehicleImageListScreen', { 'itemObj': item, 'baseImagePath': imageBasePath })
        } else {
              alert("no internet found");

        }
    }

    //render Vehicle
    renderVehicle = ({ item, index }) => {
        let locationName = this.state.locationList.find((location) => location.id == item.location)
        return <Elavation
            elevation={2}
            style={{ width: deviceWidth * 0.95, height: 80, flexDirection: 'row', marginBottom: 5, backgroundColor: 'white', marginRight: 10, marginLeft: 10, marginTop: 4 }}>
            <TouchableOpacity style={{ width: deviceWidth * 0.3, height: 80 }}
                onPress={() => this.callingVehicleImageListSCreen(item)}>
                {item.images.length > 0 ?
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={{ uri: imageBasePath + item.images[0].thumbnail }} /> :
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} />}

            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'space-between', paddingTop: 5, paddingBottom: 5, paddingLeft: 10 }}
                onPress={() => this.props.navigation.navigate('VehcilContainerDetailScreen', { 'vehicleObj': item, 'locationList': this.state.locationList, 'baseImagePath': imageBasePath, 'isCallingWithoutLogin': true })}>
                <Text style={{ fontFamily: AppFonts.JosefinSansSemiBold, color: AppColors.textColor, fontSize: 13 }}>{item.model.toUpperCase() + ' ' + item.make.toUpperCase()}</Text>
                <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{item.location != undefined && item.location != null && item.location != '' && locationName != undefined && locationName.name != undefined && locationName.name != null ? locationName.name + ' | ' + item.lot_number : '-'}</Text>
               
                <Text style={{ fontFamily: AppFonts.JosefinSansRegular, color: AppColors.textColor, fontSize: 12 }}>{'Status : ' + item.status != undefined && item.status != null && item.status != '' ? AppConstance.gettingStatusNameFromId(item.status) : '-'}</Text>
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
            url = AppUrlCollection.VEHICLE_CONTAINER + 'search_str=' + this.state.searchLotNumber + '&page=' + this.state.page
        } else {
            this.setState({ isLoading: false, isFooterLoading: true })
            url = AppUrlCollection.VEHICLE_CONTAINER + 'search_str=' + this.state.searchLotNumber + '&page=' + this.state.page
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
                    imageBasePath = responseJson.data.other.vehicle_image
                    if (responseJson.data.vehicleList.length > 0) {
                        if (isFirstTimeCaling) {
                            this.setState({ vehicleList: responseJson.data.vehicleList, noMoreDataFound: false, isFooterLoading: false })
                        } else {
                            this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.vehicleList), noMoreDataFound: false, isFooterLoading: false })
                        }
                    } else {
                        if (isFirstTimeCaling) {
                            this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                        } else {
                            this.setState({ isFooterLoading: false, noMoreDataFound: true })
                        }

                    }
                } else {
                   alert("okay")
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
                <View
                style={{backgroundColor:AppColors.Headercolor,
                height:60,
                justifyContent:'center',
                padding:10,

            }}
              >  


<TouchableOpacity 
              style={{width:60,height:60 ,alignContent:"flex-start", alignItems:"flex-start"}}
              onPress={() => this.props.navigation.goBack(null)}
>
              <Image source={ require('../Images/logo_final.png')} 
            style={{ width: 60, height:60, alignSelf: 'flex-start' }} resizeMode='contain'
           />
           </TouchableOpacity>
           <TouchableOpacity style={{position: 'absolute',
             alignContent:"flex-end",alignSelf:"flex-end",
            }  
            }
            onPress={() => this.props.navigation.openDrawer()}
            >
                 <Image source={ require('../Images/baru.jpg')} 
            style={{ width: 30, height:30,marginRight:10, alignSelf: 'center' }} resizeMode='contain'
           />
             </TouchableOpacity>
                           </View>
             
                <Elavation
                    elevation={8}
                    style={{ marginBottom: 1, width: deviceWidth, height: heightPercentageToDP('24%'), backgroundColor:'white' }}
                >
                    <View >
                    <Image
                        source={require('../Images/car_trackingg.png')}
                          style={{width:"100%", alignSelf:'center',
                           height:130,}}
                        />

                        <View style={{ flex: 0.78, alignContent: 'center', alignItems: 'center', marginTop: -5 }}>
                            <Text style={{ fontFamily: AppFonts.SourceSansProRegular, color: AppColors.white, fontSize: 18, }}>SEARCH</Text>
                            <Text style={{ fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.white, fontSize: 15, marginTop: 4 }}>{this.state.vehicleList.length > 0 ? this.state.vehicleList.length + ' Results' : ' '}</Text>
                        </View>

                        <Elavation
                            elevation={0}
                            style={styles.searchElavationStyle}>
                            <View style={styles.searchElvationViewStyle}>
                                <TextInput style={styles.searchTxtInputStyle}
                                    placeholder='Search '
                                    placeholderTextColor='black'
                                    selectionColor='blue'
                                    autoFocus={true}
                                    onSubmitEditing={() => this.callingVehicleContainerService()}
                                    returnKeyType='search'
                                    onChangeText={(text) => this.setState({ searchLotNumber: text })}
                                />
                                <AntDesign name='search1' color="blue" size={20} />



                            </View>
                        </Elavation>
                    </View>
                </Elavation>


                {/* <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    <Toolbar setProps={this.props} headerName={'Car Tracking'}
                        isFilterIconShow={true} isModelVisible={this.isOpenFilterDialog} isInnerScreen={true} />
                </View>  */}

                <ImageBackground
                  style={{flex:1,
                    width: null,
                    height: null,
                    resizeMode:'contain',
                    
                  
                } }

               
                 source={require('../Images/backgroundimage4.png')}
                >
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
                            color: AppColors.textColor, fontSize: 15
                        }}>Vehicle data not found</Text>
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
                </ImageBackground>
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
        alignSelf: 'center', borderRadius: 40
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
        color: AppColors.toolbarColor, fontSize: 15, paddingVertical: 0,
    },
    filterIconViewStyle: {
        marginLeft: 5, marginRight: 5,
        justifyContent: 'center', alignContent: 'center',
        alignItems: 'center', alignSelf: 'center', marginTop: 5
    }, filterIconStyle: {
        width: 25, height: 25
    }
})
export default VehcileContainerListScreen;