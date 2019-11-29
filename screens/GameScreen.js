import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  );
};

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, ssetPastGuesses] = useState([initialGuess.toString()]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const nextGuessHandler = direction => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("this is wroing", [{ text: "sorry", style: "cancel" }]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds(rounds => rounds + 1);
    ssetPastGuesses(curPastGuess => [nextNumber.toString(), ...curPastGuess]);
  };

  return (
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            nextGuessHandler("lower");
          }}
        >
          <Ionicons name="md-remove" size={24} color="white"></Ionicons>
        </MainButton>
        <MainButton
          onPress={() => {
            nextGuessHandler("greater");
          }}
        >
          <Ionicons name="md-add" size={24} color="white"></Ionicons>
        </MainButton>
      </Card>
      <View style={styles.list}>
        {/* <ScrollView style={styles.listItem}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        ></FlatList>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%"
  },
  list: {
    flex: 1,
    width: "80%"
  },
  listItem: {
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
export default GameScreen;
