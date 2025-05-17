import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	ScrollView,
	Alert,
	InteractionManager,
	BackHandler,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { generalStyles } from "../../design/shortened/generalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeUpView } from "../../design/FadeUpView";
import { CRText } from "../../design/CRText";
import MapCard from "../../design/Cards/MapCard";
import { useCRStore } from "../../../store";
import { crHeight, crWidth } from "../../design/shortened/Dimensions";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { CRColors } from "../../design/shortened/CRColours";
import SoundWave from "../../design/SoundWave";
import * as Speech from "expo-speech";
import { useFocusEffect } from "@react-navigation/native";

export default function ActiveTourScreen({ navigation }) {
	const { tourPackage, tripSearchResults } = useCRStore();
	const [filteredResults, setFilteredResults] = useState(tripSearchResults);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [tourCompleted, setTourCompleted] = useState(false);
	const [countdownSeconds, setCountdownSeconds] = useState(60);
	const [countdownActive, setCountdownActive] = useState(false);

	// Add a ref to track if we're already processing a speech completion
	const speechCompletionProcessingRef = useRef(false);
	const scrollViewRef = useRef(null);
	const countdownTimerRef = useRef(null);

	const icons = [
		{
			id: "instagram",
			component: <AntDesign name="instagram" size={20} color={CRColors.text} />,
		},
		{
			id: "facebook",
			component: (
				<AntDesign name="facebook-square" size={20} color={CRColors.text} />
			),
		},
		{
			id: "snapchat",
			component: (
				<FontAwesome6 name="snapchat" size={20} color={CRColors.text} />
			),
		},
	];
	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				// Instead of going back, navigate to your desired screen:
				Alert.alert("Tour is active", "You cannot change page");
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
	useEffect(() => {
		const task = InteractionManager.runAfterInteractions(() => {
			// Now UI has fully rendered after index change
			console.log("UI updated. Ready for next step.");
			// Trigger next logic like narration, etc.
		});

		return () => task.cancel();
	}, [currentIndex]);

	const speakTour = (index) => {
		if (index >= filteredResults.length) {
			setTourCompleted(true);
			Alert.alert("Tour Completed", "You have visited all sites 🎉");
			return;
		}

		const current = filteredResults[index];
		if (!current?.description) return;

		setIsSpeaking(true);
		speechCompletionProcessingRef.current = false;

		Speech.speak(current.description, {
			rate: 0.95,
			pitch: 1.1,
			onDone: () => {
				// Prevent duplicate processing of speech completion
				if (speechCompletionProcessingRef.current) return;
				speechCompletionProcessingRef.current = true;

				setIsSpeaking(false);
			},
			onStopped: () => {
				setIsSpeaking(false);
			},
			onError: () => {
				setIsSpeaking(false);
				Alert.alert("Speech Error", "An error occurred during narration.");
			},
		});
	};

	// Start 1-minute countdown
	const startCountdown = () => {
		setCountdownSeconds(10);
		setCountdownActive(true);

		// Clear any existing timer
		if (countdownTimerRef.current) {
			clearInterval(countdownTimerRef.current);
		}

		countdownTimerRef.current = setInterval(() => {
			setCountdownSeconds((prev) => {
				if (prev <= 1) {
					stopCountdown();
					setCurrentIndex((prevIndex) => {
						const nextIndex = prevIndex + 1;
						if (nextIndex >= filteredResults.length) {
							setTourCompleted(true);
							//Alert.alert("Tour Completed", "You have visited all sites 🎉");
							return prevIndex; // Keep the last index if we've reached the end
						}
						return nextIndex;
					});
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	// Stop countdown
	const stopCountdown = () => {
		setCountdownActive(false);
		if (countdownTimerRef.current) {
			clearInterval(countdownTimerRef.current);
			countdownTimerRef.current = null;
		}
	};

	// Format seconds to mm:ss
	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
	};

	// Stop current narration
	const stopSpeaking = () => {
		if (isSpeaking) {
			Speech.stop();
			setIsSpeaking(false);
		}
	};

	// Skip to next site
	const skipToNext = () => {
		stopSpeaking();
		if (currentIndex < filteredResults.length - 1) {
			setCurrentIndex((prevIndex) => prevIndex + 1);
		} else {
			setTourCompleted(true);
			//Alert.alert("Tour Completed", "You have visited all sites 🎉");
		}
	};

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

		// Reset tour state when results change
		setCurrentIndex(0);
		setTourCompleted(false);
		stopSpeaking();
	}, [tourPackage?.tourlength, tripSearchResults]);

	useEffect(() => {
		// Clear any existing speech when the index changes
		stopSpeaking();

		// Reset the speech completion processing flag
		speechCompletionProcessingRef.current = false;

		// Start new speech for the current index
		if (
			filteredResults.length &&
			currentIndex < filteredResults.length &&
			!tourCompleted
		) {
			// Short delay to ensure cleanup from previous speech is complete
			const timer = setTimeout(() => {
				speakTour(currentIndex);
			}, 100);

			return () => clearTimeout(timer);
		}
	}, [currentIndex, filteredResults.length]);

	useEffect(() => {
		return () => {
			stopSpeaking();
			stopCountdown();
		};
	}, []);

	// Start the countdown when the component mounts and reset when index changes
	useEffect(() => {
		startCountdown();

		return () => {
			stopCountdown();
		};
	}, [currentIndex]);

	const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_MAP_API;

	// Safety check to prevent out-of-bounds access
	const currentSite =
		currentIndex < filteredResults.length
			? filteredResults[currentIndex]
			: filteredResults[filteredResults.length - 1] || {};

	// If no results are available
	if (filteredResults.length === 0) {
		return (
			<SafeAreaView
				style={generalStyles.safeArea}
				edges={["right", "left", "bottom"]}
			>
				<View
					style={[
						generalStyles.container,
						{ alignItems: "center", justifyContent: "center" },
					]}
				>
					<CRText size={20}>No tour sites available</CRText>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView
			style={generalStyles.safeArea}
			edges={["right", "left", "bottom"]}
		>
			<View
				style={[
					generalStyles.container,
					{
						width: "90%",
						backgroundColor: CRColors.white,
						justifyContent: "center",
						alignSelf: "center",
					},
				]}
			>
				<FadeUpView delay={300}>
					<ScrollView
						ref={scrollViewRef}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: 200,
							width: "100%",
							gap: 20,
							marginTop: 20,
						}}
					>
						<CRText size={20} style={{ textAlign: "center" }}>
							Currently at {currentSite?.name || "Unknown Location"}
						</CRText>

						<View style={{ width: "100%" }}>
							<MapCard
								title="Current location"
								hideText={true}
								width={"100%"}
								height={crHeight * 0.15}
								googleMapsApiKey={GOOGLE_MAPS_API_KEY}
							/>
						</View>

						<View style={styles.imageContainer}>
							<Image
								source={{
									uri:
										currentSite?.image || "https://via.placeholder.com/400x250",
								}}
								style={styles.headerImage}
							/>
						</View>

						<View
							style={{
								backgroundColor: "#f0f0f0",
								padding: 20,
								borderRadius: 20,
								gap: 30,
							}}
						>
							<View style={{ gap: 10 }}>
								<CRText font="Karla" weight="medium">
									Share about {currentSite?.name || "this place"}
								</CRText>
								<View
									style={{
										flexDirection: "row",
										gap: 10,
										alignItems: "center",
									}}
								>
									{icons.map((icon) => (
										<TouchableOpacity
											key={icon.id}
											onPress={() => console.log(`${icon.id} pressed`)}
										>
											{icon.component}
										</TouchableOpacity>
									))}
								</View>
							</View>
						</View>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								marginBottom: 10,
								paddingBottom: 5,
								borderBottomWidth: 1,
								borderBottomColor: CRColors.tintAccent,
							}}
						>
							<CRText>{`${currentSite?.name || "Unknown"} (1 minute)`}</CRText>
							<SoundWave isSpeaking={isSpeaking} />
						</View>

						<View>
							<CRText style={styles.descriptionText}>
								{currentSite?.description || "No description available."}
							</CRText>
						</View>

						{/* Controls for manual navigation */}
						<View style={styles.controlContainer}>
							{isSpeaking ? (
								<TouchableOpacity
									style={styles.controlButton}
									onPress={stopSpeaking}
								>
									<AntDesign
										name="pausecircle"
										size={24}
										color={CRColors.text}
									/>
									<CRText>Pause</CRText>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									style={styles.controlButton}
									onPress={() => speakTour(currentIndex)}
									disabled={tourCompleted}
								>
									<AntDesign
										name="playcircleo"
										size={24}
										color={tourCompleted ? CRColors.tintAccent : CRColors.text}
									/>
									<CRText>Play</CRText>
								</TouchableOpacity>
							)}

							<TouchableOpacity
								style={styles.controlButton}
								onPress={skipToNext}
								disabled={
									currentIndex >= filteredResults.length - 1 || tourCompleted
								}
							>
								<AntDesign
									name="stepforward"
									size={24}
									color={
										currentIndex >= filteredResults.length - 1 || tourCompleted
											? CRColors.tintAccent
											: CRColors.text
									}
								/>
								<CRText>Skip</CRText>
							</TouchableOpacity>
						</View>
					</ScrollView>

					<View
						style={{
							backgroundColor: CRColors.white,
							width: "100%",
							padding: 20,
							borderRadius: 20,
							position: "absolute",
							bottom: 0,
						}}
					>
						<TouchableOpacity
							onPress={() =>
								tourCompleted && navigation.navigate("tourcompleted")
							}
						>
							<View
								style={{
									backgroundColor: CRColors.tintAccent,
									alignItems: "center",
									padding: 20,
									borderRadius: 20,
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<CRText style={{ textAlign: "center" }}>
									{tourCompleted
										? "Tour completed! 🎉"
										: `${Math.max(0, filteredResults.length - (currentIndex + 1))} site(s) to go (${Math.max(0, filteredResults.length - (currentIndex + 1)) * 1} minute(s))`}
								</CRText>

								{countdownActive && (
									<View style={styles.countdownContainer}>
										<CRText weight="medium" style={styles.countdownText}>
											{`  ${formatTime(countdownSeconds)}`}
										</CRText>
									</View>
								)}
							</View>
						</TouchableOpacity>
					</View>
				</FadeUpView>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		borderRadius: 12,
		overflow: "hidden",
		marginTop: 10,
		width: "100%",
	},
	headerImage: {
		width: "100%",
		height: 220,
		borderRadius: 12,
	},
	controlContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		padding: 10,
		backgroundColor: "#f9f9f9",
		borderRadius: 10,
	},
	controlButton: {
		alignItems: "center",
		padding: 10,
	},
	descriptionText: {
		lineHeight: 30,
		marginBottom: 10,
	},
	countdownContainer: {
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		borderRadius: 6,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	countdownText: {
		color: CRColors.text,
	},
});
