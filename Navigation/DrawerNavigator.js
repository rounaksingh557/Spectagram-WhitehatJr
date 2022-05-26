// Modules Import
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import firebase from "firebase";

// Files Import
import StackNavigator from "./StackNavigator";
import Profile from "../Screens/Profile";
import Logout from "../Screens/Logout";
import CustomSideBarMenu from "../Screens/CustomSideBarMenu";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [theme, setTheme] = React.useState(true);

  React.useEffect(() => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        setTheme(theme === "light" ? true : false);
      });
  }, [theme]);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#e91e63",
        drawerInactiveTintColor: theme ? "#000" : "#fff",
        drawerItemStyle: {
          marginVertical: 5,
        },
      }}
      drawerContent={(props) => <CustomSideBarMenu {...props} />}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
