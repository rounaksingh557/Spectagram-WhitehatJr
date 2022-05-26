// Modules Import
import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

// Files Import
import Feed from "../Screens/Feed";
import CreatePost from "../Screens/CreatePost";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  const [theme, setTheme] = React.useState("");
  const [isUpdated, setIsUpdated] = React.useState(false);

  async function fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        setTheme(theme);
      });
  }

  React.useEffect(() => fetchUser(), []);

  const renderFeed = (props) => {
    return <Feed setUpdateToFalse={removeUpdate} {...props} />;
  };

  const renderCreatePost = (props) => {
    return <CreatePost setUpdateToTrue={changeUpdate} {...props} />;
  };

  const changeUpdate = () => {
    setIsUpdated(true);
  };

  const removeUpdate = () => {
    setIsUpdated(false);
  };

  return (
    <Tab.Navigator
      labeled={false}
      barStyle={
        theme === "light" ? styles.bottomTabStyleLight : styles.bottomTabStyle
      }
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "CreatePost") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}
              style={styles.icons}
            />
          );
        },
      })}
      activeColor={"#ee8249"}
      inactiveColor={"gray"}
    >
      <Tab.Screen
        name="Feed"
        component={renderFeed}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="CreatePost"
        component={renderCreatePost}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2a2a2a",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  bottomTabStyleLight: {
    backgroundColor: "lightyellow",
    height: "8%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});

export default TabNavigator;
