import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image, FlatList} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import {ContentFind} from '../../Reducers/apiReducer'

import {Colors, Fonts, Images, Constants } from '../../Themes';

class Profile extends Component {

  constructor(props){
    super(props);
    this.state=({
      data:[],
      visible: false
    })
  }

  componentDidMount(){
    this.setState({visible: true})
    userId = global.userData.id
    that = this
    ContentFind(1,userId).then((response)=>response.json()).then((data)=>{
      that.setState({data:data,visible: false})
    }).catch(function(err){
      that.setState({visible:false})
      alert('err')
    }).done();
  }
  
  static navigationOptions = ({navigation}) => {
    return{
      header: false
    }
  };

  navigate = (item) => {
    // this.props.navigation.navigate('board2',{data:item})
    // accountType= data.user.accountType;
   const BoardDetailScreen = NavigationActions.navigate({
      routeName: "board2",
      params: { item: item, userId: userId }
    });
    this.props.navigation.dispatch(BoardDetailScreen);
  };

  renderItems = ({item}) => {
    return(
      <TouchableOpacity onPress={this.navigate.bind(this,item)} style={styles.renderView}>
        <View style={styles.description}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.descriptionText}>{item.shortdesc}</Text>
        </View>
      </TouchableOpacity>
      )
  }

  render() {

    data = this.state.data
      
    return (
      <View style={styles.container}>
      <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <View style={styles.headerView}>
          <View style={styles.headerLeftView}>

          </View>
          <View style={styles.headerCenterView}>
            <Text style={styles.headerText}>Board news</Text>
          </View>
          <View style={styles.headerRightView}>
            
          </View>
        </View>

        <View style={styles.flatView}>
            <FlatList
              data={data.data}
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
    fontSize: Constants.FONT*15,
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
