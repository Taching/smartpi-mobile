import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Text, Platform } from "react-native";

import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: "#007AFF",
          background: "#000",
          card: "#111",
          text: "#fff",
          border: "#222",
          notification: "#FF3B30",
        },
        fonts: {
          regular: {
            fontFamily: "System",
            fontWeight: "400",
          },
          medium: {
            fontFamily: "System",
            fontWeight: "500",
          },
          bold: {
            fontFamily: "System",
            fontWeight: "700",
          },
          heavy: {
            fontFamily: "System",
            fontWeight: "900",
          },
        },
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#666",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#111",
            borderTopColor: "#222",
            borderTopWidth: 1,
            paddingBottom: Platform.OS === "ios" ? 34 : 10,
            paddingTop: 12,
            height: Platform.OS === "ios" ? 88 : 70,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Text
                style={{
                  fontSize: focused ? 24 : 22,
                  color: focused ? "#007AFF" : color,
                }}
              >
                🏠
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, focused }) => (
              <Text
                style={{
                  fontSize: focused ? 24 : 22,
                  color: focused ? "#007AFF" : color,
                }}
              >
                ⚙️
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style="light" backgroundColor="#000" translucent={true} />
    </NavigationContainer>
  );
}
