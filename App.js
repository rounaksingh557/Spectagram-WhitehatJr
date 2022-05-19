// Modules Import
import React from "react";
import {
  LogBox,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import firebase from "firebase";

// Files Import
import LoadingScreen from "./Screens/LoadingScreen";
import DashBoardScreen from "./Screens/DashBoardScreen";
import LoginScreen from "./Screens/LoginScreen";

import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashBoardScreen: DashBoardScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaView style={styles.droidSafeAreaView}>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  droidSafeAreaView: {
    flex: 1,
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
});
