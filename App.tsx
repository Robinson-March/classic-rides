import "react-native-gesture-handler";
import "react-native-reanimated";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

import StartScreen from "./components/design/StartScreen";
import LoginScreen from "./components/Screens/Authentication/LoginScreen";
import HomeScreen from "./components/Screens/Main/HomeScreen";
import TourPackageScreen from "./components/Screens/Tour/TourPackageScreen";
import TourSiteInfoScreen from "./components/Screens/Tour/TourSiteInfoScreen";
import { CRColors } from "./components/design/shortened/CRColours";

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

	if (!fontsLoaded)
		return (
			<SafeAreaView
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			>
				<ActivityIndicator />
			</SafeAreaView>
		);

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
						headerStyle: {
							backgroundColor: "transparent",
							elevation: 0, // Remove shadow on Android
							shadowOpacity: 0, // Remove shadow on iOS
							borderBottomWidth: 0, // Remove the bottom border
						},
						headerShadowVisible: false, // Remove shadow
						presentation: "modal",
						animation: "slide_from_right",
						contentStyle: {
							padding: 10,
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
						},
					}}
				>
					<Stack.Screen
						name="start"
						component={StartScreen}
						options={{ contentStyle: { width: "100%" } }}
					/>
					<Stack.Screen
						name="login"
						component={LoginScreen}
						options={{ contentStyle: { width: "100%" } }}
					/>
					<Stack.Screen
						name="home"
						component={HomeScreen}
						options={{ contentStyle: { width: "100%" } }}
					/>
					<Stack.Screen
						name="tourpackageselection"
						component={TourPackageScreen}
						options={{
							contentStyle: { width: "100%" },
							headerShown: true,
							headerTitle: "",
							headerTransparent: true,
						}}
					/>
					<Stack.Screen
						name="toursiteinfo"
						component={TourSiteInfoScreen}
						options={{
							contentStyle: { width: "100%", marginTop: 80 },
							headerShown: true,
							headerTitle: "",
							headerTransparent: true,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
