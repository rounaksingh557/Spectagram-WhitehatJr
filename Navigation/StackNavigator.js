import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Name1" component={<></>} />
      <Stack.Screen name="Name2" component={<></>} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
