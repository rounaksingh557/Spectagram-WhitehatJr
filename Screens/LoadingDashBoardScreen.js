// Modules Import
import React from "react";
import { View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

export default function LoadingDashBoardScreen() {
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
