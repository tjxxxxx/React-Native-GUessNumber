import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import MainButton from "../components/MainButton";
const GameOver = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          //淡入淡出时间
          fadeDuration={300}
          source={{
            uri:
              "https://d3qlaywcwingl6.cloudfront.net/content/WB/Video/TomJerryTomtheMouse/Thumbnails/Default/TJ_TomtheMouse_12x8.png"
          }}
          //   source={require("../assets/success.jpg")}
          style={styles.image}
        ></Image>
      </View>

      <Text>Game Over</Text>
      <Text>Number of Rounds:{props.roundsNumber}</Text>
      <Text>Number was: {props.userNumber}</Text>
      <MainButton onPress={props.onRestart}>New Game</MainButton>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    // width: 300,
    width: Dimensions.get("window").width * 0.7,

    // height: 300,
    height: Dimensions.get("window").width * 0.7,
    //圆形半径
    // borderRadius: 150,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 20
  },
  image: {
    width: "100%",
    height: "100%"
  }
});
export default GameOver;
