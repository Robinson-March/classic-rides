import "react-native-gesture-handler";
import "react-native-reanimated";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";

import StartScreen from "./components/design/StartScreen";
import LoginScreen from "./components/Screens/Authentication/LoginScreen";
import HomeScreen from "./components/Screens/Main/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	const [fontsLoaded] = Font.useFonts({
		Jura: require("./assets/fonts/Jura/static/Jura-Regular.ttf"),
		Karla: require("./assets/fonts/Karla/static/Karla-Regular.ttf"),
		"Jura-Bold": require("./assets/fonts/Jura/static/Jura-Bold.ttf"),
		"Karla-Bold": require("./assets/fonts/Karla/static/Karla-Bold.ttf"),
		"Jura-Light": require("./assets/fonts/Jura/static/Jura-Light.ttf"),
		"Karla-Light": require("./assets/fonts/Karla/static/Karla-Light.ttf"),
		"Jura-Medium": require("./assets/fonts/Jura/static/Jura-Medium.ttf"),
		"Karla-Medium": require("./assets/fonts/Karla/static/Karla-Medium.ttf"),
	});

	if (!fontsLoaded) return <ActivityIndicator />;
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					presentation: "modal",
					animation: "slide_from_right",
					contentStyle: {
						padding: 10,
						alignItems: "center",
						justifyContent: "center",
					}, // ✅ fixed here
				}}
			>
				<Stack.Screen name="start" component={StartScreen} />
				<Stack.Screen name="login" component={LoginScreen} />
				<Stack.Screen name="home" component={HomeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
