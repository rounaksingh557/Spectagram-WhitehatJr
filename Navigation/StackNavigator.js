// Modules Import
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Files Import
import TabNavigator from "./TabNavigator";
import PostScreen from "../Screens/PostScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={TabNavigator} />
      <Stack.Screen name="PostScreen" component={PostScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
