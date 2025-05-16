import React, { useEffect, useRef, useState } from "react";
import {
	View,
	StyleSheet,
	Dimensions,
	Button,
	Alert,
	TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polyline, AnimatedRegion } from "react-native-maps";
import * as Location from "expo-location";
import polyline from "@mapbox/polyline";
import { TealButton } from "../../design/Buttons/TealButton";
import { generalStyles } from "../../design/shortened/generalStyles";
import { crWidth } from "../../design/shortened/Dimensions";
import { CRColors } from "../../design/shortened/CRColours";
import { CRText } from "../../design/CRText";

const screen = Dimensions.get("window");

export default function UberNavigationMap({ navigation }) {
	const [region, setRegion] = useState(null);
	const [routeCoords, setRouteCoords] = useState([]);
	const [destination, setDestination] = useState(null);
	const [navigationStarted, setNavigationStarted] = useState(false);
	const [hasArrived, setHasArrived] = useState(false);
	const markerRef = useRef(null);

	const [coordinate] = useState(
		new AnimatedRegion({
			latitude: 0,
			longitude: 0,
			latitudeDelta: 0.009,
			longitudeDelta: 0.009,
		}),
	);

	// Simulated destination
	const DEST_LAT = 37.78825;
	const DEST_LNG = -122.4324;
	const get1KmNorth = (latitude: number, longitude: number) => {
		const earthRadius = 6371; // in km

		const newLatitude = latitude + (1 / earthRadius) * (180 / Math.PI); // 1 km to the north
		return { latitude: newLatitude, longitude };
	};
	const get6FeetNorth = (latitude: number, longitude: number) => {
		const earthRadius = 6371000; // meters
		const offsetMeters = 1.83; // 6 feet

		const deltaLat = (offsetMeters / earthRadius) * (180 / Math.PI);
		return {
			latitude: latitude + deltaLat,
			longitude,
		};
	};

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") return;

			const location = await Location.getCurrentPositionAsync({});
			const { latitude, longitude } = location.coords;

			setRegion({
				latitude,
				longitude,
				latitudeDelta: 0.009,
				longitudeDelta: 0.009,
			});

			coordinate
				.timing({
					latitude,
					longitude,
					duration: 1000,
					useNativeDriver: false,
					toValue: 0,
					latitudeDelta: 0,
					longitudeDelta: 0,
				})
				.start();

			// 👇 Generate a destination 1km north of current location
			const dest = get6FeetNorth(latitude, longitude);
			setDestination(dest);

			const points = await getRoutePoints({ latitude, longitude }, dest);
			setRouteCoords(points);
		})();
	}, []);
	useEffect(() => {
		console.log(navigationStarted);
		setTimeout(() => {
			if (navigationStarted) {
				setHasArrived(true);
			}
		}, 5000);
	}, [navigationStarted]);
	const getRoutePoints = async (from, to) => {
		const origin = `${from.latitude},${from.longitude}`;
		const destination = `${to.latitude},${to.longitude}`;
		const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_MAP_API;

		const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`;
		console.log("Fetching directions:", url); // 👈 Log the full URL

		try {
			const response = await fetch(url);
			const data = await response.json();

			console.log("Google Directions API Response:", data); // 👈 Check this in console

			if (!data.routes || !data.routes.length) {
				console.warn("No routes found");
				return [];
			}

			const points = polyline.decode(data.routes[0].overview_polyline.points);
			const coords = points.map(([latitude, longitude]) => ({
				latitude,
				longitude,
			}));
			return coords;
		} catch (error) {
			console.error("Error fetching directions:", error);
			return [];
		}
	};

	const startNavigation = () => {
		if (!routeCoords.length) return;

		setNavigationStarted(true);

		let index = 0;
		const interval = setInterval(() => {
			if (index >= routeCoords.length) {
				clearInterval(interval);
				Alert.alert("Arrived!", "You have reached your destination.");
				return;
			}

			const nextCoord = routeCoords[index];

			coordinate
				.timing({
					latitude: nextCoord.latitude,
					longitude: nextCoord.longitude,
					duration: 1000,
					useNativeDriver: false,
					toValue: 0,
					latitudeDelta: 0,
					longitudeDelta: 0,
				})
				.start();

			// Optionally, update map view center as well
			// If you want to animate map centering:
			// mapRef.current?.animateToRegion({
			//   latitude: nextCoord.latitude,
			//   longitude: nextCoord.longitude,
			//   latitudeDelta: 0.009,
			//   longitudeDelta: 0.009,
			// }, 1000);

			index++;
		}, 1000);
	};

	if (!region || !destination) return null;

	return (
		<View style={styles.container}>
			<MapView style={styles.map} initialRegion={region} showsUserLocation>
				<Marker.Animated ref={markerRef} coordinate={coordinate} />
				<Marker coordinate={destination} pinColor="green" />
				<Polyline
					coordinates={routeCoords}
					strokeWidth={5}
					strokeColor="blue"
				/>
			</MapView>

			{/* {!navigationStarted ? ( */}
			<View style={[styles.buttonContainer]}>
				<TealButton
					title={hasArrived ? "Start Trip" : "Start Navigation"}
					onPress={
						hasArrived
							? () => navigation.navigate("activetour")
							: startNavigation
					}
					style={{
						width: crWidth * 0.6,
						backgroundColor: hasArrived ? CRColors.yellow : CRColors.accent,
					}}
				/>
			</View>
			{/* ) : (
				<View
					style={{
						padding: 20,
						borderRadius: 16,
						backgroundColor: CRColors.tintAccent,
						alignItems: "center",
						width: "80%",
					}}
				>
					<CRText size={18} weight="bold" font="Karla">
						Head to the destination
					</CRText>

					<TealButton
						title={hasArrived ? "Start Trip" : "Start Navigation"}
						onPress={startNavigation}
						style={{
							width: crWidth * 0.6,
							backgroundColor: hasArrived ? CRColors.yellow : CRColors.accent,
						}}
					/>
				</View>
			)} */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	map: {
		width: screen.width,
		height: screen.height,
	},
	buttonContainer: {
		position: "absolute",
		bottom: 50,
		alignSelf: "center",
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
	},
});
