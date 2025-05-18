import "react-native-gesture-handler";
import "react-native-reanimated";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Sentry from "@sentry/react-native";

// Screen imports
import StartScreen from "./components/design/StartScreen";
import LoginScreen from "./components/Screens/Authentication/LoginScreen";
import HomeScreen from "./components/Screens/Main/HomeScreen";
import TourPackageScreen from "./components/Screens/Tour/TourPackageScreen";
import TourSiteInfoScreen from "./components/Screens/Tour/TourSiteInfoScreen";
import TourTypeScreen from "./components/Screens/Tour/TourTypeScreen";
import TourSitesList from "./components/Screens/Tour/TourSitesListScreen";
import TourCarScreen from "./components/Screens/Tour/TourCarScreen";
import CarDetailsScreen from "./components/Screens/Tour/CarDetailsScreen";
import TourOptionsScreen from "./components/Screens/Tour/TourOptionsScreen";
import BookingConfirmation from "./components/Screens/Tour/BookingConfirmation";
import PaymentsScreen from "./components/Screens/Tour/PaymentsScreen";
import UberNavigationMap from "./components/Screens/Main/UberNavigationScreen";
import ActiveTourScreen from "./components/Screens/ActiveTour/ActiveTourScreen";
import CompletedTourScreen from "./components/Screens/ActiveTour/CompletedTourScreen";
import ScheduleDateTourScreen from "./components/Screens/Main/ScheduleTourDateScreen";
import ScheduleTourTimeScreen from "./components/Screens/Main/ScheduleTourTimeScreen";
import ScheduleConfirmation from "./components/Screens/Main/ScheduleConfirmation";
import MessagesList from "./components/Screens/Activities/Messages/MessagesListScreen";

import { CRColors } from "./components/design/shortened/CRColours";
import MessagesScreen from "./components/Screens/Activities/Messages/MessagesScreen";
import ProfileScreen from "./components/Screens/Activities/ProfileScreen";

Sentry.init({
	dsn: process.env.EXPO_PUBLIC_DSN,
	sendDefaultPii: true,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [
		Sentry.mobileReplayIntegration(),
		Sentry.feedbackIntegration(),
	],
});

const Stack = createNativeStackNavigator();

// Screen configuration definitions
const SCREEN_CONFIGS = {
	// Basic screens with full width
	basic: {
		contentStyle: { width: "100%" },
		headerShown: false,
	},

	// Standard screens with header
	standard: {
		contentStyle: { width: "100%", marginTop: 80 },
		headerShown: true,
		headerTitle: "",
		headerTransparent: true,
		headerStyle: {
			backgroundColor: CRColors.white,
			elevation: 0,
			shadowOpacity: 0,
			borderBottomWidth: 0,
		},
	},

	// Special case for messages list with title
	messages: {
		contentStyle: { width: "100%", marginTop: 80 },
		headerShown: true,
		headerTitle: "Messages",
		headerTransparent: true,
		headerStyle: {
			backgroundColor: CRColors.white,
			elevation: 0,
			shadowOpacity: 0,
			borderBottomWidth: 0,
		},
	},

	// Special case for tour package selection
	tourPackage: {
		contentStyle: { width: "100%" },
		headerShown: true,
		headerTitle: "",
		headerTransparent: true,
	},
};

// Screen definitions with their configurations
const SCREENS = [
	{ name: "start", component: StartScreen, config: "basic" },
	{ name: "login", component: LoginScreen, config: "basic" },
	{ name: "home", component: HomeScreen, config: "basic" },
	{
		name: "tourpackageselection",
		component: TourPackageScreen,
		config: "tourPackage",
	},
	{ name: "toursiteinfo", component: TourSiteInfoScreen, config: "standard" },
	{ name: "tourtype", component: TourTypeScreen, config: "standard" },
	{ name: "toursiteslist", component: TourSitesList, config: "standard" },
	{ name: "tourcars", component: TourCarScreen, config: "standard" },
	{ name: "cardetails", component: CarDetailsScreen, config: "standard" },
	{ name: "touroptions", component: TourOptionsScreen, config: "standard" },
	{ name: "tourbooking", component: BookingConfirmation, config: "standard" },
	{ name: "payment", component: PaymentsScreen, config: "standard" },
	{ name: "ubernav", component: UberNavigationMap, config: "standard" },
	{ name: "activetour", component: ActiveTourScreen, config: "standard" },
	{ name: "tourcompleted", component: CompletedTourScreen, config: "standard" },
	{
		name: "scheduledatetour",
		component: ScheduleDateTourScreen,
		config: "standard",
	},
	{
		name: "scheduletimetour",
		component: ScheduleTourTimeScreen,
		config: "standard",
	},
	{
		name: "scheduleconfirmation",
		component: ScheduleConfirmation,
		config: "standard",
	},
	{ name: "messagelist", component: MessagesList, config: "messages" },
	{ name: "messages", component: MessagesScreen, config: "tourPackage" },
	{ name: "profile", component: ProfileScreen, config: "standard" },
];

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
								elevation: 0,
								shadowOpacity: 0,
								borderBottomWidth: 0,
							},
							headerShadowVisible: false,
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
						{SCREENS.map((screen) => (
							<Stack.Screen
								key={screen.name}
								name={screen.name}
								component={screen.component}
								options={SCREEN_CONFIGS[screen.config]}
							/>
						))}
					</Stack.Navigator>
				</NavigationContainer>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
});
