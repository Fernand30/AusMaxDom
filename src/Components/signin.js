import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image,BackHandler} from "react-native";
import Modal from "react-native-modal"; 
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import ApiLink from '../Reducers/apiReducer'

import { incrementAction, decrementAction } from "../Actions/actionCreator";
import {Colors, Fonts, Images, Constants } from '../Themes';

class Login extends Component {
   constructor(props){
    super(props);
    this.state=({
      username: '',
      password: '',
      isModalVisible: false
    })
  }
//juanman234+carer222@gmail.com   juanman234+clientnew@gmail.com
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
  
  goBackNavigation(){
    //this.props.navigation.goBack()
    this.props.navigation.dispatch(NavigationActions.back());
  }  

  static navigationOptions = {
    headerTitle: 'Login',
    header: false
  };

  navigate = () => {
    ApiLink(this.state.username,this.state.password).then((response)=>response.json()).then((data)=>{
      if(data['success']==true) this.goLogin(data)
        else alert('login failed. try again with correct username and password')
    }).catch(function(err){
      alert(err)
    }).done();
  };
 
  goLogin(data){
   accountType= data.user.accountType;
   const TabScreen = NavigationActions.navigate({
      routeName: "tabScreen",
      params: { accountType: accountType }
    });
    this.props.navigation.dispatch(TabScreen);
  }

   _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  

  goSignup(accountType){
   const SignUp = NavigationActions.navigate({
      routeName: "signup",
      params: { accountType: accountType }
    });
    this.props.navigation.dispatch(SignUp);
  }

  render() {
    return (
      <ImageBackground source = {Images.background} style = {styles.backgroundImage}>
        <View style={styles.headerView}>
          <View style={styles.flexView}>
            <TouchableOpacity onPress={this.goBackNavigation.bind(this)}>
              <Image source={Images.backArrow} style={styles.backArrow}/>
            </TouchableOpacity>
          </View>
          <View style={styles.flexView}>
            <Image source={Images.mark} style={styles.mark}/>
          </View>
          <View style={styles.flexView}>

          </View>
        </View>
        
        <Text style={styles.maxText}>Maximum Freedom</Text>
        <View style={styles.modalView}>
            <Text style={styles.bigModalText}>Maximum Freedom</Text>
            <Text style={styles.smallModalText}>Choose your account type</Text>
            <TouchableOpacity style={styles.modalButton} onPress={this.goSignup.bind(this,'client')}  >
              <Text style={styles.smallModalText}>I need help at home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={this.goSignup.bind(this,'coach')} >
              <Text style={styles.smallModalText}>I am a service provider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} >
              <Text style={styles.smallModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        
        <TouchableOpacity style={styles.rowButton} >
          <Text style={styles.commonText1}>Bringing freedom to you</Text>
        </TouchableOpacity>


        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalView}>
            <Text style={styles.bigModalText}>Maximum Freedom</Text>
            <Text style={styles.smallModalText}>Choose your account type</Text>
            <TouchableOpacity style={styles.modalButton} onPress={this.goSignup.bind(this,'client')} >
              <Text style={styles.smallModalText}>I need help at home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={this.goSignup.bind(this,'coash')} >
              <Text style={styles.smallModalText}>I am a service provider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={this._toggleModal}>
              <Text style={styles.smallModalText}>Cancel</Text>
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
  flexView:{
    flex: 1
  },
  modalButton:{
    borderWidth: 1,
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    height: Constants.MARGIN*8,
    marginTop: Constants.MARGIN*5,
    shadowColor: Colors.black,
    shadowRadius: 2,
    shadowOpacity: 0.6,
    shadowOffset: {width: 1, height: 1},
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
  modalView:{
    width: Constants.WIDTH- Constants.MARGIN*10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    alignSelf: 'center',
    padding: Constants.MARGIN*3,
    marginTop: Constants.MARGIN*3
  },
  bottomView:{
    flex:1, 
    justifyContent:'flex-end',
    paddingBottom: Constants.MARGIN*4
  },
  rowButton:{
    marginTop: Constants.MARGIN*10,
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
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal: Constants.MARGIN*2
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

