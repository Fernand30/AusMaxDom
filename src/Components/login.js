import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,Linking,WebView,
  ImageBackground,Image} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {SignIn} from '../Reducers/apiReducer'
import RNFetchBlob from 'react-native-fetch-blob'
const fs = RNFetchBlob.fs
import ImagePicker from 'react-native-image-crop-picker'
import { incrementAction, decrementAction } from "../Actions/actionCreator";
import Spinner from 'react-native-loading-spinner-overlay';
import {Colors, Fonts, Images, Constants } from '../Themes';
import {uploadProImage} from '../Reducers/apiReducer'
import { sha256 } from 'react-native-sha256';
import md5 from "react-native-md5";

const url = 'http://members.maxfreedom.com.au/login/'
class Login extends Component {
   constructor(props){
    super(props);
    this.state=({
      username: '',
      password: '',
      visible: false
    })
    
  }
//juanman234+carer222@gmail.com: client   juanman234+clientnew@gmail.com: search  
// hash = '7c6a180b36896a0a8c02787eeafb0e4c'
  

  static navigationOptions = {
    headerTitle: 'Login',
    header: false
  };

  navigate = () => {
    if(this.state.username==''||this.state.password==''){
      alert('Please fill User name and password');
      return;
    }
    this.setState({visible: true})
    hex_md5v = md5.hex_md5(this.state.password);
    SignIn(this.state.username,hex_md5v).then((response)=>response.json()).then((data)=>{
      this.setState({visible: false})
      if(data.success ==true) this.goLogin(data)
        else setTimeout(function(){alert(data.errors)}, 1000);
    }).catch(function(err){
      this.setState({visible: false})
      setTimeout(function(){alert(err)}, 1000);
    }).done();
  };
 
  goLogin(data){
   accountType= data.user.accountType;
   global.userData = data.user
   const TabScreen = NavigationActions.navigate({
      routeName: "tabScreen",
      params: { login: 1, accountType: accountType}
    });
    this.props.navigation.dispatch(TabScreen);
  }

  goGuest(){
    const SignIn = NavigationActions.navigate({
      routeName: "signin"
    });
    this.props.navigation.dispatch(SignIn);
  }

  goWebsite(){
    const url = 'http://members.maxfreedom.com.au/login/';
    Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
    }).catch(err => console.error('An error occurred', err));
  }

  goWeb(){
    this.setState({
      visible: false
    })
  }

 
  onGallery(){
    //this.onImageCancelled()
    ImagePicker.openPicker({
      width: Constants.WIDTH/2,
      height: Constants.HEIGHT/2,
      cropping: true
    }).then(image => {
      this.onImageSelected(image);
    }).catch(this.onImageCancelled);
  }

   onImageSelected = (image) => {
    this.setState({
      cameraModal: false,
      profileImage: image.path,
      coverImageSource: {
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
      },
    })
    
    var data = new FormData();
        data.append('image', {uri: image.path, name: 'image.jpg', type: 'image/jpg'});

        var jsonPostData = JSON.stringify({
             profileImage: data
        });
        const config = {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data;',
         },
         body: jsonPostData,
        }

        fetch("http://members.maxfreedom.com.au/api/coach/profile/uploadProImage", config)
         .then((responseData) => {
             // Log the response form the server
             // Here we get what we sent to Postman back
             alert(JSON.stringify(responseData));
         })
         .catch(err => {
           alert(err);
     })
  }

  render() {
    return (
      <ImageBackground source = {Images.background} style = {styles.backgroundImage}>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <Image source={Images.mark} style={styles.mark}/>
        <Text style={styles.maxText}>Maximum Freedom</Text>
        <View style={styles.insertView}>
            <View style={styles.rowView}>
              <View style={styles.imageView}>
                <Image source={Images.mail} style={styles.mail}/>
              </View>  
              <TextInput placeholder='Email' placeholderTextColor='#409cb4' 
                      style={styles.textinput} onChangeText={(text) => this.setState({username:text})} value={this.state.username}/>
            </View>
            <View style={styles.rowView}>
              <View style={styles.imageView}>
                <Image source={Images.password} style={styles.password}/>
              </View>  
              <TextInput placeholder='Password' placeholderTextColor='#409cb4' secureTextEntry={true}
                      style={styles.textinput} onChangeText={(text) => this.setState({password:text})} value={this.state.password}/>
              <TouchableOpacity style={styles.question}>
                <Text style={styles.questionText}>?</Text>
              </TouchableOpacity>        
            </View>
        </View>    
        <TouchableOpacity onPress={this.navigate.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowButton} onPress={this.goGuest.bind(this)}>
          <Text style={styles.commonText}>New Member? Sign Up!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowButton} onPress={this.goWebsite.bind(this)}>
          <Text style={styles.commonText1}>Bringing freedom to you</Text>
        </TouchableOpacity>
        <View style={styles.bottomView}>
          <TouchableOpacity style={styles.rowButton}  >
            <Text style={styles.commonText1}>Sign In as Guest</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  counterCount: state.CounterReducer.counter
});

const mapDispatchToProps = {
  incrementAction,
  decrementAction
};

const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  bottomView:{
    flex:1, 
    justifyContent:'flex-end',
    paddingBottom: Constants.MARGIN*4
  },
  rowButton:{
    marginTop: Constants.MARGIN*4,
    flexDirection:'row',
    alignSelf:'center'
  },
  commonText:{
    fontSize: Constants.FONT*20,
    color: Colors.white,
    textAlign:'center',
    backgroundColor: 'transparent'
  },
  commonText1:{
    fontSize: Constants.FONT*23,
    color: Colors.white,
    textAlign:'center',
    backgroundColor: 'transparent'
  },
  imageView:{
    width: Constants.MARGIN*6,
    alignItems: 'center',
  },
  question:{
    width: Constants.MARGIN*6,
    height: Constants.MARGIN*6,
    borderRadius: Constants.MARGIN*3,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: Colors.grey
  },
  questionText:{
    fontSize: Constants.FONT*20,
    color: Colors.white,
    textAlign: 'center'
  },
  mail:{
    width: Constants.MARGIN*6,
    height: Constants.MARGIN*4,
    resizeMode: 'stretch',
    alignSelf:'center'
  },
  password:{
    width: Constants.MARGIN*4,
    height: Constants.MARGIN*6,
    resizeMode: 'stretch',
  },
  insertView:{
    alignSelf:'center',
    width: Constants.WIDTH- Constants.MARGIN*20,
    height: Constants.MARGIN*25,
    backgroundColor: Colors.white,
    marginTop: Constants.MARGIN*3,
    justifyContent:'space-between',
    paddingVertical: Constants.MARGIN*3
  },
  maxText:{
    fontSize: Constants.FONT*45,
    color: Colors.white,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontWeight: '800'
  },
  mark:{
    alignSelf: 'center',
    width: Constants.WIDTH/4,
    height: Constants.WIDTH/4/152*124,
    marginTop: Constants.MARGIN*8,

  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  }, 
  rowView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal: Constants.MARGIN*5
  },
  textinput:{
    flex:1,
    height: Constants.MARGIN*7,
    fontSize: Constants.FONT*25,
    color: '#409cb4',
    marginLeft: Constants.MARGIN*3
  },
  text:{
    fontSize: 20,
  },
  button:{
    marginTop: Constants.MARGIN*3,
    width: Constants.WIDTH- Constants.MARGIN*20,
    height:Constants.MARGIN*12,
    borderRadius: 3,
    backgroundColor: Colors.blue,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    shadowColor: Colors.shadow,
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: {width: 2, height: 2},
  },
  buttonText:{
    color:'white',
    fontSize: Constants.FONT*25
  }
});

