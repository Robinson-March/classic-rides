import type React from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import Header from "../../design/Header";
import MapCard from "../../design/Cards/MapCard";
import TourCard from "../../design/Cards/TourCard";

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = "AIzaSyC4eB1yTDBtJBvPb2g1kPjFn4deWKqsUdg";

const HomeScreen: React.FC = () => {
	const handleMenuPress = () => {
		console.log("Menu pressed");
		// Implement your menu open logic here
	};

	const handleAvatarPress = () => {
		console.log("Avatar pressed");
		// Navigate to profile or user settings
	};

	const handleMapPress = () => {
		console.log("Map pressed");
		// Navigate to map details or open full map
	};

	const handleSeeAllPress = () => {
		console.log("See all pressed");
		// Navigate to all nearby sites
	};

	const handleTourRidesPress = () => {
		console.log("See tour rides pressed");
		// Navigate to tour rides page
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<Header
				username="Donna"
				avatarSource={require("../../../assets/images/donna.png")}
				onMenuPress={handleMenuPress}
				onAvatarPress={handleAvatarPress}
			/>

			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
			>
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

				<View style={styles.cardsGrid}>
					<View style={styles.cardRow}>
						<TourCard
							image={require("../../../assets/images/places/botanical.png")}
							title="Botanical Garden"
							description="Beautiful garden with exotic plants"
							time="60 min"
							price="$15"
						/>
						<TourCard
							image={require("../../../assets/images/places/mercedes.png")}
							title="Mercedes Stadium"
							description="An iconic stadium in downtown Atlanta"
							time="90 min"
							price="$35"
						/>
					</View>

					<View style={styles.cardRow}>
						<TourCard
							image={require("../../../assets/images/places/aquarium.png")}
							title="Georgia Aquarium"
							description="World's most magical aquarium"
							time="120 min"
							price="$45"
						/>
						<TourCard
							image={require("../../../assets/images/places/centennial.png")}
							title="Georgia Aquarium"
							description="Special night tour experience"
							time="90 min"
							price="$60"
						/>
					</View>
				</View>

				<TouchableOpacity
					style={styles.tourRidesButton}
					onPress={handleTourRidesPress}
				>
					<Text style={styles.tourRidesButtonText}>See tour rides</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#F8F8F8",
	},
	scrollView: {
		flex: 1,
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
	},
	cardRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	tourRidesButton: {
		backgroundColor: "#009688",
		marginHorizontal: 16,
		marginVertical: 24,
		borderRadius: 28,
		height: 56,
		justifyContent: "center",
		alignItems: "center",
	},
	tourRidesButtonText: {
		color: "#FFFFFF",
		fontSize: 18,
	},
});

export default HomeScreen;
