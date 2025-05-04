import type React from "react";
import { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
	Linking,
	ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { crHeight } from "../shortened/Dimensions";

interface MapCardProps {
	title?: string;
	onPress?: () => void;
	width?: number | string;
	height?: number | string;
	zoom?: number;
}

const MapCard: React.FC<MapCardProps> = ({
	title = "Current location",
	onPress,
	width = "100%",
	height = 180,
	zoom = 15,
}) => {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null,
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					setErrorMsg("Permission to access location was denied");
					setLoading(false);
					return;
				}

				const locationResult = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.Balanced,
				});
				setLocation(locationResult);
			} catch (error) {
				setErrorMsg("Error fetching location");
				console.error(error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const handleMapPress = () => {
		if (onPress) {
			onPress();
			return;
		}

		if (location?.coords) {
			const { latitude, longitude } = location.coords;
			const label = "Current Location";
			const url = Platform.select({
				ios: `maps:0,0?q=${latitude},${longitude}(${label})`,
				android: `geo:0,0?q=${latitude},${longitude}(${label})`,
			});

			if (url) {
				Linking.openURL(url);
			}
		}
	};

	const getRegion = () => {
		if (!location?.coords) return null;

		const { latitude, longitude } = location.coords;
		const latitudeDelta = 0.0922 / (zoom / 10);
		const longitudeDelta = latitudeDelta * 1.5;

		return {
			latitude,
			longitude,
			latitudeDelta,
			longitudeDelta,
		};
	};

	const region = getRegion();

	return (
		<TouchableOpacity
			style={[
				styles.container,
				// {
				// 	width: typeof width === "number" ? width : width,
				// 	height: typeof height === "number" ? height : Number.parseInt(height),
				// },
			]}
			onPress={handleMapPress}
			activeOpacity={0.9}
		>
			<Text style={styles.title}>{title}</Text>
			<View>
				{loading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#009688" />
						<Text style={styles.loadingText}>Loading map...</Text>
					</View>
				) : errorMsg ? (
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{errorMsg}</Text>
					</View>
				) : !region ? (
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>Couldn't load the map</Text>
					</View>
				) : (
					<View style={{ borderRadius: 20 }}>
						<MapView
							style={styles.mapView}
							initialRegion={region}
							rotateEnabled={false}
							pitchEnabled={false}
							zoomEnabled={false}
							scrollEnabled={false}
						>
							<Marker coordinate={region} />
						</MapView>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 20,
		elevation: 20,
		height: crHeight * 0.3,
	},
	title: {
		fontSize: 16,
		color: "#333333",
		padding: 12,
	},
	mapContainer: {
		width: "100%",
		height: 200, // Aspect ratio 5:3
		padding: 10,
		gap: 5,
		borderRadius: 100,
	},
	mapView: {
		width: "100%",
		height: "100%",
		borderRadius: 100,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
		padding: 16,
	},
	loadingText: {
		color: "#666666",
		fontSize: 14,
		marginTop: 8,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F8F8F8",
		padding: 16,
	},
	errorText: {
		color: "#D32F2F",
		fontSize: 14,
		textAlign: "center",
	},
});

export default MapCard;
