import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, BackHandler, Easing, Image, ScrollView, AsyncStorage, NetInfo } from 'react-native';
import { View,ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet, BackHandler, Easing, Image, ScrollView } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DialogLoder from '../screens/DialogLoder'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import InnerToolbar from '../screens/InnerToolbar';
import AppMessages from '../AppMessages/AppMesage';


class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailId: '',
            tokenId: 0,
            isLoading: false,
            password: '',
            confirmPassword: ''
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
        return true;
    }

    changePasswordToken = () => {
        if (this.state.emailId.trim().length == 0) {
            AppConstance.showSnackbarMessage('Email cannot be blank.')
        } else {
            NetInfo.fetch().then(state => {
                if (state.isConnected == true) {
                    this.setState({ isLoading: true });
                    var url = AppUrlCollection.FORGOT_PASSWORD;
                    var value = new FormData();
                    value.append('email', this.state.emailId);
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            // 'Client-Service': AppConst.CLIENT_SERVICE,
                            // 'Auth-Key': AppConst.AUTH_KEY
                        },
                        body: value,
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({ isLoading: false })
                            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                                this.setState({ tokenId: responseJson.data })
                            } else {
                                AppConstance.showSnackbarMessage(responseJson.message)
                            }
                            console.log('Response dsabdas ', responseJson)
                        })
                        .catch((error) => {
                            this.setState({ isLoading: false })
                            console.warn(error)
                        });
                }
                else {
                    this.setState({ isLoading: false })
                    alert('No Ineternet Found')

                } 

            });
        }
    }

    updatPassword = () => {
        if (this.state.password.trim().length == 0) {
            AppConstance.showSnackbarMessage('Password cannot be blank.')
        } else if (this.state.confirmPassword.trim().length == 0) {
            AppConstance.showSnackbarMessage('Confirm Password cannot be blank.')
        } else if (this.state.confirmPassword != this.state.password) {
            AppConstance.showSnackbarMessage('Password does not match.')
        } else {
            NetInfo.fetch().then(state => {
                if (state.isConnected == true) {
                    this.setState({ isLoading: true });
                    var url = AppUrlCollection.CHANGE_PASSWORD;
                    var value = new FormData();
                    value.append('token', this.state.tokenId);
                    value.append('password', this.state.password);
                    value.append('email', this.state.emailId);
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            // 'Client-Service': AppConst.CLIENT_SERVICE,
                            // 'Auth-Key': AppConst.AUTH_KEY
                        },
                        body: value,
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AppConstance.showSnackbarMessage(responseJson.message)
                            this.setState({ isLoading: false })
                            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                                this.props.navigation.pop();
                            } else {
                                AppConstance.showSnackbarMessage(responseJson.message)
                            }
                            console.log('Response dsabdas NEWW ', responseJson)
                        })
                        .catch((error) => {
                            this.setState({ isLoading: false })
                            console.warn(error)
                        });
                }
                else {
                    this.setState({ isLoading: false })
                       alert('Internet not found');
                       
                 }

            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: AppColors.white }}>

<View 
 style={{marginHorizontal:10,flexDirection:'row', marginVertical:15, height:40 , width:deviceWidth}}>
<TouchableOpacity
   onPress={() => this.props.navigation.goBack()}

  >
     <Image 
      source={ require('../Images/arrow-point-to-right.png')}
      
      style={{height:20,width:20, alignContent:"flex-start"}}
      >

     </Image>


     </TouchableOpacity>
 </View>
 
     

 <ImageBackground style={{  flex: 1,
    resizeMode: 'cover',} } 
                 resizeMode='cover' 
                 source={require('../Images/dubia.jpg')}>
         
       
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
             
                    <DialogLoder loading={this.state.isLoading} />


 
                    
                    <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 10, justifyContent: 'center' }}>
                        <Elavation
                            elevation={2}
                            style={{ width: deviceWidth * 0.9, height: 50, borderRadius: 20, marginTop: 10, flexDirection: 'row', alignContent: 'center', alignItems: 'center', paddingRight: 8 }}
                        >
                            <TextInput
                                placeholder='Email*'
                                placeholderTextColor={AppColors.textColor}
                                style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}
                                editable={this.state.tokenId > 0 ? false : true}
                                onChangeText={(text) => this.setState({ emailId: text })}
                            />
                            {this.state.tokenId > 0 ?
                                <TouchableOpacity
                                    onPress={() => this.setState({ password: '', confirmPassword: '', tokenId: '' })}
                                >
                                    <MaterialCommunityIcons name='close-circle-outline' color={AppColors.toolbarColor} size={25} />
                                </TouchableOpacity>

                                : null
                            }
                        </Elavation>
                        {this.state.tokenId > 0 ? <View>
                            <Elavation
                                elevation={2}
                                style={{ width: deviceWidth * 0.9, height: 50, borderRadius: 20, marginTop: 25 }}
                            >
                                <TextInput
                                    placeholder='New Password*'
                                    placeholderTextColor={AppColors.textColor}
                                    autoFocus={true}
                                    secureTextEntry={true}
                                    defaultValue={this.state.password}
                                    style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                            </Elavation>

                            <Elavation
                                elevation={2}
                                style={{ width: deviceWidth * 0.9, height: 50, borderRadius: 20, marginTop: 25 }}
                            >
                                <TextInput
                                    placeholder='Confirm Password*'
                                    placeholderTextColor={AppColors.textColor}
                                    secureTextEntry={true}
                                    defaultValue={this.state.confirmPassword}
                                    style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}
                                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                                />
                            </Elavation>

                            <TouchableOpacity style={{
                                width: deviceWidth * 0.9, height: 50, backgroundColor: '#4ccf63',
                                justifyContent: 'center', borderRadius: 50, marginTop: 25
                            }}
                                onPress={() => this.updatPassword()}
                            >
                                <Text style={{
                                    color: AppColors.white, fontFamily: AppFonts.SourceSansProBold, textAlign: 'center',
                                    textAlignVertical: 'center', fontSize: 16
                                }}>SAVE</Text>
                            </TouchableOpacity>
                        </View> : null}


                        {this.state.tokenId == 0 ? <TouchableOpacity style={{
                            width: deviceWidth * 0.9, height: 50, backgroundColor: '#4ccf63',
                            justifyContent: 'center', borderRadius: 50, marginTop: 25
                        }}
                            onPress={() => this.changePasswordToken()}
                        >
                            <Text style={{
                                color: AppColors.white, fontFamily: AppFonts.SourceSansProBold, textAlign: 'center',
                                textAlignVertical: 'center', fontSize: 16
                            }}>CHANGE PASSWORD</Text>
                        </TouchableOpacity> : null}


                    </View>
                </View>
          </ImageBackground>
          
            </View>
        );
    }
}
export default ForgotPasswordScreen;