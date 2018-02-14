import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import Modal from "react-native-modal"; 
import ImagePicker from 'react-native-image-crop-picker'
import {uploadProImage} from '../../Reducers/apiReducer'
import {Colors, Fonts, Images, Constants } from '../../Themes';
import RNFetchBlob from 'react-native-fetch-blob'


const fs = RNFetchBlob.fs


class Profile extends Component {
  static navigationOptions = {
    title: 'Profile1',
    header: false
  };

  navigate = () => {
    this.props.navigation.navigate('profile2')
  };

  constructor(props){
    super(props);
      this.state=({
        cameraModal: false,
        coverImageSource:{},
        profileImage: '',
      })

  }

  cameraOPtionModal(){
    this.setState({
      cameraModal: true
    })
  }

  onCamera(){
    this.setState({cameraModal: false,})
    setTimeout(() => ImagePicker.openCamera({
      width: Constants.WIDTH/2,
      height: Constants.HEIGHT/2,
      cropping: true
    }).then(image => {
      this.onImageSelected(image);
    }).catch(this.onImageCancelled), 1000)
  }

  onGallery(){
    this.setState({cameraModal: false,})
    setTimeout(() => ImagePicker.openPicker({
      width: Constants.WIDTH/2,
      height: Constants.HEIGHT/2,
      cropping: true
    }).then(image => {
      this.onImageSelected(image);
    }).catch(this.onImageCancelled), 1000)
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
  }

  storePicture(){
      
      if (this.state.profileImage!='') {
        // Create the form data object
        var data = new FormData();
        data.append('picture', {file: this.state.profileImage, name: 'profile.jpg', type: 'image/jpg'});

        // Create the config object for the POST
        // You typically have an OAuth2 token that you use for authentication
        const config = {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data'
         },
         body: data,
        }

        fetch("http://members.maxfreedom.com.au/api/coach/profile/upload", config)
         .then((responseData) =>responseData.json()).then((data)=>{
             if(data.success){
               this.setState({
                profileImage: 'http://members.maxfreedom.com.au/images/'+data.record
               })
             }else{
              alert(data.errors)
             }
         })
         .catch(err => {
           alert("network error. try again.");
       })
    }
  }

  onCancel(){
    this.setState({cameraModal: false,})
  }

  goArrow(){
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerLeftView}>

          </View>
          <View style={styles.headerCenterView}>
            <Text style={styles.headerText}>Fill your info</Text>
          </View>
          <View style={styles.headerRightView}>
            <TouchableOpacity onPress={this.storePicture.bind(this)} style={styles.editImage}>
              <Image source={Images.edit} style={styles.editImage}/>
            </TouchableOpacity>  
          </View>
        </View>
        <View style={styles.accountView}>
          <Image source={(this.state.profileImage=='')?Images.emptyAccount:{uri:this.state.profileImage}} style={styles.profile}/>
          <TouchableOpacity style={styles.cameraButton} onPress={this.cameraOPtionModal.bind(this)} >
            <Image source={Images.camera} style={styles.camera}/>
          </TouchableOpacity>
        </View>
        <Text style={styles.bigText}>User name</Text>
        <Text style={styles.bigText}>{global.userData.username}</Text>
        <View style={styles.rowView}>
          <View style={styles.greyView}>
            <Text style={styles.infoText}>Timing</Text>
          </View>
          <View style={styles.greyView}>
            <Text style={styles.infoText}>Fee</Text>
          </View>
        </View>
        <Text style={styles.about}>About</Text>
          <Text style={styles.infoText}>Lorom ipsum dolor sit a mot. consectetur adipis.{'\n'}
                                        cing slit, sed do eiusmod tempor incididunt ut{'\n'}
                                       labore et dolore magna aliqua</Text>
          <View style={styles.arrowView}> 
            <Text style={styles.arrowText}></Text>
            <View style={styles.arrowImaageView}>
              <TouchableOpacity onPress={this.goArrow.bind(this)}>
                <Image source={Images.arrow} style={styles.arrowImage}/>
              </TouchableOpacity>
            </View>   
          </View> 
          <Modal isVisible={this.state.cameraModal}>
              <View style={styles.modalView}>
                <TouchableOpacity style={styles.modalButton} onPress={this.onCamera.bind(this)} >
                  <Text style={styles.smallModalText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={this.onGallery.bind(this)}>
                  <Text style={styles.smallModalText}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={this.onCancel.bind(this)} >
                  <Text style={styles.smallModalText}>Cancel</Text>
                </TouchableOpacity>
              </View>
        </Modal>                              
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  }, 
  smallModalText:{
    fontSize: Constants.FONT*15,
  },
  modalButton:{
    borderWidth: 1,
    borderColor: Colors.blackText,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent: 'center',
    width: Constants.WIDTH/4,
    marginTop: Constants.MARGIN,
    padding: Constants.MARGIN,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
  },
  modalView:{
    backgroundColor: Colors.white,
    padding: Constants.MARGIN*2,
    width: Constants.WIDTH/2,
    alignSelf:'center',
    borderRadius:Constants.MARGIN
  },
  modalButton:{
    borderWidth: 1,
    borderColor: Colors.blackText,
    alignSelf: 'center',
    alignItems:'center',
    justifyContent: 'center'
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
  about:{
    color: Colors.blueText,
    fontSize: Constants.FONT*20,
    textAlign: 'center',
    marginVertical: Constants.MARGIN*5
  },
  infoText:{
    color: Colors.blueText,
    fontSize: Constants.FONT*18,
    textAlign: 'center'
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
    height: Constants.MARGIN*15,
  },
  arrowView:{
    flexDirection: 'row',
    paddingHorizontal: Constants.MARGIN*6,
    marginTop: Constants.MARGIN*6,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowView:{
    flexDirection: 'row',
    paddingHorizontal: Constants.MARGIN*4,
    marginTop: Constants.MARGIN*5
  },
  bigText:{
    fontSize: Constants.FONT*40,
    textAlign:'center'
  },
  camera:{
    width: Constants.WIDTH/10,
    height: Constants.WIDTH/10
  },
  cameraButton:{
    position: 'absolute',
    top: -Constants.MARGIN*3,
    right: -Constants.MARGIN*3,
    width: Constants.WIDTH/10,
    height: Constants.WIDTH/10
  },
  profile:{
    width: Constants.WIDTH/4,
    height: Constants.WIDTH/4,
    borderRadius : Constants.WIDTH/8
  },
  accountView:{
    marginTop: Constants.MARGIN*20,
    alignSelf:'center',
    marginBottom: Constants.MARGIN*5
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
    flex: 1,
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
  editImage:{
    width: Constants.MARGIN*6,
    height: Constants.MARGIN*6
  },
  
})
export default Profile;
