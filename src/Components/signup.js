import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image, Dimensions,BackHandler} from "react-native";
import Modal from "react-native-modal"; 
import { NavigationActions } from "react-navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from "react-redux";
import {SignUp} from '../Reducers/apiReducer'
import { incrementAction, decrementAction } from "../Actions/actionCreator";

import {Colors, Fonts, Images, Constants } from '../Themes';
global.profile= 0
class Login extends Component {
   constructor(props){
    super(props);
    this.state=({
      username: '',
      email: '',
      password: '',
      isModalVisible: false,
      isRadio: false,
      data: {},
    })
  }

  componentDidMount() {
    that  = this
    BackHandler.addEventListener('hardwareBackPress', function() {
        that.goBackNavigation();
        return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  

  static navigationOptions =({navigation})=> {
     accountType = navigation.state.params.accountType
    return{
      headerTitle: 'Login',
      header: false,
    }
  };

  goModalView(data){
    global.userData = data.user
    this.setState({isModalVisible: true })
  }

  navigate = () => {
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    SignUp(this.state.username,this.state.email,this.state.password,accountType).then((response)=>response.json()).then((data)=>{
      if(data['success']==true) this.goModalView(data);
        else this.goError(data)
    }).catch(function(err){
      alert(err)
    }).done();
  };

  goError(data){
    alert(data.errors)
  }
 
  goLogin(){
    renderData = global.userData
    accountType= renderData.accountType
    const TabScreen = NavigationActions.navigate({
      routeName: "tabScreen",
      params: { login: 0, accountType: accountType}
    });
    this.props.navigation.dispatch(TabScreen);
    this.setState({ isModalVisible: false });
  }

  _toggleModal = () =>{
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      if(this.state.username==''){
        alert('please insert username')
      }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)){
        alert('Please insert valid email')
      }else if(this.state.password.length<7){
        alert('Please insert characters more than six')
      }else if(!this.checkNum(this.state.password)){
        alert('Please insert number in password')   
      }else if(!this.state.isRadio){
        alert('Please agree to the terms and conditions to create an account with Maximum Freedom')
      }else{
        this.navigate()
      }
   }
    
  goBackNavigation(){
    this.props.navigation.dispatch(NavigationActions.back());
  }  

  radioChange(){
    this.setState({
      isRadio: !this.state.isRadio
    })
  }

  insertUserName(text){
    this.setState({username: text})
  }

  insertEmail(text){
    this.setState({email: text})
  }

  insertPassword(text){
    this.setState({password: text})
  }

  checkNum(text){
    for(i=0;i<text.length;i++){
      if(text[i]=='0'||text[i]=='1'||text[i]=='2'||text[i]=='3'||text[i]=='4'||text[i]=='5'||text[i]=='6'||text[i]=='7'||text[i]=='8'||text[i]=='9'){
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <ImageBackground source = {Images.grassBackground} style = {styles.backgroundImage}>
        <Image source={Images.mark} style={styles.mark}/>
        
        <View style={styles.opacityView}>
          <Text style={styles.bigText}>REGISTER FOR AN ACCOUNT</Text>
          <Text style={styles.middleText}>Welcome !</Text>
          <Text style={styles.smallText}>We just need to get a few details from you to{'\n'}get you signed up to the service</Text>
          <KeyboardAwareScrollView
                     resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}   extraScrollHeight={Dimensions.get('window').height/3} >
              <View style={styles.radiusView}>
                <View style={styles.greyView}>
                  <Text style={styles.specialText}></Text>
                </View>
                <TextInput placeholder='User name' underlineColorAndroid='transparent' style={styles.textinput} onChangeText={(text) => this.insertUserName(text)}/>
              </View>
              <View style={styles.radiusView}>
                <View style={styles.greyView}>
                  <Text style={styles.specialText}>@</Text>
                </View>
                <TextInput placeholder='Email' underlineColorAndroid='transparent' style={styles.textinput} onChangeText={(text) => this.insertEmail(text)}/>
              </View>
              <View style={styles.radiusView}>
                <View style={styles.greyView}>
                  <Text style={styles.specialbigText}>*</Text>
                </View>
                <TextInput  placeholder='Password' underlineColorAndroid='transparent' onChangeText={(text) => this.insertPassword(text)} style={styles.textinput} secureTextEntry={true}/>
              </View>
          </KeyboardAwareScrollView>    
          <View style={styles.rowView}>
            <TouchableOpacity onPress={this.radioChange.bind(this)} style={styles.radioButton}>
              {(this.state.isRadio)?<View style={styles.commaView}/>:null}
            </TouchableOpacity>
            <Text style={styles.radioText}>I agree to the Terms & Conditions</Text>
          </View>  
          <TouchableOpacity style={styles.signupButton} onPress={this._toggleModal.bind(this)}>
              <Text style={styles.signupText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.bottomText}>We will shortly be sending you a confirmation{'\n'}
        mail. Phone open the mail and click on the link{'\n'}to actually your account.</Text>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.bigModalText}>Maximum Freedom</Text>
            <Text style={styles.smallModalText}>Before booking help{'\n'}Please fill in your profile section</Text>
            <TouchableOpacity style={styles.modalButton} onPress={this.goLogin.bind(this)}>
              <Text style={styles.smallModalText}>Ok</Text>
            </TouchableOpacity>
            
          </View>
        </Modal>
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
  signupText:{
    color: Colors.white,
    fontSize: Constants.FONT*23
  },
  bottomText:{
    alignSelf:'center',
    color: Colors.white,
    fontSize: Constants.FONT*15,
    backgroundColor: 'transparent',
    marginTop: Constants.MARGIN*4
  },
  signupButton:{
    alignSelf:'center',
    width: Constants.WIDTH/3.5,
    height: Constants.WIDTH/10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Constants.MARGIN,
    backgroundColor: Colors.green,
    marginTop: Constants.MARGIN*4
  },
  radioText:{
    color: Colors.white,
    fontSize: Constants.FONT*15
  },
  radioButton:{
    width: Constants.MARGIN*4,
    height: Constants.MARGIN*4,
    borderRadius: Constants.MARGIN*2,
    backgroundColor: Colors.darkGrey,
    alignItems:'center',
    justifyContent:'center',
    marginRight: Constants.MARGIN*2
  },
  commaView:{
    width: Constants.MARGIN*1.6,
    height: Constants.MARGIN*1.6,
    borderRadius: Constants.MARGIN*0.8,
    backgroundColor: Colors.white,
  },
  radiusView:{
    flexDirection:'row',
    marginHorizontal: Constants.MARGIN*4,
    height: Constants.MARGIN*10,
    borderRadius: Constants.MARGIN*4,
    backgroundColor: Colors.white,
    marginTop: Constants.MARGIN*5
  },
  greyView:{
    backgroundColor: Colors.inputGrey,
    width: Constants.MARGIN*10,
    height: Constants.MARGIN*10,
    borderTopLeftRadius: Constants.MARGIN*4,
    borderBottomLeftRadius: Constants.MARGIN*4,
    alignItems:'center',
    justifyContent:'center'
  },
  textinput:{
    flex:1,
    height: Constants.MARGIN*10,
    fontSize: Constants.FONT*18,
    color: Colors.inputGrey,
    marginLeft: Constants.MARGIN*2
  },
  specialText:{
    color: Colors.white,
    fontSize: Constants.FONT*30,
  },
  specialbigText:{
    color: Colors.white,
    fontSize: Constants.FONT*60,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: Constants.MARGIN*4
  },
  opacityView:{
    width: Constants.WIDTH- Constants.MARGIN*20,
    paddingVertical: Constants.MARGIN*5,
    alignSelf: 'center',
    backgroundColor: '#88a28540',
    marginTop: Constants.MARGIN*10,
  },
  modalButton:{
    borderTopWidth: 1,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    height: Constants.MARGIN*8,
    marginTop: Constants.MARGIN*14,
  },
  smallText:{
    fontSize: Constants.FONT*15,
    color: Colors.white,
    marginLeft: Constants.MARGIN*6,
  },
  bigText:{
    fontSize: Constants.FONT*25,
    textAlign: 'center',
    marginBottom: Constants.MARGIN*2,
    fontWeight: '600',
    color: Colors.white,
    marginTop: Constants.MARGIN*4,
  },
  bigModalText:{
    fontSize: Constants.FONT*25,
    textAlign: 'center',
    marginBottom: Constants.MARGIN*2,
    fontWeight: '600'
  },
  smallModalText:{
    fontSize: Constants.FONT*20,
    textAlign: 'center',
  },
  middleText:{
    fontSize: Constants.FONT*20,
    marginTop: Constants.MARGIN*5,
    color: Colors.white,
    marginLeft: Constants.MARGIN*6,
  },
  modalView:{
    width: Constants.WIDTH- Constants.MARGIN*10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    alignSelf: 'center',
    paddingVertical: Constants.MARGIN*3
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
  backArrow:{
    marginLeft:Constants.MARGIN*5,
    width: Constants.WIDTH/25,
    height: Constants.WIDTH/25/48*80,
    marginTop: Constants.MARGIN*6,
  },
  mark:{
    width: Constants.WIDTH/4,
    height: Constants.WIDTH/4/152*124,
    marginTop: Constants.MARGIN*8,
    alignSelf:'center'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  }, 
  headerView:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  rowView:{
    flexDirection:'row',
    alignSelf:'center',
    alignItems:'center',
    marginTop: Constants.MARGIN*4
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

