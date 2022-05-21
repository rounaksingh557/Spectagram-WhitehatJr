// Modules Import
import React from "react";
import { View, StyleSheet, Image, Switch } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

// Files Import
import CustomText from "../Utility/CustomText";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      light_theme: true,
      profile_image: "",
      name: "",
    };
  }

  toggleSwitch() {
    const previousState = this.state.isEnabled;
    const theme = previousState ? "light" : "dark";
    const updates = {};
    updates["/users/" + firebase.auth().currentUser.uid + "/current_theme"] =
      theme;
    firebase.database().ref().update(updates);
    this.setState({
      isEnabled: !previousState,
      light_theme: previousState,
    });
  }

  async fetchUser() {
    let theme, name, image;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
        image = snapshot.val().profile_picture;
        this.setState({
          light_theme: theme === "light" ? true : false,
          isEnabled: theme === "light" ? false : true,
          name: name,
          profile_image: image,
        });
      });
  }

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <View
        style={
          this.state.light_theme ? styles.containerLight : styles.container
        }
      >
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.iconImage}
            ></Image>
          </View>
          <View style={styles.appTitleTextContainer}>
            <CustomText design={styles.appTitleText} children={"Spectagram"} />
          </View>
        </View>
        <View style={styles.screenContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: this.state.profile_image }}
              style={styles.profileImage}
            ></Image>
            <CustomText design={styles.nameText} children={this.state.name} />
          </View>
          <View style={styles.themeContainer}>
            <CustomText design={styles.themeText} children={"Dark Theme"} />
            <Switch
              style={{
                transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
              }}
              trackColor={{ false: "#767577", true: "white" }}
              thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => this.toggleSwitch()}
              value={this.state.isEnabled}
            />
          </View>
          <View style={{ flex: 0.3 }} />
        </View>
        <View style={{ flex: 0.08 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    fontSize: RFValue(28),
  },
  screenContainer: {
    flex: 0.85,
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
  },
  nameText: {
    fontSize: RFValue(40),
    marginTop: RFValue(10),
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RFValue(20),
  },
  themeText: {
    fontSize: RFValue(20),
    marginRight: RFValue(15),
  },
});
