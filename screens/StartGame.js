import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/color";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
const StartGame = props => {
  const [enteredValue, setEnterValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectNumber] = useState();
  const numberInputHandler = inputText => {
    setEnterValue(inputText.replace(/[^0-9]/g, ""));
  };
  const restInputHandler = () => {
    setEnterValue("");
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chooseNumber = parseInt(enteredValue);
    if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert("Invalid number", [
        { text: "Okay", style: "destructive", onPress: restInputHandler }
      ]);
      return;
    }

    setConfirmed(true);
    setSelectNumber(chooseNumber);
    setEnterValue("");
    Keyboard.dismiss();
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>Your select</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton
          onPress={() => {
            props.onStartGame(selectedNumber);
          }}
        >
          Start Game
        </MainButton>
      </Card>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a Game </TitleText>
        <Card style={styles.inputContainer}>
          <Text style={styles.text}>Select a number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          ></Input>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={restInputHandler}
                color={Colors.accent}
              ></Button>
            </View>
            <View>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              ></Button>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  title: {
    color: "blue",
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: "80%",

    // maxWidth: "80%",
    minWidth: 300,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    // width: 100
    width: Dimensions.get("window").width / 4
  },
  input: {
    width: 50,
    textAlign: "center"
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center"
  },
  text: {
    fontFamily: "open-sans"
  }
});
export default StartGame;
