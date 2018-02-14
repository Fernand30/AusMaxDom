import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image, FlatList} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {Colors, Fonts, Images, Constants } from '../../Themes';


const width = Constants.WIDTH- Constants.MARGIN*6
const height = width/3*2
const aboutText = 'Active families benefit from increased physical\nhealth and also sharing more \'playtime\'\n'
                         +'together, and that means more laughs and \n'
                         +'memories made. So how do you pry your loved\n'
class Booking2 extends Component {


  static navigationOptions = ({navigation}) => {
    item  = navigation.state.params.item
    return{
      header: false,
    }
  };

  goback(){
    this.props.navigation.goBack()
  }

  goWebView(){
    const WebScreen = NavigationActions.navigate({
      routeName: "search3",
    });
    this.props.navigation.dispatch(WebScreen);
  }
  
  render() {
    //alert(Object.keys(item))
     imageUrl = 'http://members.maxfreedom.com.au/images/'+item.profileImage;
      return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerLeftView}>
            <TouchableOpacity onPress={this.goback.bind(this)} style={styles.backButton}>
              <Image source={Images.backArrow} style={styles.backButton}/>
            </TouchableOpacity>
          </View>
          <View style={styles.headerCenterView}>
            <Text style={styles.headerText}>Book Sabbir</Text>
          </View>
          <View style={styles.headerRightView}>
            
          </View>
        </View>
        <Text style={styles.waiting}>Waiting</Text>
        <Image source={{uri: imageUrl}} style={styles.provider}/>
        <Text style={styles.name}>{item.profilename}</Text>   
        <Text style={styles.infoText}>{item.summary}</Text>   
        <Image source={Images.stars} style={styles.star}/>  
        <View style={styles.rowView}>
          <View style={styles.greyView}>
            <TouchableOpacity onPress={this.goWebView.bind(this)} style={styles.bookme}>
              <Text style={styles.blackText}>Book me</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.greyView}>
            <Text style={styles.infoText}>Fee</Text>
            <Text style={styles.infoText}>{item.price.individualPerHour}/ Session</Text>
          </View>
        </View>
        <Text style={styles.about}>About Doctor</Text>    
        <Text style={styles.infoText}>{aboutText}</Text>     
        <View style={styles.arrowView}> 
          <Text style={styles.arrowText}>{item.Address}</Text>
          <View style={styles.arrowImaageView}>
            <TouchableOpacity>
              <Image source={Images.arrow} style={styles.arrowImage}/>
            </TouchableOpacity>
          </View>   
        </View>  
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  arrowImage:{
    width: Constants.MARGIN*4,
    height: Constants.MARGIN*4/612*497
  },
  arrowImaageView:{
    backgroundColor: Colors.green,
    width: Constants.MARGIN*8,
    height: Constants.MARGIN*8,
    borderRadius: Constants.MARGIN*4,
    alignItems:'center',
    justifyContent: 'center'
  },
  arrowView:{
    flexDirection: 'row',
    paddingHorizontal: Constants.MARGIN*6,
    marginTop: Constants.MARGIN*4,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  arrowText:{
    fontSize: Constants.FONT*16,
    color: Colors.grey
  },
  greyView:{
    flex : 1,
    backgroundColor: Colors.backgrey,
    borderColor: Colors.grey,
    borderWidth: 1,
    paddingVertical: Constants.MARGIN,
    justifyContent: 'center'
  }, 
  infoText:{
    color: Colors.blue,
    fontSize: Constants.FONT*18,
    textAlign: 'center'
  },
  blackText:{
    fontSize: Constants.FONT*22,
    textAlign: 'center',
    height: Constants.MARGIN*6
  },
  name:{
    fontSize:Constants.FONT*25,
    color: Colors.blue,
    textAlign:'center',
    marginTop: Constants.MARGIN*2
  },
  about:{
    fontSize:Constants.FONT*25,
    color: Colors.blue,
    textAlign:'center',
    marginTop: Constants.MARGIN*8,
    marginBottom: Constants.MARGIN*2
  },
  rowView:{
    flexDirection: 'row',
    paddingHorizontal: Constants.MARGIN*4,
    marginTop: Constants.MARGIN*5,
  },
  waiting:{
    color: Colors.waiting,
    textAlign: 'right',
    marginTop: Constants.MARGIN*8,
    marginRight: Constants.MARGIN*3
  },
  bookme:{
    width: Constants.WIDTH/2.5,
    height: Constants.WIDTH/7,
    backgroundColor: Colors.white,
    alignSelf:'center',
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowColor: Colors.black,
    shadowOpacity: 1,
    justifyContent:'center'
  },
  provider:{
    width: Constants.WIDTH/4,
    height: Constants.WIDTH/3.5,
    borderRadius: Constants.WIDTH/7,
    alignSelf:'center',
    marginTop: Constants.MARGIN*8
  },
  backButton:{
    width: Constants.MARGIN*5,
    height: Constants.MARGIN*5/48*80,
    marginLeft: Constants.MARGIN*2
  },
  fruit:{
    width: Constants.WIDTH/5,
    height: Constants.WIDTH/5,
  },
  description:{
    marginLeft: Constants.MARGIN*3
  },
  title:{
    fontSize: Constants.FONT*20,
    textAlign:'center'
  },
  descriptionText:{
    fontSize: Constants.FONT*16,
    marginTop: Constants.MARGIN*2
  },
  star:{
    width: Constants.WIDTH/5,
    height: Constants.WIDTH/5/427*73,
    alignSelf:'center',
    marginTop: Constants.MARGIN*2
  },
  headerView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: Colors.black,
    borderWidth: 2,
    paddingVertical: Constants.MARGIN*3,
    paddingHorizontal: Constants.MARGIN
  },
  headerLeftView:{
    flex: 1,
    justifyContent: 'center'
  },
  headerCenterView:{
    width: Constants.WIDTH/2,
    justifyContent: 'center'
  },
  headerRightView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  headerText:{  
    fontSize: Constants.FONT*25,
    textAlign: 'center'
  },
  descriptionView:{
    marginTop: Constants.MARGIN*2,
    width: width,
    flex: 1,
    marginBottom: Constants.MARGIN*8,
    padding: Constants.MARGIN*2,
    borderColor: Colors.black,
    borderWidth: 1,
    alignSelf: 'center',
  },
})

export default Booking2;
