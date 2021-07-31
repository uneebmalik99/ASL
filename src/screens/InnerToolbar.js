import React, { Component } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';

class Toolbar extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{ width: deviceWidth, height: 50, flexDirection: 'row', backgroundColor: AppColors.toolbarColor, alignContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    style={{ width: 50, height: 50,justifyContent:'center',alignContent:'center' }}
                    onPress={() => AppConstance.APP_PROPS.navigation.pop()}
                >
                    <MaterialCommunityIcons name='chevron-left' color={AppColors.white} size={35} />
                </TouchableOpacity>
                <Text style={{ fontFamily: AppFonts.SourceSansProBold, color: AppColors.white, fontSize: 17, flex: 1, 
                textAlignVertical: 'center', textAlign: 'center' }}>{this.props.headerName}</Text>
                <View style={{ width: 50, height: 1 }} />
            </View>
        );
    }
}
export default Toolbar;
