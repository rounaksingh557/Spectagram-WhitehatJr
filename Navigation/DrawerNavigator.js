// Modules Import
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Files Import
import StackNavigator from "./StackNavigator";
import Profile from "../Screens/Profile";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
