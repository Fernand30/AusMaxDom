import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,
  ImageBackground,Image, FlatList} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {Colors, Fonts, Images, Constants } from '../../Themes';
import {DetailBookingContent} from '../../Reducers/apiReducer'


const width = Constants.WIDTH- Constants.MARGIN*6
const height = width/3*2
const aboutText = 'Active families benefit from increased physical\nhealth and also sharing more \'playtime\'\n'
                         +'together, and that means more laughs and \n'
                         +'memories made. So how do you pry your loved\n'
class Booking2 extends Component {
//juanman234+carer222@gmail.com: client   juanman234+clientnew@gmail.com: search
// hash = '7c6a180b36896a0a8c02787eeafb0e4c'

  static navigationOptions = ({navigation}) => {
    id  = navigation.state.params.id
    userId  = navigation.state.params.userId,
    item  = navigation.state.params.item
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
    DetailBookingContent(userId,id).then((response)=>response.json()).then((data)=>{
      that.setState({data:data})
    }).catch(function(err){
      alert(err)
    }).done();
  }

  goback(){
    this.props.navigation.goBack()
  }
  
  render() {
     data = this.state.data
     // alert(Object.keys(data))
     // startdate = ''
     // enddate = ''
     imageUrl = 'http://members.maxfreedom.com.au/images/'+data.profileImageClient;
     startdate  = data.DateCreated
     enddate  = data.selectedDate
      res1 = String(startdate).split("T");
      res2 = String(enddate).split("T");
      return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerLeftView}>
            <TouchableOpacity onPress={this.goback.bind(this)} style={styles.backButton}>
              <Image source={Images.backArrow} style={styles.backButton}/>
            </TouchableOpacity>
          </View>
          <View style={styles.headerCenterView}>
            <Text style={styles.headerText}>{item.coachName}</Text>
          </View>
          <View style={styles.headerRightView}>
            
          </View>
        </View>
        <Text style={styles.waiting}>Waiting</Text>
        <Image source={{uri:imageUrl}} style={styles.provider}/>
        <Text style={styles.name}>{data.coachName}</Text>   
        <Text style={styles.infoText}>{data.comment}</Text>   
        <Image source={Images.stars} style={styles.star}/>  
        <View style={styles.rowView}>
          <View style={styles.greyView}>
            <Text style={styles.blackText}>Today 24 Jan 2018</Text>
            <Text style={styles.infoText}>Timing</Text>
            <Text style={styles.infoText}>{res2[0]} - {res1[0]}</Text>
          </View>
          <View style={styles.greyView}>
          <Text style={styles.blackText}></Text>
            <Text style={styles.infoText}>Fee</Text>
            <Text style={styles.infoText}>{data.price} / Session</Text>
          </View>
        </View>
        <Text style={styles.about}>About Doctor</Text>    
        <Text style={styles.infoText}>{aboutText}</Text>     
        <View style={styles.arrowView}> 
            <Text style={styles.arrowText}>2Nd Floor, Appok: Building, Mumbai</Text>
            <View style={styles.arrowImaageView}>
              <TouchableOpacity>
                <Image source={Images.arrow} style={styles.arrowImage}/>
              </TouchableOpacity>
            </View>   
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
  infoText:{
    color: Colors.blue,
    fontSize: Constants.FONT*18,
    textAlign: 'center'
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
    height: Constants.WIDTH/3.5,
    borderRadius: Constants.WIDTH/7,
    alignSelf:'center',
    marginTop: Constants.MARGIN*8
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
    height: Constants.WIDTH/5/427*73,
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

export default Booking2;
