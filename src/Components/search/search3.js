import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,WebView,
  ImageBackground,Image, FlatList} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {Colors, Fonts, Images, Constants } from '../../Themes';
import Spinner from 'react-native-loading-spinner-overlay';

const width = Constants.WIDTH- Constants.MARGIN*6
const height = width/3*2
const aboutText = 'Active families benefit from increased physical\nhealth and also sharing more \'playtime\'\n'
                         +'together, and that means more laughs and \n'
                         +'memories made. So how do you pry your loved\n'
class Booking2 extends Component {

  constructor(props){
    super(props)
    this.state=({
      visible:true
    })
  }


  static navigationOptions = ({navigation}) => {
    
    return{
      header: false,
    }
  };

  goback(){
    this.props.navigation.goBack()
  }

  goWeb(){
    this.setState({
      visible: false
    })
  }
  
  render() {
    url = "http://members.maxfreedom.com.au/public/59893649dd7ee2da6a27b061/589851bd300f095346325c1a"
      return (
      <View style={styles.container}>
      <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
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
       <WebView
        onLoadEnd = {this.goWeb.bind(this)}
        source={{uri: url}}
        style={{marginTop: 20}}
      />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
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
  blackText:{
    marginTop: Constants.MARGIN*28,
    fontSize: Constants.FONT*30,
    textAlign: 'center',
    height: Constants.MARGIN*6
  },
  backButton:{
    width: Constants.MARGIN*5,
    height: Constants.MARGIN*5/48*80,
    marginLeft: Constants.MARGIN*2
  },
  
})

export default Booking2;
