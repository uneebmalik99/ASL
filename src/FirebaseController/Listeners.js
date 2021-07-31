import { Platform,  AppState } from 'react-native';
// import { Platform, AsyncStorage, AppState } from 'react-native';

import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption } from "react-native-fcm";
import AppConst from '../constance/AppConstance';
import AsyncStorage from '@react-native-community/async-storage';

FCM.on(FCMEvent.Notification, notif => {
  console.log('Testing ggggggg', notif)
  console.log('App State ', AppState.currentState)
  var notificationMsg = null;
  notificationMsg = notif.fcm.body;


  if (AppState.currentState == 'uninitialized') {
    console.log('My Notification :: 11 :', notif)
    let vehiclObj = {
      type: notif.type,
      vehicle_id: notif.vehicle_id
    }
    console.log('TEST ::: 1',JSON.stringify(vehiclObj))
   // AsyncStorage.setItem('lastNotification_type', notif.type).then((save) => console.log('ssave datasdd :: ', save)).catch((error) => console.log('errrprpr ', error));
    //AsyncStorage.setItem('lastNotification_new', notif.vehicle_id);
    AsyncStorage.setItem('notifi',JSON.stringify(vehiclObj));
    FCM.presentLocalNotification({
      id: new Date().valueOf().toString(),
      title: 'Galaxy WolrdWide',
      body: notificationMsg,
      priority: "high",
      badge: 0, // as FCM payload IOS only, set 0 to clear badges
      number: 0, // Android only
      show_in_foreground: true,
      icon: "galaxy_icon_round",
      sound: "default",
      click_action: "com.myidentifi.fcm.text", // for ios
    });
  } else if (AppState.currentState == 'active') {
    console.log('My Notification : 22 ::', notif)
    let vehiclObj = {
      type: notif.type,
      vehicle_id: notif.vehicle_id
    }
    console.log('TEST ::: 2',JSON.stringify(vehiclObj))
    AsyncStorage.setItem('notifi',JSON.stringify(vehiclObj));
   // AsyncStorage.setItem('lastNotification_type', notif.type).then((save) => console.log('ssave datasdd :: ', save)).catch((error) => console.log('errrprpr ', error));
   // AsyncStorage.setItem('lastNotification_new', notif.vehicle_id).then((save) => console.log('ssave datasdd :: ', save)).catch((error) => console.log('errrprpr ', error));
    //AsyncStorage.setItem('notifi',JSON.stringify(vehiclObj)  );
    FCM.presentLocalNotification({
      id: new Date().valueOf().toString(),
      title: 'Galaxy WolrdWide',
      body: notificationMsg,
      priority: "high",
      badge: 0, // as FCM payload IOS only, set 0 to clear badges
      number: 0, // Android only
      show_in_foreground: true,
      icon: "galaxy_icon_round",
      sound: "default",
      click_action: "com.myidentifi.fcm.text", // for ios
    });

  }
  else if (AppState.currentState == 'background') {
    // var regex = /(<([^>]+)>)/ig;
    // var notificationMsg = notif.message.replace(regex, '');
   // console.log('My Notification :::', notif)
   // AsyncStorage.setItem('testingDemo', 'workingfine').then((save) => console.log('ssave datasdd :: ', save)).catch((error) => console.log('errrprpr ', error));
   let vehiclObj = {
    type: notif.type,
    vehicle_id: notif.vehicle_id
  } 
  console.log('TEST ::: 3',JSON.stringify(vehiclObj))
  // AsyncStorage.setItem('notifi', JSON.stringify(vehiclObj));
    // FCM.presentLocalNotification({
    //   id: new Date().valueOf().toString(),
    //   title: 'Galaxy WolrdWide',
    //   body: notificationMsg ,
    //   priority: "high",
    //   badge: 0, // as FCM payload IOS only, set 0 to clear badges
    //   number: 0, // Android only
    //   show_in_foreground: false,
    //   icon: "galaxy_icon_round",
    //   sound: "default",
    //   click_action: "com.myidentifi.fcm.text", // for ios
    // });
    // AsyncStorage.setItem('lastNotification_new', notif);
  }
  FCM.removeDeliveredNotification();
})




// AsyncStorage.getItem('lastNotification').then(data => {
//   if (data) {
//     // if notification arrives when app is killed, it should still be logged here
//     console.log('last notification', JSON.parse(data));
//     var notificationData = JSON.parse(data);
//     var regex = /(<([^>]+)>)/ig;
//     //var notificationMsg = notificationData.message.replace(regex, '');
//     // FCM.presentLocalNotification({
//     //   id: new Date().valueOf().toString(),
//     //   title: 'Teamify',
//     //   body: notificationMsg,
//     //   priority: "high",
//     //   badge: 10, // as FCM payload IOS only, set 0 to clear badges
//     //   number: 0, // Android only
//     //   show_in_foreground: true,
//     //   icon: "teamify_round_icons",
//     //   sound: "default",
//     //   click_action: "com.myidentifi.fcm.text", // for ios
//     //   // android_actions: JSON.stringify([
//     //   //   {
//     //   //     id: "view",
//     //   //     title: "view"
//     //   //   },
//     //   //   {
//     //   //     id: "dismiss",
//     //   //     title: "dismiss"
//     //   //   }
//     //   // ]) // for android, take syntax similar to ios's. only buttons are supported
//     // });
//     AsyncStorage.removeItem('lastNotification');
//   }
// })




export function registerKilledListener() {
  // these callback will be triggered even when app is killed
  FCM.on(FCMEvent.Notification, notif => {
    console.log('INNERRR LOC', notif)
    AsyncStorage.getItem('notifi').then((data)=>{
      console.log('data::dsdad:: ',data)


    })
    // AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
    // FCM.presentLocalNotification({
    //   id: new Date().valueOf().toString(),
    //   title: 'Galaxy WolrdWide',
    //   body: new Date().valueOf().toString(),
    //   priority: "high",
    //   badge: 10, // as FCM payload IOS only, set 0 to clear badges
    //   number: 0, // Android only
    //   //show_in_foreground: true,
    //   icon: "galaxy_icon_round",
    //   sound: "default",
    //   click_action: "com.myidentifi.fcm.text", // for ios
    //   // android_actions: JSON.stringify([
    //   //   {
    //   //     id: "view",
    //   //     title: "view"
    //   //   },
    //   //   {
    //   //     id: "dismiss",
    //   //     title: "dismiss"
    //   //   }
    //   // ]) // for android, take syntax similar to ios's. only buttons are supported
    // });



    if (notif.opened_from_tray) {
      setTimeout(() => {
        // if (notif._actionIdentifier === 'reply') {
        //   if (AppState.currentState !== 'background') {
        //     console.log('User replied ' + JSON.stringify(notif._userText))
        //     alert('User replied ' + JSON.stringify(notif._userText));
        //   } else {
        //     AsyncStorage.setItem('lastMessage', JSON.stringify(notif._userText));
        //     FCM.cancelLocalNotification(notif);
        //   }
        // }
        if (notif._actionIdentifier === 'view') {
          alert("User clicked View in App");
        }
        if (notif._actionIdentifier === 'dismiss') {
          alert("User clicked Dismiss");
        }
      }, 1000)
    }
  });
}

// these callback will be triggered only when app is foreground or background
export function registerAppListener(navigation) {
  AsyncStorage.getItem('notifi').then((data)=>{
    console.log('data::dsdad:: ',data)
  })
  // AsyncStorage.getItem('lastNotification_new').then((data) => {
  //   if (data) {
  //     console.log('Notification value :: ', data)

  //   }
  // }).catch((error) => console.log('Errror data , ', error))




  FCM.on(FCMEvent.Notification, notif => {
    console.log("Notification_CLICKKKKKK", notif);
    var notificationMsg = '';

    // FCM.presentLocalNotification({
    //   id: new Date().valueOf().toString(),
    //   title: 'Teamify',
    //   body: notificationMsg,
    //   priority: "high",
    //   badge: 10, // as FCM payload IOS only, set 0 to clear badges
    //   number: 0, // Android only
    //   show_in_foreground: true,
    //   icon: "teamify_round_icons",
    //   sound: "default",
    //   click_action: "com.myidentifi.fcm.text", // for ios
    // });


    if (Platform.OS === 'ios' && notif._notificationType === NotificationType.WillPresent && !notif.local_notification) {
      // this notification is only to decide if you want to show the notification when user if in foreground.
      // usually you can ignore it. just decide to show or not.
      notif.finish(WillPresentNotificationResult.All)
      return;
    }

    if (notif.opened_from_tray) {
      setTimeout(() => {
        // click click notification 
        console.log('time out view ')
        AsyncStorage.getItem('notifi').then((data)=>{
          console.log('data::dsdad:: ',JSON.parse(data).type)

          if(data!=undefined && data!=null){
          //  AppConst.APP_PROPS.navigation.push('NotificationInvoiceDetailsScreen', { 'vehicleObj': 85 })   
            if (JSON.parse(data).type=='V' || JSON.parse(data).type=='v') {
              AppConst.APP_PROPS.navigation.push('NotificationVehicleDetailscreen', { 'vehicleObj': JSON.parse(data).vehicle_id })   
            }else if(JSON.parse(data).type=='I' || JSON.parse(data).type=='i'){
              AppConst.APP_PROPS.navigation.push('NotificationInvoiceDetailsScreen', { 'invoceObj': JSON.parse(data).invoice_id })   
            }
           
            AsyncStorage.removeItem('notifi');
          }
        }).catch((error)=>console.log('errorrr ',error))

        // AsyncStorage.getItem('lastNotification_new').then((data) => {
        //   if (data) {
        //     AsyncStorage.getItem('lastNotification_type').
        //       then((dataType) => {
        //         if (dataType != undefined && dataType != null && dataType != '') {
        //        //   AppConst.APP_PROPS.navigation.push('NotificationVehicleDetailscreen', { 'vehicleObj': data })
        //           AsyncStorage.removeItem('lastNotification_new');
        //           AsyncStorage.removeItem('lastNotification_type');
        //           FCM.removeDeliveredNotification();

        //         } else {
        //           AppConstance.APP_PROPS.navigation.navigate('InvoiceDetailsScreen', { 'invoceObj': item, })
        //      //     AppConst.APP_PROPS.navigation.push('NotificationVehicleDetailscreen', { 'vehicleObj': data })
        //           AsyncStorage.removeItem('lastNotification_new');
        //           AsyncStorage.removeItem('lastNotification_type');
        //           FCM.removeDeliveredNotification();
        //         }
        //       }
        //       )
        //     console.log('Notification value :: ', data)

        //   }
        // })

      }, 500)
    }

    if (Platform.OS === 'ios') {
      //optional
      //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
      //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
      //notif._notificationType is available for iOS platfrom
      switch (notif._notificationType) {
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
          // this type of notificaiton will be called only when you are in foreground.
          // if it is a remote notification, don't do any app logic here. Another notification callback will be triggered with type NotificationType.Remote
          break;
      }
    }
  });

  FCM.on(FCMEvent.RefreshToken, token => {
    console.log("TOKEN (refreshUnsubscribe)", token);
  });

  FCM.enableDirectChannel();
  FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
    console.log('direct channel connected' + data);
  });
  setTimeout(function () {
    FCM.isDirectChannelEstablished().then(d => console.log(d));
  }, 1000);
}

FCM.setNotificationCategories([
  {
    id: 'com.myidentifi.fcm.text',
    actions: [
      {
        type: NotificationActionType.TextInput,
        id: 'reply',
        title: 'Quick Reply',
        textInputButtonTitle: 'Send',
        textInputPlaceholder: 'Say something',
        intentIdentifiers: [],
        options: NotificationActionOption.AuthenticationRequired
      },
      {
        type: NotificationActionType.Default,
        id: 'view',
        title: 'View in App',
        intentIdentifiers: [],
        options: NotificationActionOption.Foreground
      },
      {
        type: NotificationActionType.Default,
        id: 'dismiss',
        title: 'Dismiss',
        intentIdentifiers: [],
        options: NotificationActionOption.Destructive
      }
    ],
    options: [NotificationCategoryOption.CustomDismissAction, NotificationCategoryOption.PreviewsShowTitle]
  }
])
