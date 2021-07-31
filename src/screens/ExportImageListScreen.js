import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FadeInView from '../styles/FadeInView'
import Elavation from '../styles/Elavation';
import AppColors from '../Colors/AppColors';
import { FlatList } from 'react-native-gesture-handler';
import Toolbar from './Toolbar';

let itemObj = null;
let baseImagePath = null;
class ExportImageListScreen extends Component {
    constructor(props) {
        super(props)
        itemObj = this.props.navigation.state.params.itemObj;
        baseImagePath = this.props.navigation.state.params.baseImagePath;
        this.state = {
            imageList: [

            ]
        }
    }

    componentDidMount() {
        for (let index = 0; index < itemObj.exportImages.length; index++) {
            const element = itemObj.exportImages[index];
            this.state.imageList.push(baseImagePath + element.thumbnail)
            console.log('Image vehicle :;; ', baseImagePath + element.thumbnail)
        }
        this.setState({ imageList: this.state.imageList })
    }

    //Render Vehicle list
    renderVehicleImage = ({ item, index }) => {
        return <Elavation
            elevation={4}
            style={{ width: '47%', height: 180, marginBottom: '5%', marginRight: '2.7%' }}
        >
            <TouchableOpacity
                style={{flex:1}}
                onPress={()=>this.props.navigation.navigate('ImageFullScreenShowingScreen',{'imageObj':item,'positionInt':index,'imageList':this.state.imageList})}
            >
                <Image style={{ width: undefined, height: undefined, flex: 1 }} source={{ uri: item }} resizeMode='cover' />
            </TouchableOpacity>


        </Elavation>
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <Image source={require('../Images/backgroundimage4.jpg')}
                    resizeMode='stretch' style={{ width: deviceWidth, height: deviceHeight * 0.49, position: 'absolute' }} /> */}
                <View style={{ backgroundColor: AppColors.toolbarColor }}>
                    <Toolbar headerName={itemObj.container_number} isFilterIconShow={true} isInnerScreen={true} />
                </View>

                <FlatList
                    style={{ marginLeft: '2.6%', marginTop: 8 }}
                    data={this.state.imageList}
                    renderItem={this.renderVehicleImage}
                    keyExtractor={(item, index) => index}
                    extraData={this.state}
                    numColumns={2}
                />
            </View>
        );
    }
}
export default ExportImageListScreen;
