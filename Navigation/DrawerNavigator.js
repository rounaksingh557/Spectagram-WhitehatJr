// Modules Import
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Files Import
import TabNavigator from "../Navigation/TabNavigator";
import Profile from "../Screens/Profile";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Ubuntu_500Medium",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </Drawer.Navigator>
  );
}
