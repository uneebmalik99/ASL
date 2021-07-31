import React, { Component } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import appColors from '../Colors/AppColors';
import { deviceHeight, deviceWidth } from '../constance/AppConstance';



const Loader = props => {
    const {
        loading,
        ...attributes
    } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={loading}
            onRequestClose={() => { console.log('close modal') }}>
            <View style={styles.modalBackground}>
                <View style={{ height: deviceHeight, width: deviceWidth, opacity: 0.7, position: 'absolute', backgroundColor: appColors.white }} />
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        color={appColors.toolbarColor}
                        size="large"
                        animating={loading} />
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // alignItems: 'center',
        // flexDirection: 'column',
        // justifyContent: 'space-around',
    },
    activityIndicatorWrapper: {
        backgroundColor: appColors.transplantColor,
        height: 180,
        width: 180,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'

    }
});
export default Loader;