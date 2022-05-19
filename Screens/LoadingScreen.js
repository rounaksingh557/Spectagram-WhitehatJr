// Modules Import
import React from "react";
import { View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import firebase from "firebase";

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("DashBoardScreen");
      } else {
        this.props.navigation.navigate("LoginScreen");
      }
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          style={{
            width: Dimensions.get("window").width / 2,
            height: Dimensions.get("window").height / 2,
            alignSelf: "center",
          }}
          source={require("../assets/296-react-logo.json")}
          autoPlay
          loop
        ></LottieView>
      </View>
    );
  }
}
