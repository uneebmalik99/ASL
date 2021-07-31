import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Easing, Image, ScrollView, BackHandler, AsyncStorage, FlatList, WebView } from 'react-native';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Easing, Image, ScrollView, BackHandler,  FlatList, WebView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FadeInView from '../styles/FadeInView'
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import DialogLoder from '../screens/DashboardScreen'
import AppMainStylesSheet from "../styles/AppMainStylesSheet";
import InnerToolbar from "../screens/ToolbarScreen/InnerToolbar";
import moment from 'moment'

let itemObj = null;
let message = '';
class AnnoucementDetailScren extends Component {
    constructor(props) {
        super(props);
        itemObj = this.props.navigation.state.params.itemObj;
        message = itemObj.message.replace(/<\/?[^>]+(>|$)/g, "");
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        console.log('Dummy : ', this.props.navigation.isFocused())
        if (this.props.navigation.isFocused()) {
            this.props.navigation.goBack();
            return true;
        }
    }


    render() {
        return (
            <View style={AppMainStylesSheet.appMainContainer}>
                <View style={{ width: deviceWidth, height: 220 }}>
                    <Image source={require('../Images/app_back_image2.jpg')}
                        style={{ width: deviceWidth, height: 220, position: 'absolute' }}
                    />
                   
                    <View style={{ width: deviceWidth, height: 220, position: 'absolute', backgroundColor: AppColors.white, opacity: 0.3 }} />
                    <View style={{ width: deviceWidth, height: 220, backgroundColor: AppColors.black, opacity: 0.4, position: 'absolute' }} />
                    <Text style={{ width: deviceWidth, height: 220, fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.white, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, textAlign: 'center', alignSelf: 'center', textAlignVertical: 'center', fontSize: 15 }}>{itemObj.subject.toUpperCase()}</Text>

                    <Text style={{
                        width: deviceWidth, height: 30, fontFamily: AppFonts.SourceSansProSemiBold, color: AppColors.white,
                        position: 'absolute', paddingLeft: 5, bottom: 0, textAlign: 'left', alignSelf: 'flex-end', fontSize: 15
                    }}>
                        {'Created date : '+ moment(itemObj.created_at).format('DD MMMM YYYY')}</Text>
                    <TouchableOpacity
                        style={{ top: 0, margin: 10, position: 'absolute' }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <MaterialCommunityIcons name='arrow-left' color={AppColors.white} size={30} />
                    </TouchableOpacity>
                </View>


                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                   
                   
                
                    <Elavation
                        elevation={3}
                        style={{ width: deviceWidth * 0.95, borderRadius: 5, }}
                    >
                        <ScrollView>
                            <Text style={{
                                fontFamily: AppFonts.SourceSansProRegular, color: AppColors.textColor,
                                fontSize: 15, paddingLeft: 10, paddingRight: 10, textAlign: 'justify',
                                paddingTop: 5, paddingBottom: 5,
                            }}
                                adjustsFontSizeToFit={true}
                            >{message}</Text>
                        </ScrollView>


                    </Elavation>
                </View>

            </View>
        );
    }
}
export default AnnoucementDetailScren;
