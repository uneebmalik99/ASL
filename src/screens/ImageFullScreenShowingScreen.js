import React, { Component } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { View, Text, TouchableOpacity, StyleSheet, Image, Share } from 'react-native';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import InnerToolbar from '../screens/InnerToolbar';

let imageObj = '';
let positionInt = 0;
let imageList = [];

class ImageFullScreenShowingScreen extends Component {
    constructor(props) {
        super(props)
        imageObj = this.props.navigation.state.params.imageObj;
        positionInt = this.props.navigation.state.params.positionInt
        imageList = this.props.navigation.state.params.imageList
        if (positionInt != undefined && positionInt != null && positionInt != '') {

        } else {
            positionInt = 0;
        }

        if (imageList != undefined && imageList != null && imageList != '') {

        } else {
            AppConstance.showSnackbarMessage('Image not found.')
            this.props.navigation.pop();
        }

        this.state = {
            imageList: [],
            imagePos: 0
        }

    }


    componentDidMount() {
        for (let index = 0; index < imageList.length; index++) {
            const element = imageList[index];
            let imageObj = {
                url: element,
                height: deviceHeight * 0.5,
                width: deviceWidth * 0.8,
                resizeMode: 'stretch'
            }
            this.state.imageList.push(imageObj)
        }
        this.setState({ imageList: this.state.imageList })
    }

    saveImageFromLocal = () => {
        Share.share({
            message: imageList[positionInt],
            url: imageList[positionInt], // add image array 
            title: 'Galaxy APP' // add link 
        }, {
                // Android only:
                dialogTitle: 'Share BAM goodness',
                // iOS only:
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                ]
            })
    }

    render() {
        const images = [];
        for (let index = 0; index < imageList.length; index++) {
            const element = imageList[index];
            let imageObj = {
                url: element,
                height: deviceHeight * 0.5,
                width: deviceWidth * 0.8,
                resizeMode: 'stretch'
            }
            images.push(imageObj);
        }
        //  const images = [
        //      { url: imageObj, height: deviceHeight * 0.5, width: deviceWidth * 0.8, resizeMode: 'stretch' },{ url: imageObj, height: deviceHeight * 0.5, width: deviceWidth * 0.8, resizeMode: 'stretch' }];
        return (<View style={{ flex: 1 }}>
            <InnerToolbar headerName='Image' />

            <View style={{ flex: 1 }}>
                <ImageViewer
                    shown={false}
                    imageUrls={images}
                    enablePreload={false}
                    style={{ flex: 1 }}
                    index={positionInt}
                    onChange={(position) => positionInt = position}
                    renderImage={(imageObj1) => <Image {...imageObj1} resizeMode='contain' />}
                />
                <TouchableOpacity style={{
                    right: 0,
                    position: 'absolute',
                    width: 40, height: 40, borderRadius: 40,
                    borderColor: AppColors.toolbarColor, borderWidth: 1, justifyContent: 'center',
                    alignContent: 'center', alignItems: 'center', margin: 10
                }}
                    onPress={() => this.saveImageFromLocal()}
                >
                    <MaterialCommunityIcons name='share-variant' color={AppColors.toolbarColor} size={20} />
                </TouchableOpacity>
            </View>
        </View>);
    }
}
export default ImageFullScreenShowingScreen;