import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

class Board2 extends Component {
  // static navigationOptions = {
  //   title: "Booking2",
  //   headerStyle: { backgroundColor: '#d3ec2d' },
  // };

  static navigationOptions = {
    title: "Clients2",
  };


  render() {
    
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "yellowgreen",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{color:'white', fontSize: 30}} >Clients2</Text>
      </View>
    );
  }
}

export default Board2;
