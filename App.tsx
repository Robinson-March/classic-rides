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
import TourTypeScreen from "./components/Screens/Tour/TourTypeScreen";
import TourSitesList from "./components/Screens/Tour/TourSitesListScreen";
import TourCarScreen from "./components/Screens/Tour/TourCarScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CarDetailsScreen from "./components/Screens/Tour/CarDetailsScreen";
import TourOptionsScreen from "./components/Screens/Tour/TourOptionsScreen";
import BookingConfirmation from "./components/Screens/Tour/BookingConfirmation";
import PaymentsScreen from "./components/Screens/Tour/PaymentsScreen";
import UberNavigationMap from "./components/Screens/Main/UberNavigationScreen";
import * as Sentry from "@sentry/react-native";
import ActiveTourScreen from "./components/Screens/ActiveTour/ActiveTourScreen";

Sentry.init({
	dsn: process.env.EXPO_PUBLIC_DSN,

	// Adds more context data to events (IP address, cookies, user, etc.)
	// For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
	sendDefaultPii: true,

	// Configure Session Replay
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [
		Sentry.mobileReplayIntegration(),
		Sentry.feedbackIntegration(),
	],

	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: __DEV__,
});

const Stack = createNativeStackNavigator();

export default Sentry.wrap(function App() {
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
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
							headerStyle: {
								backgroundColor: CRColors.white,
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
								backgroundColor: CRColors.white,
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
						<Stack.Screen
							name="tourtype"
							component={TourTypeScreen}
							options={{
								contentStyle: { width: "100%", marginTop: 80 },
								headerShown: true,
								headerTitle: "",
								headerTransparent: true,
								headerStyle: {
									backgroundColor: CRColors.white,
									elevation: 0, // Remove shadow on Android
									shadowOpacity: 0, // Remove shadow on iOS
									borderBottomWidth: 0, // Remove the bottom border
								},
							}}
						/>
						<Stack.Screen
							name="toursiteslist"
							component={TourSitesList}
							options={{
								contentStyle: { width: "100%", marginTop: 80 },
								headerShown: true,
								headerTitle: "",
								headerTransparent: true,
								headerStyle: {
									backgroundColor: CRColors.white,
									elevation: 0, // Remove shadow on Android
									shadowOpacity: 0, // Remove shadow on iOS
									borderBottomWidth: 0, // Remove the bottom border
								},
							}}
						/>
						<Stack.Screen
							name="tourcars"
							component={TourCarScreen}
							options={{
								contentStyle: { width: "100%", marginTop: 80 },
								headerShown: true,
								headerTitle: "",
								headerTransparent: true,
								headerStyle: {
									backgroundColor: CRColors.white,
									elevation: 0, // Remove shadow on Android
									shadowOpacity: 0, // Remove shadow on iOS
									borderBottomWidth: 0, // Remove the bottom border
								},
							}}
						/>
						<Stack.Screen
							name="cardetails"
							component={CarDetailsScreen}
							options={{
								contentStyle: { width: "100%", marginTop: 80 },
								headerShown: true,
								headerTitle: "",
								headerTransparent: true,
								headerStyle: {
									backgroundColor: CRColors.white,
									elevation: 0, // Remove shadow on Android
									shadowOpacity: 0, // Remove shadow on iOS
									borderBottomWidth: 0, // Remove the bottom border
								},
							}}
						/>
						<Stack.Screen
							name="touroptions"
							component={TourOptionsScreen}
							options={{
								contentStyle: { width: "100%", marginTop: 80 },
								headerShown: true,
								headerTitle: "",
								headerTransparent: true,
								headerStyle: {
									backgroundColor: CRColors.white,
									elevation: 0, // Remove shadow on Android
									shadowOpacity: 0, // Remove shadow on iOS
									borderBottomWidth: 0, // Remove the bottom border
								},
							}}
						/>
						<Stack.Screen
							name="tourbooking"
							component={BookingConfirmation}
							options={{
								contentStyle: { width: "100%", marginTop: 80 },
								headerShown: true,
								headerTitle: "",
								headerTransparent: true,
								headerStyle: {
									backgroundColor: CRColors.white,
									elevation: 0, // Remove shadow on Android
									shadowOpacity: 0, // Remove shadow on iOS
									borderBottomWidth: 0, // Remove the bottom border
								},
							}}
						/>
						<Stack.Screen
							name="payment"
							component={PaymentsScreen}
							options={{
								contentStyle: { width: "100%", marginTop: 80 },
								headerShown: true,
								headerTitle: "",
								headerTransparent: true,
								headerStyle: {
									backgroundColor: CRColors.white,
									elevation: 0, // Remove shadow on Android
									shadowOpacity: 0, // Remove shadow on iOS
									borderBottomWidth: 0, // Remove the bottom border
								},
							}}
						/>
						<Stack.Screen
							name="ubernav"
							component={UberNavigationMap}
							options={{
								contentStyle: { width: "100%", marginTop: 80 },
								headerShown: true,
								headerTitle: "",
								headerTransparent: true,
								headerStyle: {
									backgroundColor: CRColors.white,
									elevation: 0, // Remove shadow on Android
									shadowOpacity: 0, // Remove shadow on iOS
									borderBottomWidth: 0, // Remove the bottom border
								},
							}}
						/>
						<Stack.Screen
							name="activetour"
							component={ActiveTourScreen}
							options={{
								contentStyle: { width: "100%", marginTop: 80 },
								headerShown: true,
								headerTitle: "",
								headerTransparent: true,
								headerStyle: {
									backgroundColor: CRColors.white,
									elevation: 0, // Remove shadow on Android
									shadowOpacity: 0, // Remove shadow on iOS
									borderBottomWidth: 0, // Remove the bottom border
								},
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
});
