import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput ,StyleSheet,StatusBar,Platform,ScrollView,
  ImageBackground,Image, FlatList} from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import {BookingList} from '../../Reducers/apiReducer'
import {SearchByService,Skills} from '../../Reducers/apiReducer'
import {Colors, Fonts, Images, Constants } from '../../Themes';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from "react-native-modal"; 

class Profile extends Component {
  static navigationOptions = {
    header: false
  };

  constructor(props){
    super(props);
    this.state=({
      datadata:[],
      visible: true,
      skills:[],
      selectSkills:[],
      isModalVisible: false,
      renderSkills:'',
      selectdatadata:[],
      ttt: 0,
    })
  }

  componentDidMount(){
    that = this
    //that.setState({visible: true})
    userId = global.userData.id
    SearchByService(userId).then((response)=>response.json()).then((data)=>{
      //alert(data.data.length)
      that.setState({datadata: data.data ,selectdatadata: data.data, visible: false})

    }).catch(function(err){
      //that.setState({visible:false})
      alert(err)
    }).done();

    Skills(userId).then((response)=>response.json()).then((data)=>{
      //alert(data.data.length)
      that.setState({skills: data.skillArrayList})

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

    return(
      <TouchableOpacity onPress={this.navigate.bind(this,item)} style={styles.renderView}>
        {(item.profileImage)?<Image source={{uri: imageUrl}} style={styles.account}/>:
                             <Image source={Images.emptyAccount} style={styles.account}/> }
        <View style={styles.description}>
          <Text style={styles.title}>{item.profilename}</Text>
          <View style={styles.rowView}>
            {rates}
          </View>
          <Text numberOfLines={1} style={styles.dateText}>{item.skills}</Text>
        </View>
      </TouchableOpacity>
      )
  }

  goLocation(text){

  }

  insertSkill(item){
    skillArray = this.state.selectSkills
    if(skillArray.indexOf(item)==-1){
      skillArray.push(item)
    }else{
      skillArray.splice(skillArray.indexOf(item),1)
    }
    this.setState({
      selectSkills:skillArray
    })
  }

  search(){
    searchedArray=[]
    renderSkills = this.state.selectSkills
    dataArray = this.state.datadata
    
    
    for(i = 0; i< dataArray.length;i++){
      flag = true
      currentSkills = dataArray[i].skills
      for(j= 0; j< renderSkills.length;j++){
        if(currentSkills.indexOf(renderSkills[j])==-1){
          flag = false; break;
        }
      }
      if(flag){
        searchedArray.push(dataArray[i])
      }
    }
    serviceType = ''
    for(i = 0;i<renderSkills.length;i++){
      serviceType+=renderSkills[i]+','
    }
    this.setState({
      isModalVisible:false, 
      selectdatadata: searchedArray,
      renderSkills: serviceType
    })
  }

  clearSkill(){
    this.setState({
      selectSkills: []
    })
  }

  render() {
    that = this
    dataArray = this.state.selectdatadata
    //alert(dataArray)
    skillArray = this.state.skills
    selectSkills = this.state.selectSkills
    skilldata=skillArray.map(function(item) {
      return (
              <View key={item}>
                  <TouchableOpacity onPress={()=>that.insertSkill(item)} style={styles.renderSkill}>
                    <View style={styles.circleView}>
                      {(selectSkills.indexOf(item)!=-1)?<View style={styles.commaView}/>:null}
                    </View>
                    <Text style={styles.unselectitem}>{item}</Text>
                  </TouchableOpacity>
              </View>
          );
    })

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
          <TextInput style={styles.textinput} underlineColorAndroid='transparent' placeholder='Service Type' value={this.state.renderSkills}/>
          <TouchableOpacity onPress={()=>this.setState({isModalVisible:true})} style={styles.dropImageView}>
            <Image source={Images.drop} style={styles.dropImage}/>
          </TouchableOpacity>
        </View>
        
        <View style={styles.flatView}>
            <FlatList
              data={dataArray}
              keyExtractor={(item) => item._id}
              renderItem={this.renderItems}
            />
        </View> 

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalView}>
            <ScrollView>
              {skilldata}
            </ScrollView>
            <View style={{flexDirection:'row', width: Constants.MARGIN*50,justifyContent:'space-between'}}>
              <TouchableOpacity onPress={this.search.bind(this)}>
                <Text style={{fontSize:Constants.FONT*25}}>Done</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.clearSkill.bind(this)}>
                <Text style={{fontSize:Constants.FONT*25}}>Clear filter</Text>
              </TouchableOpacity>
            </View>
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
  unselectitem:{
    fontSize:Constants.FONT*22,
    fontWeight:'300',
    marginLeft: Constants.MARGIN
  },
  circleView:{
    width: Constants.MARGIN*4,
    height: Constants.MARGIN*4,
    borderRadius: Constants.MARGIN*2,
    borderWidth: 1,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center'
  },
  renderSkill:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom: Constants.MARGIN*1,
  },
  commaView:{
    width: Constants.MARGIN*2,
    height: Constants.MARGIN*2,
    borderRadius: Constants.MARGIN,
    backgroundColor:'black'
  },
  selectitem:{
    fontSize:Constants.FONT*22,
    fontWeight:'800',
    marginBottom: Constants.MARGIN*1
  },
  modalView:{
    width: Constants.WIDTH- Constants.MARGIN*10,
    height: Constants.HEIGHT/2,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    alignSelf: 'center',
    paddingVertical: Constants.MARGIN*2,
    alignItems:'center'
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
    height: Constants.WIDTH/4,
    borderRadius: Constants.WIDTH/8
  },
  rowView:{
    flexDirection:'row',
    alignItems:'center',
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
  dateText:{
    fontSize: Constants.FONT*30,
    marginTop: Constants.MARGIN*2,
    color: Colors.dateColor,
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
