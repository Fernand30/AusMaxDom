import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image, FlatList} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {BookingList} from '../../Reducers/apiReducer'
import {SearchByService,SearchByLocation} from '../../Reducers/apiReducer'
import {Colors, Fonts, Images, Constants } from '../../Themes';
import Spinner from 'react-native-loading-spinner-overlay';

class Profile extends Component {
  static navigationOptions = {
    header: false
  };

  constructor(props){
    super(props);
    this.state=({
      datadata:[],
      visible: true
    })
  }

  componentDidMount(){
    that = this
    //that.setState({visible: true})
    userId = global.userData.id
    SearchByService(userId).then((response)=>response.json()).then((data)=>{
      //alert(data.data.length)
      that.setState({datadata: data.data ,visible: false})

    }).catch(function(err){
      //that.setState({visible:false})
      alert(err)
    }).done();
  }

  navigate = (item) => {
   const BookingDetailScreen = NavigationActions.navigate({
      routeName: "search2",
      params: { item: item }
    });
    this.props.navigation.dispatch(BookingDetailScreen);
  };

  renderItems = ({item}) => {

    imageUrl = 'http://members.maxfreedom.com.au/images/'+item.profileImage;
    //date  = item.DateCreated
    //res = date.split("T");
    return(
      <TouchableOpacity onPress={this.navigate.bind(this,item)} style={styles.renderView}>
        <Image source={{uri: imageUrl}} style={styles.account}/>
        <View style={styles.description}>
          <Text style={styles.title}>{item.profilename}</Text>
          <View style={styles.rowView}>
            <Image source={Images.stars} style={styles.star}/>
            {(item.accountValidate)?<Text style={styles.completeText}>Completed</Text>:null}
          </View>
          <Text style={styles.dateText}>{item.postcode}</Text>
        </View>
      </TouchableOpacity>
      )
  }

  goLocation(text){

  }

  render() {
    dataArray = this.state.datadata
    return (
      <View style={styles.container}>
      <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <View style={styles.headerView}>
          <View style={styles.headerLeftView}>

          </View>
          <View style={styles.headerCenterView}>
            <Text style={styles.headerText}>Search service provider</Text>
          </View>
          <View style={styles.headerRightView}>
            
          </View>
        </View>
        <View style={styles.typeView}>
          <TextInput style={styles.textinput} placeholder='Service Type'/>
          <TouchableOpacity style={styles.dropImageView}>
            <Image source={Images.drop} style={styles.dropImage}/>
          </TouchableOpacity>
        </View>
        <View style={styles.typeView}>
          <TextInput onChangeText={(text) => this.goLocation.bind(this,text)} style={styles.textinput} placeholder='Location'/>
        </View>
        <View style={styles.flatView}>
            <FlatList
              data={dataArray}
              keyExtractor={(item) => item._id}
              renderItem={this.renderItems}
            />
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
  location:{
    marginHorizontal: Constants.MARGIN*6,
    height:Constants.MARGIN*10,
    borderColor: Colors.black,
    borderWidth: 1,
    marginTop: Constants.MARGIN*3,
  },
  typeView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderColor: Colors.black,
    borderWidth: 1,
    marginHorizontal: Constants.MARGIN*6,
    marginTop: Constants.MARGIN*3
  }, 
  textinput:{
    flex:1,
    height:Constants.MARGIN*10,
    borderColor:Colors.black,
    borderRightWidth: 1,
    marginLeft: 10
  },
  dropImage:{
    width:Constants.MARGIN*5,
    height: Constants.MARGIN*5/980*558
  },
  dropImageView:{
    width:Constants.MARGIN*10,
    height: Constants.MARGIN*10/980*558,
    alignItems:'center',
    justifyContent:'center'
  },
  account:{
    width: Constants.WIDTH/4,
    height: Constants.WIDTH/3.5,
    borderRadius: Constants.WIDTH/7
  },
  rowView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  star:{
    width: Constants.WIDTH/5,
    height: Constants.WIDTH/5/427*73,
  },
  description:{
    marginLeft: Constants.MARGIN*3,
    flex:1,
    justifyContent:'center'
  },
  title:{
    fontSize: Constants.FONT*25,
  },
  completeText:{
    fontSize: Constants.FONT*25,
    color: Colors.green
  },
  dateText:{
    fontSize: Constants.FONT*30,
    marginTop: Constants.MARGIN*2,
    color: Colors.dateColor
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
    justifyContent: 'center'
  },
  headerCenterView:{
    flex: 1,
    justifyContent: 'center'
  },
  headerRightView:{
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  
  headerText:{  
    fontSize: Constants.FONT*25,
    textAlign: 'center'
  },
  renderView:{
    marginTop: Constants.MARGIN*2,
    marginHorizontal: Constants.MARGIN*4,
    padding: Constants.MARGIN*2,
    flexDirection: 'row',
    borderRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#d6d6d6',
    shadowOpacity: 1,
  },
})
export default Profile;
