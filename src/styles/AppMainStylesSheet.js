import { StyleSheet, Platform } from 'react-native';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceWidth, deviceHeight } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';

export default StyleSheet.create({
    appMainContainer: {
        flex: 1,
        backgroundColor: AppColors.appBackColor,
    },
    appHeaderMainStyle: {
        height: 50,
        flexDirection: 'row'
    },
    fragmentsMainContainer: {
        flex: 1,
        backgroundColor: AppColors.appBackColor
    },
    toolbarElavation: {
        elevation: 4
    },
    toolbarColor: {
        height: 50,
        backgroundColor: AppColors.btnBackColor,
        alignContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    toolbarTxtStyle: {
        fontFamily: AppFonts.SourceSansProSemiBold,
        color: AppColors.black,
        fontSize: 18,
        paddingLeft: 3,
        flex: 1
    },
    innerToolbarTxtStyle: {
        fontFamily: AppFonts.SourceSansProSemiBold,
        color: AppColors.black,
        fontSize: 15,
        paddingLeft: 3
    }
})