import {MaterialCommunityIcons} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native";
import * as React from "react";

class CircleButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          borderWidth:1,
          borderColor:'rgba(0,0,0,0.2)',
          alignItems:'center',
          justifyContent:'center',
          width:this.props.size,
          height:this.props.size,
          backgroundColor:'#fff',
          borderRadius:100,
        }}
        onPress={() => navigation.navigate(this.props.route)}
      >
        <MaterialCommunityIcons name={this.props.iconName} size={this.props.iconSize}/>
      </TouchableOpacity>
    );
  }
}