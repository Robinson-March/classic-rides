import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { generalStyles } from "../../design/shortened/generalStyles";
import { CRColors } from "../../design/shortened/CRColours";
import { FadeUpView } from "../../design/FadeUpView";
import { ScrollView } from "react-native-gesture-handler";
import { CRText } from "../../design/CRText";
import MapCard from "../../design/Cards/MapCard";
import { crHeight } from "../../design/shortened/Dimensions";
import { useCRStore } from "../../../store";
import { AntDesign, Feather } from "@expo/vector-icons";
import Divider from "../../design/Divider";
import InputField from "../../design/InputField";
import { useFocusEffect } from "@react-navigation/native";

export default function CompletedTourScreen({ navigation }) {
	const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_MAP_API;
	const { tourPackage, tripSearchResults } = useCRStore();
	const [filteredResults, setFilteredResults] = useState(tripSearchResults);
	const [rating, setRating] = useState(0);
	const [reviewText, setReviewText] = useState("");

	useEffect(() => {
		if (!tripSearchResults.length || tourPackage?.tourlength == null) return;

		const lengthPercentMap = {
			0: 0.3,
			1: 0.5,
			2: 0.75,
			3: 1,
		};

		const percent = lengthPercentMap[tourPackage.tourlength] ?? 1;
		const count = Math.ceil(tripSearchResults.length * percent);
		const slicedResults = tripSearchResults.slice(0, count);

		setFilteredResults(slicedResults);
	}, [tourPackage?.tourlength, tripSearchResults]);

	// Function to handle link press (can add actual navigation if needed)
	const handleLinkPress = (url: string) => {
		// You can use Linking.openURL(url) if you want to open in browser
		console.log("Link pressed:", url);
	};
	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				// Instead of going back, navigate to your desired screen:
				navigation.navigate("home");
				// Return true to prevent default back behavior
				return true;
			};

			const subscription = BackHandler.addEventListener(
				"hardwareBackPress",
				onBackPress,
			);

			return () => subscription.remove();
		}, [navigation]),
	);

	return (
		<SafeAreaView
			style={generalStyles.safeArea}
			edges={["right", "left", "bottom"]}
		>
			<View
				style={[
					generalStyles.container,
					{
						width: "100%",
						backgroundColor: CRColors.white,
						justifyContent: "center",
						alignSelf: "center",
						padding: 20,
					},
				]}
			>
				<FadeUpView delay={300}>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: 200,
							width: "100%",
							gap: 20,
							marginTop: 20,
						}}
					>
						<View style={{ width: "100%", flex: 1, gap: 20 }}>
							<View style={{ width: "100%", gap: 20 }}>
								<MapCard
									title="Current location"
									hideText={true}
									width={"100%"}
									height={crHeight * 0.15}
									googleMapsApiKey={GOOGLE_MAPS_API_KEY}
								/>
								<CRText size={30}>Awesome Tour 🎉🎉🎉</CRText>
							</View>
							<View style={{ gap: 20 }}>
								<CRText size={20}>Tour Hightlights</CRText>
								<View style={{ gap: 10 }}>
									{filteredResults.map((result) => (
										<View
											key={result.location_id}
											style={{
												flexDirection: "row",
												alignItems: "center",
												gap: 10,
											}}
										>
											<AntDesign
												name="staro"
												size={18}
												color={CRColors.yellow}
											/>
											<CRText font="Karla">{result.name}</CRText>
										</View>
									))}
								</View>
							</View>
							<Divider />
							<View style={{ gap: 20 }}>
								<View>
									<CRText size={16} style={{ fontWeight: "600" }}>
										Post Ride Feedback:
									</CRText>

									{/* Wrap links with TouchableOpacity and underline */}
									<TouchableOpacity
										onPress={() => handleLinkPress("https://booktour.example")}
									>
										<CRText
											size={14}
											color={CRColors.accent}
											style={{ textDecorationLine: "underline" }}
										>
											Book another tour
										</CRText>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() =>
											handleLinkPress("https://referfriend.example")
										}
									>
										<CRText
											size={14}
											color={CRColors.accent}
											style={{ textDecorationLine: "underline" }}
										>
											Refer a friend
										</CRText>
									</TouchableOpacity>
								</View>

								<View>
									<CRText size={16} style={{ fontWeight: "600" }}>
										Merchandise Upsell Post-Ride:
									</CRText>
									<CRText size={14}>
										Want a keepsake? Grab a Classic ride keychain or T-shirt!
									</CRText>

									<TouchableOpacity
										onPress={() =>
											handleLinkPress("https://classicridesa1.com/shop/")
										}
									>
										<CRText
											size={14}
											color={CRColors.accent}
											style={{ textDecorationLine: "underline" }}
										>
											https://classicridesa1.com/shop/
										</CRText>
									</TouchableOpacity>
								</View>

								<View>
									<CRText size={16} style={{ fontWeight: "600" }}>
										Loyalty Program Invitation:
									</CRText>

									<TouchableOpacity
										onPress={() =>
											handleLinkPress("https://vintageridersclub.example")
										}
									>
										<CRText
											size={14}
											color={CRColors.accent}
											style={{ textDecorationLine: "underline" }}
										>
											Join our Vintage Riders Club for exclusive discounts
										</CRText>
									</TouchableOpacity>
								</View>

								<Divider />
								<View style={{ gap: 20 }}>
									<View style={{ gap: 10 }}>
										<CRText size={16}>Rate this tour</CRText>
										<View
											style={{
												flexDirection: "row",
												gap: 5,
												marginVertical: 5,
											}}
										>
											{[...Array(5)].map((_, index) => (
												<TouchableOpacity
													key={index}
													onPress={() => setRating(index + 1)}
												>
													<AntDesign
														name={index < rating ? "star" : "staro"}
														size={20}
														color={CRColors.yellow}
													/>
												</TouchableOpacity>
											))}
										</View>
									</View>

									<View
										style={{
											gap: 10,
											width: "100%",
										}}
									>
										<CRText size={14}>Please leave a review</CRText>

										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<InputField
												style={{ width: "90%" }}
												placeholder="Best tour ever"
												value={reviewText}
												onChangeText={(text: string): void => {
													setReviewText(text);
												}}
											/>

											<TouchableOpacity
												onPress={() => {
													// Submit review logic here
													console.log("Review submitted:", {
														rating,
														reviewText,
													});
													// Clear input after submission:
													setReviewText("");
													setRating(0);
												}}
											>
												<Feather name="send" size={20} color={CRColors.text} />
											</TouchableOpacity>
										</View>
									</View>
								</View>
							</View>
						</View>
					</ScrollView>
				</FadeUpView>
			</View>
		</SafeAreaView>
	);
}
