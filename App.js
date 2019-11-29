import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGame from "./screens/StartGame";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
import * as Font from "expo-font";
import { AppLoading } from "expo";
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf")
  });
};
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoaded(true);
        }}
        onError={err => console.log(err)}
      ></AppLoading>
    );
  }
  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };
  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };
  let content = <StartGame onStartGame={startGameHandler}></StartGame>;
  if (userNumber && guessRound <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRound > 0) {
    content = (
      <GameOver
        roundsNumber={guessRound}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      ></GameOver>
    );
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess number"></Header>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
