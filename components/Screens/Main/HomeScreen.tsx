import React, { useEffect } from "react";
import {
	FlatList,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import Header from "../../design/Header";
import MapCard from "../../design/Cards/MapCard";
import TourCard from "../../design/Cards/TourCard";
import { TealButton } from "../../design/Buttons/TealButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeUpView } from "../../design/FadeUpView";
import { searchTripadvisorLocation } from "../../apifunctions/tripadvisor/searchTripadvisorLocation";
import LoadingIndicator from "../../design/LoadingIndicator";
import { crHeight } from "../../design/shortened/Dimensions";
import { CRColors } from "../../design/shortened/CRColours";

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_MAP_API;

const tourSitesStatic = [
	{
		location_id: "1",
		image:
			"https://media-cdn.tripadvisor.com/media/photo-m/1280/18/6c/00/18/vista-panoramica-de-parte.jpg",
		name: "Botanical Garden",
	},
	{
		location_id: "2",
		image:
			"https://media-cdn.tripadvisor.com/media/photo-o/0f/9f/6c/fd/photo9jpg.jpg",
		name: "Atlanta History Center",
	},
	{
		location_id: "3",
		image:
			"https://media-cdn.tripadvisor.com/media/photo-o/07/41/24/45/zoo-atlanta.jpg",
		name: "Zoo Atlanta",
	},
	{
		location_id: "4",
		image:
			"https://media-cdn.tripadvisor.com/media/photo-o/0e/f2/6a/4d/beautiful-view-from-centennial.jpg",
		name: "Centennial Park",
	},
];

const HomeScreen: React.FC = ({ navigation }) => {
	const [tourSites, setTourSites] = React.useState(tourSitesStatic);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleMenuPress = () => console.log("Menu pressed");
	const handleAvatarPress = () => console.log("Avatar pressed");
	const handleMapPress = () => console.log("Map pressed");
	const handleSeeAllPress = () => console.log("See all pressed");
	const handleTourRidesPress = () =>
		navigation.navigate("tourpackageselection");

	const getAtlantaSites = async () => {
		try {
			setLoading(true);
			setError(null);
			const sites = await searchTripadvisorLocation(
				"Atlanta",
				process.env.EXPO_PUBLIC_TRIP_API,
			);
			setTourSites(sites.data);
		} catch (err: any) {
			console.error("Failed to fetch locations", err);
			setError("Failed to load locations.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getAtlantaSites();
	}, []);

	return (
		<SafeAreaView style={styles.safeArea}>
			<Header
				username="Donna"
				avatarSource={require("../../../assets/images/donna.png")}
				onMenuPress={handleMenuPress}
				onAvatarPress={handleAvatarPress}
			/>
			<FadeUpView delay={1000}>
				<FlatList
					style={{ height: crHeight * 0.89 }}
					ListHeaderComponent={
						<View style={{ gap: 20 }}>
							<View style={styles.mapSection}>
								<MapCard
									title="Current location"
									onPress={handleMapPress}
									googleMapsApiKey={GOOGLE_MAPS_API_KEY}
								/>
							</View>

							<View style={styles.sectionHeader}>
								<Text style={styles.sectionTitle}>Sites near you</Text>
								<TouchableOpacity onPress={handleSeeAllPress}>
									<Text style={styles.seeAllText}>See all</Text>
								</TouchableOpacity>
							</View>
						</View>
					}
					data={tourSites}
					keyExtractor={(item) => item.location_id}
					renderItem={({ item }) => (
						<TourCard
							image={item.image}
							title={item.name}
							onPress={() =>
								navigation.navigate("toursiteinfo", {
									location_id: item.location_id,
									name: item.name,
								})
							}
						/>
					)}
					numColumns={2}
					contentContainerStyle={styles.cardsGrid}
					columnWrapperStyle={styles.cardRow}
					ListEmptyComponent={
						<LoadingIndicator
							loading={loading}
							error={error}
							message="Finding interesting sites near you..."
						/>
					}
					showsVerticalScrollIndicator={false}
				/>
			</FadeUpView>
			<View style={{ position: "absolute", bottom: 20, width: "100%" }}>
				<TealButton
					title="See tour rides"
					onPress={handleTourRidesPress}
					style={styles.tourRidesButton}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: CRColors.white,
	},
	mapSection: {
		alignItems: "center",
		justifyContent: "center",
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		marginTop: 8,
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		color: "#333333",
	},
	seeAllText: {
		fontSize: 14,
		color: "#009688",
	},
	cardsGrid: {
		paddingHorizontal: 16,
		paddingBottom: 24,
	},
	cardRow: {
		justifyContent: "space-between",
		marginBottom: 16,
	},
	tourRidesButton: {
		backgroundColor: "#009688",
		marginHorizontal: 16,
		marginTop: 16,
		borderRadius: 28,
		height: 56,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default HomeScreen;
