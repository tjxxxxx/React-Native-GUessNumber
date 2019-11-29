import React from "react";
import { View, StyleSheet } from "react-native";
const Card = props => {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
};
const styles = StyleSheet.create({
  card: {
    width: 350,
    maxWidth: "80%",
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 0.1,
    backgroundColor: "white",
    elevation: 20,
    padding: 20,
    borderRadius: 10
  }
});
export default Card;
