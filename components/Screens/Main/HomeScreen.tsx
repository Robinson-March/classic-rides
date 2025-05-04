import type React from "react";
import {
	FlatList,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import Header from "../../design/Header";
import MapCard from "../../design/Cards/MapCard";
import TourCard from "../../design/Cards/TourCard";
import { TealButton } from "../../design/Buttons/TealButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeUpView } from "../../design/FadeUpView";

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyC4eB1yTDBtJBvPb2g1kPjFn4deWKqsUdg";

const tourSites = [
	{
		id: "1",
		image: require("../../../assets/images/places/botanical.png"),
		title: "Botanical Garden",
		description: "Beautiful garden with exotic plants",
		time: "60 min",
		price: "$15",
	},
	{
		id: "2",
		image: require("../../../assets/images/places/mercedes.png"),
		title: "Mercedes Stadium",
		description: "An iconic stadium in downtown Atlanta",
		time: "90 min",
		price: "$35",
	},
	{
		id: "3",
		image: require("../../../assets/images/places/aquarium.png"),
		title: "Georgia Aquarium",
		description: "World's most magical aquarium",
		time: "120 min",
		price: "$45",
	},
	{
		id: "4",
		image: require("../../../assets/images/places/centennial.png"),
		title: "Centennial Park",
		description: "Special night tour experience",
		time: "90 min",
		price: "$60",
	},
];

const HomeScreen: React.FC = ({ navigation }) => {
	const handleMenuPress = () => console.log("Menu pressed");
	const handleAvatarPress = () => console.log("Avatar pressed");
	const handleMapPress = () => console.log("Map pressed");
	const handleSeeAllPress = () => console.log("See all pressed");
	const handleTourRidesPress = () =>
		navigation.navigate("tourpackageselection");

	return (
		<SafeAreaView>
			<Header
				username="Donna"
				avatarSource={require("../../../assets/images/donna.png")}
				onMenuPress={handleMenuPress}
				onAvatarPress={handleAvatarPress}
			/>
			<FadeUpView delay={1000}>
				<FlatList
					ListHeaderComponent={
						<>
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
						</>
					}
					data={tourSites}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<TourCard image={item.image} title={item.title} />
					)}
					numColumns={2}
					contentContainerStyle={styles.cardsGrid}
					columnWrapperStyle={styles.cardRow}
					ListFooterComponent={
						<TealButton
							title="See tour rides"
							onPress={handleTourRidesPress}
							style={styles.tourRidesButton}
						/>
					}
					showsVerticalScrollIndicator={false}
				/>
			</FadeUpView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#F8F8F8",
	},
	mapSection: {
		padding: 16,
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
