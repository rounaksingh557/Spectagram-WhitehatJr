// Modules Import
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default class CustomSidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }

  fetchUser() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({
          light_theme: theme === "light" ? true : false,
        });
      });
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    let props = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.light_theme ? "white" : "grey",
        }}
      >
        <Image
          source={require("../assets/logo.png")}
          style={styles.sideMenuProfileIcon}
        ></Image>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: "center",
    marginTop: RFValue(60),
    resizeMode: "contain",
  },
});
