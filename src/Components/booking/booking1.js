import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image, FlatList} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import {BookingList} from '../../Reducers/apiReducer'
import {Colors, Fonts, Images, Constants } from '../../Themes';


//juanman234+carer222@gmail.com: client   juanman234+clientnew@gmail.com: search
// hash = '7c6a180b36896a0a8c02787eeafb0e4c'
const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug', 'Sep', 'Oct', 'Nob', 'Dec']
class Profile extends Component {
  static navigationOptions = {
    header: false
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
    if(global.type=='client') flag = true
    else flag = false
    userId = global.userData.id
    that = this

    BookingList(flag,1,userId,userId).then((response)=>response.json()).then((data)=>{
      that.setState({data:data,visible: false})
    }).catch(function(err){
      that.setState({visible: false})
      alert('err')
    }).done();
  }

  navigate = (item) => {
    
   const BookingDetailScreen = NavigationActions.navigate({
      routeName: "booking2",
      params: { item: item,id: item._id, userId: item.user.id }
    });
    this.props.navigation.dispatch(BookingDetailScreen);
  };

  renderItems = ({item}) => {
    imageUrl = 'http://members.maxfreedom.com.au/images/'+item.profileImageCoach;
    date  = item.selectedDate
    res = date.split("T");
    resM = res[0].split("-")
    realDate = resM[2]+' '+mon[Number(resM[1])]+' '+ resM[0]
    startArray =[]
    if(item.ratingbyclient){
      rate= item.ratingbyclient.rating
      if(rate==1) startArray = [1]
      else if(rate==2) startArray = [1,2]
      else if(rate==3) startArray = [1,2,3]
      else if(rate==4) startArray = [1,2,3,4]
      else if(rate==5) startArray = [1,2,3,4,5]
      else startArray = []
    } 
    
    rates = startArray.map(function(item) {
      return (
              <Image key={item} source={Images.star} style={styles.star}/>
            );
    })
    if(item.Status=='Pending'){
      status = 'Pending'
      sty = styles.orangeText
    }else if(item.Status == 'Rated'){
      status = 'Rated'
      sty = styles.greenText
    }else if(item.Status == 'Canceled'){
      status = 'Canceled'
      sty = styles.redText
    } 
    return(
      <TouchableOpacity onPress={this.navigate.bind(this,item)} style={styles.renderView}>
        <Image source={{uri:imageUrl}} style={styles.account}/>
        <View style={styles.description}>
          <Text style={styles.title}>{item.coachName}</Text>
          <View style={styles.rowView}>
            <View style={{flexDirection:'row'}}>
              {rates}
            </View>
            <Text style={sty}>{status}</Text>
          </View>
          <Text style={styles.dateText}>{realDate}</Text>
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
            <Text style={styles.headerText}>My Bookings</Text>
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
    height: Constants.WIDTH/4,
    borderRadius: Constants.WIDTH/8
  },
  rowView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  star:{
    width: Constants.WIDTH/25,
    height: Constants.WIDTH/25,
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
  redText:{
    fontSize: Constants.FONT*25,
    color: Colors.red
  },
  orangeText:{
    fontSize: Constants.FONT*25,
    color: Colors.orange
  },
  greenText:{
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
