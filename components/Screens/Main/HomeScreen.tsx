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
import { useCRStore } from "../../../store";
import { CRText } from "../../design/CRText";

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_MAP_API;

const HomeScreen: React.FC = ({ navigation }) => {
	const {
		searchTripadvisor,
		tripSearchResults,
		tripSearchLoading,
		tripSearchError,
	} = useCRStore();

	const handleMenuPress = () => console.log("Menu pressed");
	const handleAvatarPress = () => console.log("Avatar pressed");
	const handleMapPress = () => console.log("Map pressed");
	const handleSeeAllPress = () => console.log("See all pressed");
	const handleTourRidesPress = () =>
		navigation.navigate("tourpackageselection");

	useEffect(() => {
		searchTripadvisor("atlanta");
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
								<CRText style={styles.sectionTitle}>Sites near you</CRText>
								<TouchableOpacity onPress={handleSeeAllPress}>
									<CRText style={styles.seeAllText}>See all</CRText>
								</TouchableOpacity>
							</View>
						</View>
					}
					data={tripSearchResults}
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
							loading={tripSearchLoading}
							error={tripSearchError}
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
