// Modules Import
import React from "react";
import {
  LogBox,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu";
import * as Font from "expo-font";
import { RNFValue } from "react-native-responsive-fontsize";

// Files Import
import DrawerNavigator from "./Navigation/DrawerNavigator";
import LoadingScreen from "./Screens/LoadingScreen";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    };
  }

  async loadFonts() {
    await Font.loadAsync({
      Ubuntu_500Medium: Ubuntu_500Medium,
    });
    setTimeout(() => {
      this.setState({ fontLoaded: true });
    }, 5000);
  }

  componentDidMount() {
    this.loadFonts();
  }
  render() {
    const { fontLoaded } = this.state;
    LogBox.ignoreAllLogs();
    if (fontLoaded) {
      return (
        <SafeAreaView style={styles.droidSafeAreaView}>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </SafeAreaView>
      );
    } else {
      return <LoadingScreen />;
    }
  }
}

const styles = StyleSheet.create({
  droidSafeAreaView: {
    flex: 1,
    margin: Platform.OS === "android" ? StatusBar.currentHeight : RNFValue(25),
  },
});
