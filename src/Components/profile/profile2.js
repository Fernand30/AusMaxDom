import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image} from "react-native";
import { NavigationActions } from "react-navigation";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker'
import {Colors, Fonts, Images, Constants } from '../../Themes';
import {CurrentProfile} from '../../Reducers/apiReducer'
import RNFetchBlob from 'react-native-fetch-blob'
const width = Constants.WIDTH- Constants.MARGIN*6
const height = width/3*2
const aboutText = 'Active families benefit from increased physical\nhealth and also sharing more \'playtime\'\n'
                         +'together, and that means more laughs and \n'
                         +'memories made. So how do you pry your loved\n'
class Profile extends Component {

   constructor(props){
      super(props);
      this.state=({
        cameraModal: false,
        data:[],
        visible: false,
        profile: '',
      })
    }

  componentDidMount(){
    this.setState({visible: true})
    userId = global.userData.id
    that = this
    CurrentProfile(userId).then((response)=>response.json()).then((data)=>{
      that.setState({data:data,visible:false})
    }).catch(function(err){
      that.setState({visible:false})
      alert(err)
    }).done();
  }

    cameraOPtionModal(){
      this.setState({
        cameraModal: true
      })
    }

    onCancel(){
    this.setState({cameraModal: false,})
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
                profile:data.record
               })
               alert(data.record)
             }else{
              alert(data.errors)
             }
         })
         .catch(err => {
           alert("network error. try again.");
       })
    }
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
  
  render() {
    profileData  = this.state.data
    //alert(JSON.stringify(profileData))
    name = profileData.lastname+" "+profileData.firstname
    between = profileData.startWeekCron+" "+profileData.endWeekCron
    address = profileData.Address
    imageUrl = 'http://members.maxfreedom.com.au/images/'+profileData.profileImage
    return (
      <View style={styles.container}>
      <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <View style={styles.headerView}>
          <View style={styles.headerLeftView}>

          </View>
          <View style={styles.headerCenterView}>
            <Text style={styles.headerText}>{profileData.username}</Text>
          </View>
          <View style={styles.headerRightView}>
            <TouchableOpacity onPress={this.storePicture.bind(this)} style={styles.editImage}>
              <Image source={Images.edit} style={styles.editImage}/>
            </TouchableOpacity>  
          </View>
        </View>
        
      <View style={styles.accountView}>
        <Image source={{uri: imageUrl}} style={styles.provider}/>
        <TouchableOpacity style={styles.cameraButton} onPress={this.cameraOPtionModal.bind(this)}>
          <Image source={Images.camera} style={styles.camera}/>
        </TouchableOpacity>
      </View>  
        <Text style={styles.name}>{name}</Text>   
        <Text style={styles.infoText}>{profileData.experience}</Text>   
        <Image source={Images.stars} style={styles.star}/>  
        {(profileData.accountType=='client')?<View style={styles.rowView}>
                  <View style={styles.clientView}>
                    <Text style={styles.infoText}>Mobile number</Text>
                    <Text style={styles.clientText}>{profileData.contactno}</Text>
                  </View>
                  <View style={styles.clientView}>
                  
                    <Text style={styles.infoText}>Email</Text>
                    <Text style={styles.clientText}>{profileData.email}</Text>
                  </View>
                </View>:
              <View style={styles.rowView}>
                  <View style={styles.greyView}>
                    <Text style={styles.blackText}>{between}</Text>
                    <Text style={styles.infoText}>Timing</Text>
                    <Text style={styles.infoText}>4:30 PM - 8: 30 PM</Text>
                  </View>
                  <View style={styles.greyView}>
                  <Text style={styles.blackText}></Text>
                    <Text style={styles.infoText}>Fee</Text>
                    <Text style={styles.infoText}>{profileData.price&&profileData.price.individualPerHour} / Session</Text>
                  </View>
                </View>}
        <Text style={styles.about}>About Doctor</Text>    
        <Text style={styles.infoText}>{aboutText}</Text>     
        {/*<View style={styles.arrowView}> 
                    <Text style={styles.arrowText}>{address}</Text>
                    <View style={styles.arrowImaageView}>
                      <TouchableOpacity>
                        <Image source={Images.arrow} style={styles.arrowImage}/>
                      </TouchableOpacity>
                    </View>   
                  </View> */}
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
  camera:{
    width: Constants.WIDTH/10,
    height: Constants.WIDTH/10
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
  cameraButton:{
    position: 'absolute',
    top: -Constants.MARGIN*3,
    right: -Constants.MARGIN*3,
    width: Constants.WIDTH/10,
    height: Constants.WIDTH/10
  },
  accountView:{
    marginTop: Constants.MARGIN*15,
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
    width: Constants.WIDTH*2/3,
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
    paddingBottom: Constants.MARGIN*3
  }, 
  clientView:{
    flex : 1,
    backgroundColor: Colors.backgrey,
    borderColor: Colors.grey,
    borderWidth: 1,
    paddingVertical: Constants.MARGIN*2
  }, 
  infoText:{
    color: Colors.blue,
    fontSize: Constants.FONT*18,
    textAlign: 'center'
  },
  clientText:{
    color: 'black',
    fontSize: Constants.FONT*18,
    textAlign: 'center',
    marginTop:Constants.MARGIN
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
  provider:{
    width: Constants.WIDTH/4,
    height: Constants.WIDTH/4,
    borderRadius: Constants.WIDTH/8,
    alignSelf:'center',
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
    height: Constants.WIDTH/5/427*70,
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
export default Profile;
