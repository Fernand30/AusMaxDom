import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image, FlatList} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import {BookingList} from '../../Reducers/apiReducer'
import {Colors, Fonts, Images, Constants } from '../../Themes';

const data = [
{id:1,title: 'John Coppola\, MD',imageUrl:Images.account,star:Images.stars,complete:false,date:'Today 11:00 AM\nOct 3, 6:00 PM'},
{id:2,title: 'Michael Infantino, MD',imageUrl:Images.account1,star:Images.stars,complete:true,date:'23 Jan 2018'},
{id:3,title: 'Damian Kurian\, MD',imageUrl:Images.account2,star:Images.stars,complete:true,date:'23 Jan 2018'},
{id:4,title: 'Johnny Arnouk\, MD',imageUrl:Images.account,star:Images.stars,complete:true,date:'23 Jan 2018'},
{id:5,title: 'Johnny Arnouk\, MD',imageUrl:Images.account1,star:Images.stars,complete:true,date:'23 Jan 2018'},
{id:6,title: 'Johnny Arnouk\, MD',imageUrl:Images.account2,star:Images.stars,complete:true,date:'23 Jan 2018'}
]
class Profile extends Component {
  static navigationOptions = {
    header: false
  };

  navigate = (item) => {
   
  };

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
    BookingList(true,1,userId,userId).then((response)=>response.json()).then((data)=>{
      that.setState({data:data,visible:false})
    }).catch(function(err){
      that.setState({visible:false})
      alert('err')
    }).done();
  }

  renderItems = ({item}) => {
    imageUrl = 'http://members.maxfreedom.com.au/images/'+item.profileImageClient;
    date  = item.DateCreated
    res = date.split("T");
    return(
      <TouchableOpacity onPress={this.navigate.bind(this,item)} style={styles.renderView}>
        <Image source={{uri: imageUrl}} style={styles.account}/>
        <View style={styles.description}>
          <Text style={styles.title}>{item.coachName}</Text>
          <View style={styles.rowView}>
            <Image source={item.star} style={styles.star}/>
            {(item.Status=='completed')?<Text style={styles.completeText}>Completed</Text>:null}
          </View>
          <Text style={styles.dateText}>{res[0]}</Text>
          <Text style={styles.dateText}>{res[1]}</Text>
        </View>
      </TouchableOpacity>
      )
  }

  render() {
    data = this.state.data
    //alert(JSON.stringify(data))
    return (
      <View style={styles.container}>
      <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <View style={styles.headerView}>
          <View style={styles.headerLeftView}>

          </View>
          <View style={styles.headerCenterView}>
            <Text style={styles.headerText}>My Clients</Text>
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
