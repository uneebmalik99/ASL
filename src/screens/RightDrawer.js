import React, { Component } from "react"
import {Image,View,TouchableOpacity,StyleSheet,BackHandler} from  "react-native";
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge,Text} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationActions } from 'react-navigation';
import AppColors from '../constance/AppConstance';
import AsyncStorage from '@react-native-community/async-storage';




export default class RightDrawer extends React.Component {
constructor(props) {
super(props)
this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

}


componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

}
componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

_storeData = async () => {
  this.props.navigation.navigate('LoginScreen');

  AsyncStorage.setItem(AppConstance.IS_USER_LOGIN, '0');
  AsyncStorage.removeItem(AppConstance.USER_INFO_OBJ);

    // try {

    //   await AsyncStorage.setItem(
    //     'USER_INFO_OBJ',
    //     ''
    //   );

      
    //   await AsyncStorage.setItem(
    //     'IS_USER_LOGIN',
    //     '0'
    //   );
    // } catch (error) {
    //   // Error saving data
    //   alert(error);

    // }

  };


handleBackButtonClick() {
    //this.props.navigation.goBack(null);
  this.props.navigation.navigate('DashboardScreen')
    return true;
}
navigateToScreen = (route) => () => {
const navigate = NavigationActions.navigate({
routeName: route
});
this.props.navigation.dispatch(navigate);
}
render() {
return (
<ScrollView>
<Container>

<View    style={{ 
              height:50,
          backgroundColor:AppColors.Headercolor,
  
          
          
          }}
    >       

<TouchableOpacity style={{position: 'absolute',
         
         justifyContent:"flex-start",
         marginLeft:5
     }  
         }
         //onPress={() => this.props.navigation.navigate('LeftSideBar')}      
               >

        
              <Image source={ require('../Images/logo_final.png')} 
         style={{ width:50, height:50, alignSelf: 'center', }} resizeMode='contain'
        />
          </TouchableOpacity>
   <View 
      style={{
          alignSelf:'center',

justifyContent:"center",
alignSelf:"center",
marginTop:13
      }}
   >
       <Image 
style={{width:25,height:25}}
       source={require('../Images/home-icon-23.png')}
       />
   </View>
   <TouchableOpacity style={{paddingHorizontal:10,marginTop:10, position: 'absolute',alignSelf:"flex-end", alignContent:"flex-end", justifyContent:"flex-end",alignItems:"flex-end",
            }  
            }
            onPress={() => this.props.navigation.navigate('RightDrawer')}            >

           
                 <Image source={ require('../Images/some_icon.png')} 
            style={{ width: 26, height:26, }} 
           />
             </TouchableOpacity>

    </View>
<Header


 style={{ width:"105%", height:130}}>


<Image source={ require('../Images/image.jpg')} 
            style={{ width: "105%", height:130,  }} 
           />
<Left/>
<Body>
</Body>
<Right />
</Header>
<Content>
<List>


<ListItem noBorder
 style={{height:40, marginTop:10,
   }}
onPress={() => this.props.navigation.navigate('DashboardScreen')} selected>
<Image source={ require('../Images/d.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{ fontSize:14, color:'black', marginLeft:10}}>DASHBOARD      </Text>

</ListItem>
<ListItem noBorder
style={{height:40,
}}
 onPress={() => this.props.navigation.navigate('VehicleScreen')} selected>
<Image source={ require('../Images/car.png')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>VEHICLE</Text>        

</ListItem>
<ListItem noBorder
style={{height:40,
}}
onPress={() => this.props.navigation.navigate('ContainerTrackingOne')} selected>
<Image source={ require('../Images/ww.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>CONTAINER</Text>        

</ListItem>
<ListItem noBorder
style={{height:40,
}}
onPress={() => this.props.navigation.navigate('AccountSectionMainScreen')} selected>
<Image source={ require('../Images/acc.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>ACCOUNT</Text>        

</ListItem>

<ListItem noBorder
style={{height:40,
}}
onPress={() => this.props.navigation.navigate('OurServiceOne')} selected>
<Image source={ require('../Images/j.jpeg')} 
            style={{  width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>SERVICES</Text>        

</ListItem>

<ListItem noBorder
style={{height:40,
}}
onPress={() => this.props.navigation.navigate('ContactUsOne')} selected>
<Image source={ require('../Images/c.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>CONTACT US </Text>        

</ListItem>


<ListItem noBorder
style={{height:40,
}}
onPress={() => this.props.navigation.navigate('WishListScreen')} selected>
<Image source={ require('../Images/ann.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>ANNOUNCEMENT</Text>        

</ListItem>


<ListItem noBorder
    style={{height:40,
    }}
onPress={() => this.props.navigation.navigate('LocationServiceOne')} selected>
   
<Image source={ require('../Images/w.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, color:'black',marginLeft:10}}>OUR LOCATION</Text>        

</ListItem>

<ListItem noBorder
    style={{height:40,marginTop:25, marginBottom:20,
    }}
     onPress={() =>  this._storeData()}>

<Image source={ require('../Images/l.jpeg')} 
            style={{ width: 27, height:27, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text style={{fontSize:14, marginLeft:10}}>LOGOUT</Text>        

</ListItem>







</List>
</Content>
</Container>
</ScrollView>
)
}
}



































// import React, { Component } from "react"
// import {Image,View,TouchableOpacity,StyleSheet,BackHandler} from  "react-native";
// import { Content,List, ImageBackground, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge,Text} from "native-base";
// import { ScrollView } from "react-native-gesture-handler";
// import { NavigationActions } from 'react-navigation';
// import AppColors from '../constance/AppConstance';




// export default class RightDrawer extends React.Component {
// constructor(props) {
// super(props)
// this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

// }


// componentDidMount(){
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

// }
// componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
// }

// handleBackButtonClick() {
//     //this.props.navigation.goBack(null);
//   this.props.navigation.navigate('DashboardScreen')
//     return true;
// }
// navigateToScreen = (route) => () => {
// const navigate = NavigationActions.navigate({
// routeName: route
// });
// this.props.navigation.dispatch(navigate);
// }
// render() {
// return (
// <ScrollView>
// <Container>
// <View    style={{ 
//               height:50,
//           backgroundColor:AppColors.Headercolor,
  
          
          
//           }}
//     >       

// <TouchableOpacity style={{position: 'absolute',
         
//          justifyContent:"flex-start",
//          marginLeft:5
//      }  
//          }
//          //onPress={() => this.props.navigation.navigate('LeftSideBar')}      
//                >

        
//               <Image source={ require('../Images/logo_final.png')} 
//          style={{ width:50, height:50, alignSelf: 'center', }} resizeMode='contain'
//         />
//           </TouchableOpacity>
//    <View 
//       style={{
//           alignSelf:'center',

// justifyContent:"center",
// alignSelf:"center",
// marginTop:13
//       }}
//    >
//        <Image 
// style={{width:25,height:25}}
//        source={require('../Images/home-icon-23.png')}
//        />
//    </View>
//    <TouchableOpacity style={{paddingHorizontal:10,marginTop:10, position: 'absolute',alignSelf:"flex-end", alignContent:"flex-end", justifyContent:"flex-end",alignItems:"flex-end",
//             }  
//             }
//             onPress={() => this.props.navigation.navigate('RightDrawer')}            >

           
//                  <Image source={ require('../Images/some_icon.png')} 
//             style={{ width: 26, height:26, }} 
//            />
//              </TouchableOpacity>

//     </View>
// <Header


//  style={{ width:"105%", height:125}}>


// <ImageBackground source={ require('../Images/image.jpg')} 
//             style={{ width: "105%", height:125,  }} 
//            >


//            </ImageBackground>


// <Left/>
// <Body>
// </Body>
// <Right />
// </Header>
// <Content>
// <List>


// <ListItem noBorder
//  style={{height:40, marginTop:10,
//    }}
// onPress={() => this.props.navigation.navigate('DashboardScreen')} selected>
// <Image source={ require('../Images/d.jpeg')} 
//             style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
//            />
   
// <Text style={{fontSize:14, color:'black', marginLeft:10}}>DASHBOARD      </Text>

// </ListItem>
// <ListItem noBorder
// style={{height:40,
// }}
//  onPress={() => this.props.navigation.navigate('VehicleScreen')} selected>
// <Image source={ require('../Images/car.png')} 
//             style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
//            />
   
// <Text style={{fontSize:14, color:'black',marginLeft:10}}>VEHICLE</Text>        

// </ListItem>
// <ListItem noBorder
// style={{height:40,
// }}
// onPress={() => this.props.navigation.navigate('ContainerTrackingOne')} selected>
// <Image source={ require('../Images/ww.jpeg')} 
//             style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
//            />
   
// <Text style={{fontSize:14, color:'black',marginLeft:10}}>CONTAINER</Text>        

// </ListItem>
// <ListItem noBorder
// style={{height:40,
// }}
// onPress={() => this.props.navigation.navigate('AccountSectionMainScreen')} selected>
// <Image source={ require('../Images/acc.jpeg')} 
//             style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
//            />
   
// <Text style={{fontSize:14, color:'black',marginLeft:10}}>ACCOUNT</Text>        

// </ListItem>

// <ListItem noBorder
// style={{height:40,
// }}
// onPress={() => this.props.navigation.navigate('OurServiceOne')} selected>
// <Image source={ require('../Images/j.jpeg')} 
//             style={{  width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
//            />
   
// <Text style={{fontSize:14, color:'black',marginLeft:10}}>SERVICES</Text>        

// </ListItem>

// <ListItem noBorder
// style={{height:40,
// }}
// onPress={() => this.props.navigation.navigate('ContactUsOne')} selected>
// <Image source={ require('../Images/c.jpeg')} 
//             style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
//            />
   
// <Text style={{fontSize:14, color:'black',marginLeft:10}}>CONTACT US </Text>        

// </ListItem>


// <ListItem noBorder
// style={{height:40,
// }}
// onPress={() => this.props.navigation.navigate('WishListScreen')} selected>
// <Image source={ require('../Images/ann.jpeg')} 
//             style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
//            />
   
// <Text style={{fontSize:14, color:'black',marginLeft:10}}>ANNOUNCEMENT</Text>        

// </ListItem>


// <ListItem noBorder
//     style={{height:40,
//     }}
// onPress={() => this.props.navigation.navigate('LocationServiceOne')} selected>
   
// <Image source={ require('../Images/w.jpeg')} 
//             style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
//            />
   
// <Text style={{fontSize:14, color:'black',marginLeft:10}}>OUR LOCATION</Text>        

// </ListItem>

// <ListItem noBorder
//     style={{height:40,marginTop:25, marginBottom:20,
//     }} onPress={() => this.props.navigation.navigate('LoginScreen')} selected>
// <Image source={ require('../Images/l.jpeg')} 
//             style={{ width: 30, height:30, alignSelf: 'center' }} resizeMode='contain'
//            />
   
// <Text style={{fontSize:14, marginLeft:10}}>LOGOUT</Text>        

// </ListItem>







// </List>
// </Content>
// </Container>
// </ScrollView>
// )
// }
// }
