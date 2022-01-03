import React from 'react';
import {TouchableOpacity,Text, StyleSheet} from 'react-native';

export const RoundedButton = ({
  style={},  // 아래 네 줄은 파라미터
  textStyle={},
  size=125,
  ...props
}) => {
  return(
    <TouchableOpacity 
      style={[styles(size).radius,style]} 
      onPress={props.onPress}
    >
      <Text style={[styles(size).text,  textStyle]} >{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#fff",
      borderWidth: 2,
    },
    text: { color: "#fff", fontSize: size/2,marginTop:-3 },
  });
