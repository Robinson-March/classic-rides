// import React from "react";
// import {
// 	View,
// 	StyleSheet,
// 	SafeAreaView,
// 	Text,
// 	TouchableOpacity,
// } from "react-native";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { Ionicons } from "@expo/vector-icons";

// // Note: You need to install these packages:
// // npm install react-native-maps
// // expo install expo-location

// interface MapViewScreenProps {
// 	onClose: () => void;
// 	initialLocation?: {
// 		latitude: number;
// 		longitude: number;
// 	};
// 	pointsOfInterest?: Array<{
// 		id: string;
// 		title: string;
// 		description?: string;
// 		coordinate: {
// 			latitude: number;
// 			longitude: number;
// 		};
// 	}>;
// }

// const MapViewScreen: React.FC<MapViewScreenProps> = ({
// 	onClose,
// 	initialLocation = { latitude: 33.753746, longitude: -84.38633 }, // Default to Atlanta
// 	pointsOfInterest = [],
// }) => {
// 	return (
// 		<SafeAreaView style={styles.container}>
// 			<View style={styles.header}>
// 				<TouchableOpacity style={styles.backButton} onPress={onClose}>
// 					<Ionicons name="arrow-back" size={24} color="#000" />
// 				</TouchableOpacity>
// 				<Text style={styles.headerTitle}>Explore Map</Text>
// 				<View style={styles.placeholder} />
// 			</View>

// 			<MapView
// 				provider={PROVIDER_GOOGLE}
// 				style={styles.map}
// 				initialRegion={{
// 					latitude: initialLocation.latitude,
// 					longitude: initialLocation.longitude,
// 					latitudeDelta: 0.01,
// 					longitudeDelta: 0.01,
// 				}}
// 				showsUserLocation
// 				showsMyLocationButton
// 			>
// 				<Marker
// 					coordinate={{
// 						latitude: initialLocation.latitude,
// 						longitude: initialLocation.longitude,
// 					}}
// 					pinColor="#009688"
// 					title="Your Location"
// 				/>

// 				{pointsOfInterest.map((poi) => (
// 					<Marker
// 						key={poi.id}
// 						coordinate={poi.coordinate}
// 						title={poi.title}
// 						description={poi.description}
// 					/>
// 				))}
// 			</MapView>
// 		</SafeAreaView>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#FFFFFF",
// 	},
// 	header: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		justifyContent: "space-between",
// 		paddingHorizontal: 16,
// 		paddingVertical: 12,
// 		borderBottomWidth: 1,
// 		borderBottomColor: "#EEEEEE",
// 	},
// 	backButton: {
// 		padding: 8,
// 	},
// 	headerTitle: {
// 		fontSize: 18,
// 		color: "#333333",
// 	},
// 	placeholder: {
// 		width: 40, // To balance the header
// 	},
// 	map: {
// 		flex: 1,
// 	},
// });

// export default MapViewScreen;
