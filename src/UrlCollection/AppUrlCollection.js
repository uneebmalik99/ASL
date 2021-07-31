import React,{ Component } from "react";

class AppUrlCollection extends Component{
    // static BASE_URL = 'https://manage.aslshippingline.com/webapi/';manage.aslshippingline.com
    static BASE_URL = 'http://impulsionprojects.online/webapi/';
    static LOGIN = AppUrlCollection.BASE_URL+'login';
    static USER = AppUrlCollection.BASE_URL+'user';
    static EXPORT_LIST = AppUrlCollection.BASE_URL+ 'export?';
    static EXPORT_DETAIL = AppUrlCollection.BASE_URL+ 'export/view?';
    static VEHILE_LIST = AppUrlCollection.BASE_URL + 'vehicle?';
    static VEHICLE_DETAIL = AppUrlCollection.BASE_URL + 'vehicle/view';
    static LOCATION = AppUrlCollection.BASE_URL + 'location';
    static LOCATION2 = AppUrlCollection.BASE_URL + 'search/location';
    static CONTACT_US = AppUrlCollection.BASE_URL + 'contact-us/create';
    static INVOICE = AppUrlCollection.BASE_URL + 'invoice?';
    
    //static CONTAINER_TRACKING = AppUrlCollection.BASE_URL + 'export/tracking?';
    static CONTAINER_TRACKING = AppUrlCollection.BASE_URL + 'search/export?';
    static CONTAINER_TRACKING_VIEW = AppUrlCollection . BASE_URL + 'search/export-view?';

    //static VEHICLE_CONTAINER = AppUrlCollection.BASE_URL + 'vehicle/vehicle-shipping-details'
    static VEHICLE_CONTAINER = AppUrlCollection.BASE_URL + 'search/vehicle?'
    static VEHICLE_TRACKING_DETAIL = AppUrlCollection.BASE_URL + 'search/vehicle-view?'
    
    static DOWNLOAD_BILLE = AppUrlCollection.BASE_URL + 'export/billofladng-download?'
    static DOWNLOAD_MAINFEST = AppUrlCollection.BASE_URL + 'export/manifest-download?'
    
    static FORGOT_PASSWORD = AppUrlCollection.BASE_URL + 'user/forgot-password'
    static CHANGE_PASSWORD = AppUrlCollection.BASE_URL + 'user/update-password'

    static PAYMENT_HISTORY = AppUrlCollection.BASE_URL + 'invoice/payment-history';

    static DOWNLOAD_INVOICE = AppUrlCollection.BASE_URL + 'invoice/download?'

    static GET_COUNTER = AppUrlCollection.BASE_URL + 'vehicle/get-vehicle-counter';

    static INVOICE_VIEW = AppUrlCollection.BASE_URL + 'invoice/view?';

    static GET_YARD = 'https://gwwshipping.com/getYards.php';

    static ANNOUCMENT = AppUrlCollection.BASE_URL + 'announcement';
//     http://localhost/yii2_work/new_galaxy/webapi/export/billofladng-download?id=1
// http://localhost/yii2_work/new_galaxy/webapi/export/manifest-download?id=1

}
export default AppUrlCollection;