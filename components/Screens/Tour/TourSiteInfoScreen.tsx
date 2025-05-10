import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
	FlatList,
} from "react-native";
import { getTripadvisorLocationDetails } from "../../apifunctions/tripadvisor/getTripadvisorLocationDetails";
import LoadingIndicator from "../../design/LoadingIndicator";
import { SafeAreaView } from "react-native-safe-area-context";

import { generalStyles } from "../../design/shortened/generalStyles";
import { crHeight, crWidth } from "../../design/shortened/Dimensions";
import { FadeUpView } from "../../design/FadeUpView";
import { Ionicons } from "@expo/vector-icons";
import {
	getLocationImages,
	TripadvisorImage,
} from "../../apifunctions/tripadvisor/getLocationImages";
import { TripadvisorLocationDetails } from "../../utils/types/tripadvisors";
import { StatusBar } from "expo-status-bar";
import { useCRStore } from "../../../store";
import TourCard from "../../design/Cards/TourCard";
import { CRText } from "../../design/CRText";
import { TealButton } from "../../design/Buttons/TealButton";
import { useShallow } from "zustand/shallow";

interface TourSiteInfoProps {
	route: {
		params: {
			location_id: string;
			name: string;
		};
	};
	navigation: any;
}

interface SimilarPlaceProps {
	image: string;
	name: string;
	onPress?: () => void;
}

const SimilarPlaceCard = ({ image, name, onPress }: SimilarPlaceProps) => {
	return (
		<TouchableOpacity style={styles.similarPlaceCard} onPress={onPress}>
			<Image source={{ uri: image }} style={styles.similarPlaceImage} />
			<Text style={styles.similarPlaceName} numberOfLines={2}>
				{name}
			</Text>
		</TouchableOpacity>
	);
};

export default function TourSiteInfoScreen({
	route,
	navigation,
}: TourSiteInfoProps) {
	const { location_id, name } = route.params;

	const [
		searchTripadvisor,
		tripSearchResults,
		tripSearchLoading,
		tripSearchError,
	] = useCRStore(
		useShallow((state) => [
			state.searchTripadvisor,
			state.tripSearchResults,
			state.tripSearchLoading,
			state.tripSearchError,
		]),
	);
	useEffect(() => {
		if (!tripSearchResults.length) {
			searchTripadvisor("atlanta");
		}
	}, []);

	//useEffect(() => {}, [tripSearchResults, location_id]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [info, setInfo] = useState<TripadvisorLocationDetails>(null);
	const [images, setImages] = useState<TripadvisorImage[]>([]);
	const [similarPlaces, setSimilarPlaces] = useState([
		{
			id: "1",
			name: "Georgia Aquarium",
			image: "https://example.com/aquarium1.jpg",
		},
		{
			id: "2",
			name: "Georgia Aquarium",
			image: "https://example.com/aquarium2.jpg",
		},
		{
			id: "3",
			name: "History Center",
			image: "https://example.com/history.jpg",
		},
	]);

	const getTourSiteInfo = async () => {
		try {
			const result = await getTripadvisorLocationDetails(
				location_id,
				process.env.EXPO_PUBLIC_TRIP_API,
			);
			if (result) {
				setInfo(result);
				const imageResults = await getLocationImages(
					location_id,
					process.env.EXPO_PUBLIC_TRIP_API,
				);
				setImages(imageResults);
			}
		} catch (err) {
			setError("Failed to load tour site info");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (info && info?.location_id !== location_id) {
			getTourSiteInfo();
		} else {
			getTourSiteInfo();
		}
	}, [location_id]);

	if (loading || !info) {
		return <LoadingIndicator loading={loading} error={error} message={name} />;
	}

	return (
		<SafeAreaView
			style={generalStyles.safeArea}
			edges={["right", "left", "bottom"]}
		>
			<View style={styles.container}>
				<FadeUpView delay={300}>
					{/* Main Image */}
					<View style={styles.imageContainer}>
						<Image
							source={{
								uri: images[0]?.url || "https://via.placeholder.com/400x250",
							}}
							style={styles.headerImage}
						/>
					</View>

					{/* Title and Distance */}
					<View style={styles.headerInfo}>
						<Text style={styles.title}>{info.name || name}</Text>
						<Text style={styles.distance}>2 hours away from you</Text>
					</View>

					{/* Description */}
					<View style={styles.descriptionContainer}>
						<Text style={styles.descriptionText}>{info.description}</Text>
					</View>
				</FadeUpView>
				<View style={[generalStyles.generalBottom, { gap: 10 }]}>
					<View style={{ gap: 20 }}>
						<CRText style={styles.sectionTitle}>Sites near you</CRText>
					</View>
					<FlatList
						style={{ padding: 10 }}
						data={tripSearchResults}
						keyExtractor={(item) => item.location_id}
						contentContainerStyle={{ gap: 10 }}
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
						horizontal
						ListEmptyComponent={
							<LoadingIndicator
								loading={tripSearchLoading}
								error={tripSearchError}
								message="Finding interesting sites near you..."
							/>
						}
						showsHorizontalScrollIndicator={false}
					/>
					<TealButton
						title="Vist this place"
						onPress={() => navigation.navigate("tourpackageselection")}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: "center",
		alignItems: "center",
	},
	backButton: {
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 10,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 8,
	},
	imageContainer: {
		borderRadius: 12,
		overflow: "hidden",
		marginHorizontal: 16,
		marginTop: 10,
	},
	headerImage: {
		width: crWidth * 0.9,
		height: 220,
		borderRadius: 12,
	},
	headerInfo: {
		marginHorizontal: 16,
		marginTop: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		fontFamily: "Karla-Bold",
	},
	distance: {
		fontSize: 16,
		color: "#666",
		marginTop: 4,
		fontFamily: "Karla",
	},
	descriptionContainer: {
		marginHorizontal: 16,
		marginTop: 16,
	},
	descriptionText: {
		fontSize: 14,
		lineHeight: 22,
		color: "#555",
		fontFamily: "Karla",
	},
	similarPlacesSection: {
		marginTop: 24,
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "500",
		marginLeft: 16,
		marginBottom: 12,
		color: "#333",
		fontFamily: "Karla-Medium",
	},
	similarPlacesContainer: {
		paddingLeft: 16,
		paddingRight: 8,
	},
	similarPlaceCard: {
		width: 120,
		marginRight: 8,
	},
	similarPlaceImage: {
		width: 120,
		height: 80,
		borderRadius: 8,
	},
	similarPlaceName: {
		fontSize: 12,
		marginTop: 4,
		color: "#666",
		fontFamily: "Karla",
	},
	visitButton: {
		backgroundColor: "#009688",
		paddingVertical: 16,
		borderRadius: 24,
		marginHorizontal: 16,
		marginTop: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	visitButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
		fontFamily: "Karla-Bold",
	},
	bottomIndicator: {
		alignItems: "center",
		marginVertical: 24,
	},
	indicatorLine: {
		width: 40,
		height: 4,
		backgroundColor: "#D0D0D0",
		borderRadius: 2,
	},
});
