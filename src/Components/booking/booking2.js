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
const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug', 'Sep', 'Oct', 'Nob', 'Dec']
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
  
  goSendMessage(){
    alert('Functionality coming soon')
  }

  render() {
     data = this.state.data
     //alert(JSON.stringify(item))
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
     imageUrl = 'http://members.maxfreedom.com.au/images/'+data.profileImageCoach;
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
    date  = item.selectedDate
    res = date.split("T");
    resM = res[0].split("-")
    realDate = resM[2]+' '+mon[Number(resM[1])]+' '+ resM[0]
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
        {(global.userData.accountType=='client'&&(item.Status=='Pending'))?
           <View style={styles.typeView}>
                          <View style={styles.commonRowView}>
                            <Text style={styles.statusText}>Status: </Text>
                            <Text style={sty}>{status}</Text>
                          </View>
                          <TouchableOpacity style={styles.cancelSeesion}>
                            <Text style={styles.cancelText}>Cancel session</Text>
                          </TouchableOpacity>
                        </View>:<Text style={styles.waiting}>Waiting</Text>}
        <Image source={{uri:imageUrl}} style={styles.provider}/>
        <Text style={styles.name}>{data.coachName}</Text>   
        <View style={{flexDirection:'row',alignSelf:'center',marginTop: Constants.MARGIN*2}}>
          {rates}
        </View>  
        {(global.userData.accountType=='client')?<View style={styles.rowView}>
                  <View style={styles.greyView}>
                    <Text style={styles.blackText}>{realDate}</Text>
                    <Text style={styles.infoText}>8.00 - 9.00 am</Text>
                  </View>
                  <View style={styles.greyView}>
                    <Text style={styles.infoText}>Average fee</Text>
                    <Text style={styles.infoText}>$20</Text>
                  </View>
                </View>:
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
                </View>}
        {(global.userData.accountType=='client')?<View style={{flexDirection:'row',marginHorizontal:Constants.MARGIN*4,marginTop:Constants.MARGIN*2}}>
                  <View style={{flexDirection:'row',flex:1}}>
                    <Text>&#128222;</Text>
                    <Text style={{marginLeft:Constants.MARGIN}} >0452552</Text>
                  </View>
                  <TouchableOpacity onPress={this.goSendMessage.bind(this)} style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                    <Image source={Images.messagebox} style={styles.messagebox}/>
                    <Text style={{marginLeft:Constants.MARGIN}} >Send Message </Text>
                  </TouchableOpacity>
                </View>:null}
        {(global.userData.accountType=='client')?<View><Text style={styles.about}>Comment</Text>    
            <Text style={styles.infoText}>{aboutText}</Text></View>:
             <View><Text style={styles.about}>About Doctor</Text>    
            <Text style={styles.infoText}>{aboutText}</Text></View> } 
        {(global.userData.accountType=='client')?null:<View style={styles.arrowView}> 
                  <Text style={styles.arrowText}>2Nd Floor, Appok: Building, Mumbai</Text>
                  <View style={styles.arrowImaageView}>
                    <TouchableOpacity>
                      <Image source={Images.arrow} style={styles.arrowImage}/>
                    </TouchableOpacity>
                  </View>   
                </View> }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  statusText:{
    fontSize: Constants.FONT*20,
  },
  messagebox:{
    width:Constants.MARGIN*4,
    height:Constants.MARGIN*4/123*85
  },
  cancelSeesion:{
    paddingHorizontal: Constants.MARGIN*2,
    paddingVertical: Constants.MARGIN,
    backgroundColor:'red',
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    alignItems:'center',
    justifyContent:'center'
  },
  waitingText:{
    fontSize: Constants.FONT*20,
    color:'#f9ba34'
  },
  redText:{
    fontSize: Constants.FONT*20,
    color: Colors.red
  },
  greenText:{
    fontSize: Constants.FONT*20,
    color:Colors.green
  },
  orangeText:{
    fontSize: Constants.FONT*20,
    color:Colors.orange
  },
  cancelText:{
    fontSize: Constants.FONT*20,
    color: 'white'
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
  typeView:{
    flexDirection:'row',
    marginHorizontal:Constants.MARGIN*3,
    alignItems:'center',
    justifyContent:'space-between',
    marginTop: Constants.MARGIN*2
  },
  commonRowView:{
    flexDirection:'row',
    alignItems:'center'
  },
  provider:{
    width: Constants.WIDTH/4,
    height: Constants.WIDTH/4,
    borderRadius: Constants.WIDTH/8,
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
    width: Constants.WIDTH/25,
    height: Constants.WIDTH/25
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
