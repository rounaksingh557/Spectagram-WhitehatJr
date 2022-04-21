// Modules Import
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Files Import
import Feed from "../Screens/Feed";
import CreatePost from "../Screens/CreatePost";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "CreateProfile") {
            iconName = focused ? "create" : "create-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerTitleStyle: {
          fontFamily: "Ubuntu_500Medium",
        },
      })}
      tabBarOptions={{
        activeTintColor: "green",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="CreateProfile" component={CreatePost} />
    </Tab.Navigator>
  );
}
