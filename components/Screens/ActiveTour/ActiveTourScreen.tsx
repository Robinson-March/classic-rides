import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Image,
	ScrollView,
	Alert,
	findNodeHandle,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
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

export default function ActiveTourScreen() {
	const { tourPackage, tripSearchResults } = useCRStore();
	const [filteredResults, setFilteredResults] = useState(tripSearchResults);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [tourCompleted, setTourCompleted] = useState(false);
	const [highlightedText, setHighlightedText] = useState("");
	const [currentPosition, setCurrentPosition] = useState(0);

	const scrollViewRef = useRef<ScrollView>(null);
	const textContainerRef = useRef<View>(null);

	const icons = [
		{
			id: "instagram",
			component: <AntDesign name="instagram" size={24} color={CRColors.text} />,
		},
		{
			id: "facebook",
			component: (
				<AntDesign name="facebook-square" size={24} color={CRColors.text} />
			),
		},
		{
			id: "snapchat",
			component: (
				<FontAwesome6 name="snapchat" size={24} color={CRColors.text} />
			),
		},
	];

	const speakTour = (index: number) => {
		if (index >= filteredResults.length) {
			setTourCompleted(true);
			Alert.alert("Tour Completed", "You have visited all sites 🎉");
			return;
		}

		const current = filteredResults[index];
		if (!current?.description) return;

		setIsSpeaking(true);

		// Break description into sentences to highlight while speaking
		const sentences = current.description.match(/[^.!?]+[.!?]+/g) || [
			current.description,
		];
		let currentSentenceIndex = 0;

		// Set initial highlight
		if (sentences.length > 0) {
			setHighlightedText(sentences[0].trim());
			setCurrentPosition(0);
		}

		Speech.speak(current.description, {
			rate: 0.95,
			pitch: 1.1,
			onDone: () => {
				setIsSpeaking(false);
				setHighlightedText("");
				setTimeout(() => {
					setCurrentIndex((prevIndex) => {
						const nextIndex = prevIndex + 1;
						if (nextIndex >= filteredResults.length) {
							setTourCompleted(true);
							Alert.alert("Tour Completed", "You have visited all sites 🎉");
							return prevIndex; // Keep the last index if we've reached the end
						}
						return nextIndex;
					});
				}, 60000); // Wait 1 minute before next, reduce for testing
			},
			onStopped: () => {
				setIsSpeaking(false);
				setHighlightedText("");
			},
			onError: () => {
				setIsSpeaking(false);
				setHighlightedText("");
				Alert.alert("Speech Error", "An error occurred during narration.");
			},
			// Track speech progress and update highlighted text
			onBoundary: (event) => {
				// This event fires when speech reaches word or sentence boundaries
				if (event.type === "word" && event.utterance && sentences.length > 0) {
					const wordPosition = event.charIndex;

					// Find which sentence we're currently in based on character position
					let totalLength = 0;
					let foundSentenceIndex = 0;

					for (let i = 0; i < sentences.length; i++) {
						totalLength += sentences[i].length;
						if (wordPosition < totalLength) {
							foundSentenceIndex = i;
							break;
						}
					}

					// Only update if we've moved to a new sentence
					if (foundSentenceIndex !== currentSentenceIndex) {
						currentSentenceIndex = foundSentenceIndex;
						setHighlightedText(sentences[currentSentenceIndex].trim());
						setCurrentPosition(currentSentenceIndex);

						// Scroll to the highlighted text
						scrollToHighlightedText();
					}
				}
			},
		});
	};

	const scrollToHighlightedText = () => {
		if (textContainerRef.current && scrollViewRef.current) {
			const node = findNodeHandle(textContainerRef.current);
			if (node) {
				// This will make the ScrollView scroll to the referenced View
				scrollViewRef.current.scrollTo({
					y: currentPosition * 30, // Approximate line height
					animated: true,
				});
			}
		}
	};

	// Stop current narration
	const stopSpeaking = () => {
		if (isSpeaking) {
			Speech.stop();
			setIsSpeaking(false);
			setHighlightedText("");
		}
	};

	// Skip to next site
	const skipToNext = () => {
		stopSpeaking();
		if (currentIndex < filteredResults.length - 1) {
			setCurrentIndex((prevIndex) => prevIndex + 1);
		} else {
			setTourCompleted(true);
			Alert.alert("Tour Completed", "You have visited all sites 🎉");
		}
	};

	useEffect(() => {
		if (!tripSearchResults.length || tourPackage?.tourlength == null) return;

		const lengthPercentMap = {
			0: 0.3,
			1: 0.5,
			2: 0.75,
			3: 1,
		} as const;

		const percent =
			lengthPercentMap[tourPackage.tourlength as 0 | 1 | 2 | 3] ?? 1;
		const count = Math.ceil(tripSearchResults.length * percent);
		const slicedResults = tripSearchResults.slice(0, count);

		setFilteredResults(slicedResults);

		// Reset tour state when results change
		setCurrentIndex(0);
		setTourCompleted(false);
		stopSpeaking();
	}, [tourPackage?.tourlength, tripSearchResults]);

	useEffect(() => {
		if (
			filteredResults.length &&
			currentIndex < filteredResults.length &&
			!tourCompleted
		) {
			speakTour(currentIndex);
		}

		// Cleanup function to stop speech when component unmounts or currentIndex changes
		return () => {
			stopSpeaking();
		};
	}, [currentIndex, filteredResults.length]);

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
					<CRText size={18}>No tour sites available</CRText>
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
							<View style={{ gap: 20 }}>
								<CRText font="Karla" weight="medium" size={20}>
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
								borderBottomColor: CRColors.lightGrey,
							}}
						>
							<CRText>{`${currentSite?.name || "Unknown"} (1 minute)`}</CRText>
							<SoundWave isSpeaking={isSpeaking} />
						</View>

						<View ref={textContainerRef}>
							{currentSite?.description
								?.split(/([.!?]+)/)
								.map((segment, index) => {
									// Join each sentence with its punctuation
									if (
										index % 2 === 0 &&
										index < currentSite.description.split(/([.!?]+)/).length - 1
									) {
										const sentence =
											segment +
											currentSite.description.split(/([.!?]+)/)[index + 1];
										const isHighlighted =
											highlightedText && sentence.includes(highlightedText);

										return (
											<CRText
												key={index}
												font="Karla"
												style={[
													styles.descriptionText,
													isHighlighted && styles.highlightedText,
												]}
											>
												{sentence}
											</CRText>
										);
									} else if (index % 2 !== 0) {
										// Skip punctuation items as they're joined with the previous segment
										return null;
									} else {
										// Handle the last segment if it doesn't have punctuation
										return (
											<CRText
												key={index}
												font="Karla"
												style={[
													styles.descriptionText,
													highlightedText &&
														segment.includes(highlightedText) &&
														styles.highlightedText,
												]}
											>
												{segment}
											</CRText>
										);
									}
								})}
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
										color={tourCompleted ? CRColors.lightGrey : CRColors.text}
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
											? CRColors.lightGrey
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
						<View
							style={{
								backgroundColor: CRColors.tintAccent,
								alignItems: "center",
								padding: 20,
								borderRadius: 20,
							}}
						>
							<CRText>
								{tourCompleted
									? "Tour completed! 🎉"
									: `${Math.max(0, filteredResults.length - (currentIndex + 1))} site(s) to go (${Math.max(0, filteredResults.length - (currentIndex + 1)) * 1} minute(s))`}
							</CRText>
						</View>
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
	highlightedText: {
		backgroundColor: CRColors.tintAccent,
		fontWeight: "bold",
		borderRadius: 5,
		padding: 2,
	},
});
