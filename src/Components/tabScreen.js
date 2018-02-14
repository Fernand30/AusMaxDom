import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import TabNavigator from 'react-native-tab-navigator';
import Board from "./board";
import Booking from "./booking";
import Search from "./search";
import Clients from "./clients";
import Profile from "./profile";
import ProfileCom from "./profile/profile2";
import {Colors, Fonts, Images, Constants } from '../Themes';

export default class Screen2 extends Component {
  static navigationOptions = {
    
  };
  static navigationOptions = ({navigation}) => {
    accountType = navigation.state.params.accountType
    login = navigation.state.params.login
    data = navigation.state.params.data
    return{
      header: false
    }
  }

  constructor() {
      super();
      tab = ' '
      selectedTab = ''
      if(accountType=='client'){
        tab = 'Search' 
        Tabx = <Search/>
        global.type =  'search'
      }else{
         tab = 'Clients'
        Tabx = <Clients/>
        global.type =  'client'
      }
      if(login==0){
        selectedTab = 'profile'
        profile=<Profile/>
      }else{
        selectedTab = 'board'
        profile=<ProfileCom/>
      } 
        
      this.state={
        selectedTab: selectedTab
      };
   }   
    
  render() {
    
    return (
      <View style={{ flex: 1, backgroundColor: "powderblue" }}>
        <TabNavigator
            tabBarStyle={{backgroundColor:Colors.white,height:50}}
          >
            <TabNavigator.Item
                selectedTitleStyle={{color:Colors.black}}
                selected={this.state.selectedTab === 'board'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'board',
                  });

                }}
                title='Board'
                titleStyle={{fontSize: 15, color:Colors.black,marginBottom:Constants.MARGIN*4,alignItems:'center',
                  marginBottom: 0,paddingVertical:15,}}
                selectedTitleStyle={{fontSize: 15, color:Colors.black,marginBottom:Constants.MARGIN*4,alignItems:'center',
                  marginBottom: 0,paddingVertical:15,backgroundColor:Colors.selectedTab}}
                  tabStyle={{borderWidth: 1,borderColor: Colors.black}}
                >
                <Board/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selectedTitleStyle={{color:'#fcc900'}}
                selected={this.state.selectedTab === 'bookings'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'bookings',
                  });

                }}
                title='Bookings'
                titleStyle={{fontSize: 15, color:Colors.black,marginBottom:Constants.MARGIN*4,alignItems:'center',
                  marginBottom: 0,paddingVertical:15,}}
                selectedTitleStyle={{fontSize: 15, color:Colors.black,marginBottom:Constants.MARGIN*4,alignItems:'center',
                  marginBottom: 0,paddingVertical:15,backgroundColor:Colors.selectedTab}}
                  tabStyle={{borderWidth: 1,borderColor: Colors.black}}
                >
                <Booking/>
            </TabNavigator.Item>
            <TabNavigator.Item
                selectedTitleStyle={{color:'#fcc900'}}
                selected={this.state.selectedTab === 'search'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'search',
                  });

                }}
                title={tab}
                titleStyle={{fontSize: 15, color:Colors.black,marginBottom:Constants.MARGIN*4,alignItems:'center',
                  marginBottom: 0,paddingVertical:15,}}
                selectedTitleStyle={{fontSize: 15, color:Colors.black,marginBottom:Constants.MARGIN*4,alignItems:'center',
                  marginBottom: 0,paddingVertical:15,backgroundColor:Colors.selectedTab}}
                  tabStyle={{borderWidth: 1,borderColor: Colors.black}}
                  >
                {Tabx}
            </TabNavigator.Item>
            <TabNavigator.Item
                selectedTitleStyle={{color:'#fcc900'}}
                selected={this.state.selectedTab === 'profile'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'profile',
                  });

                }}
                title='Profile'
                titleStyle={{fontSize: 15, color:Colors.black,marginBottom:Constants.MARGIN*4,alignItems:'center',
                  marginBottom: 0,paddingVertical:15,}}
                selectedTitleStyle={{fontSize: 15, color:Colors.black,marginBottom:Constants.MARGIN*4,alignItems:'center',
                  marginBottom: 0,paddingVertical:15,backgroundColor:Colors.selectedTab}}
                  tabStyle={{borderWidth: 1,borderColor: Colors.black}}
                  >
                {profile}
            </TabNavigator.Item>

            
          </TabNavigator>
      </View>
    );
  }
}
