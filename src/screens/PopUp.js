import React, { Component } from "react"
import {Image,View,TouchableOpacity,StyleSheet,BackHandler} from  "react-native";
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge,Text} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationActions } from 'react-navigation';
import AppColors from '../constance/AppConstance';




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
            <Content>
       <List>
        <ListItem 
            style={{height:50,
            }}
        onPress={() => this.props.navigation.navigate('LocationServiceOne')} selected>
           
        <Image source={ require('../Images/yard.png')} 
                    style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
                   />
           
        <Text style={{color:'black',marginLeft:10}}>YARD</Text>        
        
        </ListItem>
        
        <ListItem
            style={{height:50,marginTop:15,
            }} onPress={() => this.props.navigation.navigate('OurServiceOne')} selected>
        <Image source={ require('../Images/our_services.png')} 
                    style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
                   />
           
        <Text style={{marginLeft:10}}>OUR SERVICES</Text>        
        
        </ListItem>
        <ListItem
            style={{height:50,marginTop:15,
            }} onPress={() => this.props.navigation.navigate('ContactUsOne')} selected>
        <Image source={ require('../Images/contact_us.png')} 
                    style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
                   />
           
        <Text style={{marginLeft:10}}>CONTACT US</Text>        
        
        </ListItem>
        
        
 
</List>
</Content>
</Container>
</ScrollView>
)
}
}
