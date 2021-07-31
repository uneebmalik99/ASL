import React, { Component } from "react"
import {Image,StyleSheet} from  "react-native";
import { Content,List, Header, Body, Title,ListItem, Container, Left, Right, Icon,Badge,Text} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation';



export default class LeftSideBar extends React.Component {
constructor(props) {
super(props)
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
<Header>
<Left/>
<Body>
</Body>
<Right />
</Header>
<Content>
<List>
    
<ListItem onPress={() => this.props.navigation.navigate('VehcileContainerListScreen')} selected>
<Image source={ require('../Images/car_tracking.png')} 
            style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text> Car Tracking</Text>        

</ListItem>

<ListItem onPress={() => this.props.navigation.navigate('ContainerTrackingScreen')} selected>
<Image source={ require('../Images/container_tracking.png')} 
            style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text>Conatiner Tracking</Text>        

</ListItem>
<ListItem onPress={() => this.props.navigation.navigate('LocationServiceScreen')} selected>
<Image source={ require('../Images/yard.png')} 
            style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text>Yard</Text>        

</ListItem>
<ListItem onPress={() => this.props.navigation.navigate('ContactUsScreen')} selected>
<Image source={ require('../Images/contact_us.png')} 
            style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text>Conatct Us</Text>        

</ListItem>

<ListItem onPress={() => this.props.navigation.navigate('OurServiceListScreen')} selected>
<Image source={ require('../Images/our_services.png')} 
            style={{ width: 40, height:40, alignSelf: 'center' }} resizeMode='contain'
           />
   
<Text>Our Services</Text>        

</ListItem>




</List>
</Content>
</Container>
</ScrollView>
)
}
}
