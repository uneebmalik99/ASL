import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';

class Toolbar extends Component {
    constructor(props) {
        super(props)

    }
    //this.props.toggle()
    render() {
        return (
            <View style={{ width: deviceWidth, height: 50, flexDirection: 'row', backgroundColor: AppColors.transplant, alignContent: 'center', alignItems: 'center' }}>
             

                <Text style={{ fontFamily: AppFonts.SourceSansProBold, color: AppColors.white, fontSize: 17, flex: 1, textAlignVertical: 'center', textAlign: 'center' }}>{this.props.headerName}</Text>
                <View style={{width:60,height:1}}/>

                {/* <View style={{ width: 1, height: 20, marginLeft: 3, marginRight: 3 }} />
                <MaterialCommunityIcons name='alert-circle-outline' color={AppColors.white} size={25} />
                <View style={{ width: 1, height: 20, marginLeft: 3, marginRight: 3 }} />
                <MaterialIcons name='notifications-none' color={AppColors.white} size={25} style={{ marginRight: 8 }} /> */}
            </View>
        );
    }
}
export default Toolbar;
