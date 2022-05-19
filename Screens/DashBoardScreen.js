// Modules Import
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Ubuntu_500Medium } from "@expo-google-fonts/ubuntu";
import * as Font from "expo-font";

// Files Import
import DrawerNavigator from "../Navigation/DrawerNavigator";
import LoadingDashBoardScreen from "./LoadingDashBoardScreen";

export default class DashBoardScreen extends React.Component {
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
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      );
    } else {
      return <LoadingDashBoardScreen />;
    }
  }
}
