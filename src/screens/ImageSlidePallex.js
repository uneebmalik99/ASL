import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';

import ParallaxScrollView from 'react-native-parallax-scrollview';

class ImageSlidePallex extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: AppColors.white }}>
                <ParallaxScrollView
                    windowHeight={deviceHeight * 0.4}
                    backgroundSource='http://i.imgur.com/UyjQBkJ.png'
                    navBarTitle='John Oliver'
                    userName='John Oliver'
                    userTitle='Comedian'
                    userImage='http://i.imgur.com/RQ1iLOs.jpg'
                    navBarColor={AppColors.toolbarColor}
                    leftIcon={{ name: 'rocket', color: 'rgba(193, 193, 193, 1)', size: 30, type: 'font-awesome' }}
                    rightIcon={{ name: 'user', color: 'rgba(193, 193, 193, 1)', size: 30, type: 'font-awesome' }}
                >
                    <ScrollView style={{ flex: 1, backgroundColor: 'rgba(228, 117, 125, 1)' }}>
                        <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 32, color: 'white' }}>Custom view</Text>
                        </View>
                        <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 32, color: 'white' }}>keep going.</Text>
                        </View>
                        
                    </ScrollView>
                </ParallaxScrollView>
            </View>
        );
    }
}
export default ImageSlidePallex;