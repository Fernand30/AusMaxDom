import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image, FlatList} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {Colors, Fonts, Images, Constants } from '../../Themes';
import {DetailContent} from '../../Reducers/apiReducer'

const width = Constants.WIDTH- Constants.MARGIN*6
const height = width/3*2
class Board2 extends Component {
  
  static navigationOptions = ({navigation}) => {
    item  = navigation.state.params.item
    userId  = navigation.state.params.userId
    return{
      header: false,
    }
  };

  constructor(props){
    super(props);
    this.state=({
      data:[]
    })
  }

  componentDidMount(){
    that = this
    DetailContent(userId,item._id).then((response)=>response.json()).then((data)=>{
      that.setState({data:data})
    }).catch(function(err){
      alert(err)
    }).done();
  }

  goback(){
    this.props.navigation.goBack()
  }
  
  render() {
    //alert(JSON.stringify(this.state.data))
      return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerLeftView}>
            <TouchableOpacity onPress={this.goback.bind(this)} style={styles.backButton}>
              <Image source={Images.backArrow} style={styles.backButton}/>
            </TouchableOpacity>
          </View>
          <View style={styles.headerCenterView}>
            <Text style={styles.headerText}>{item.title}</Text>
          </View>
          <View style={styles.headerRightView}>
            
          </View>
        </View>
        <Image source={Images.people} style={styles.provider}/>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.descriptionView}>
            <Text style={styles.descriptionText}>{item.shortdesc}</Text>
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
  provider:{
    width: width,
    height: height,
    alignSelf: 'center',
    marginTop: Constants.MARGIN*2,
    marginBottom: Constants.MARGIN*4,
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
    width:Constants.MARGIN*10,
    justifyContent: 'center'
  },
  headerCenterView:{
    flex: 1,
    justifyContent: 'center'
  },
  headerRightView:{
    width:Constants.MARGIN*10,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  headerText:{  
    fontSize: Constants.FONT*25,
    textAlign: 'center',
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

export default Board2;
