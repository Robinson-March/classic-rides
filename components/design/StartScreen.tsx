import React, { useEffect, useRef } from "react";
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Animated,
	type ImageSourcePropType,
	Dimensions,
} from "react-native";
import { CRText } from "./CRText";

const IMAGES: { src: ImageSourcePropType; name: string }[] = [
	{
		src: require("../../assets/images/places/mercedes.png"),
		name: "Mercedes Stadium",
	},
	{
		src: require("../../assets/images/places/cola.png"),
		name: "World of Coca-Cola",
	},
	{
		src: require("../../assets/images/places/botanical.png"),
		name: "Botanical Garden",
	},
	{
		src: require("../../assets/images/places/aquarium.png"),
		name: "Georgia Aquarium",
	},
	{
		src: require("../../assets/images/places/centennial.png"),
		name: "Centennial Park",
	},
	{
		src: require("../../assets/images/places/mercedes.png"),
		name: "Another Ride",
	},
];

export default function StartScreen({ navigation }) {
	const animations = useRef(IMAGES.map(() => new Animated.Value(0))).current;

	useEffect(() => {
		Animated.stagger(
			100,
			animations.map((anim) =>
				Animated.spring(anim, {
					toValue: 1,
					useNativeDriver: true,
				}),
			),
		).start();
	}, [animations]);

	const getTiltStyle = (index: number) => {
		const anim = animations[index];
		const direction = index % 2 === 0 ? 1 : -1;

		return {
			transform: [
				{
					rotate: anim.interpolate({
						inputRange: [0, 1],
						outputRange: ["0deg", `${direction * index * 6}deg`],
					}),
				},
				{
					translateY: anim.interpolate({
						inputRange: [0, 1],
						outputRange: [index * 12, 0],
					}),
				},
				{
					scale: anim.interpolate({
						inputRange: [0, 1],
						outputRange: [0.95, 1],
					}),
				},
			],
		};
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ position: "relative", top: 70 }}>
				<CRText weight="bold" style={styles.title}>
					Exceptional Tour Experience
				</CRText>
				<CRText style={styles.subtitle}>With Classic Rides</CRText>
			</View>

			<View style={styles.cardStack}>
				{IMAGES.map((item, index) => (
					<Animated.View
						key={index}
						style={[
							styles.card,
							getTiltStyle(index),
							{ zIndex: IMAGES.length - index },
						]}
					>
						<Image source={item.src} style={styles.cardImage} />
						<CRText style={styles.cardLabel}>{item.name}</CRText>
					</Animated.View>
				))}
			</View>

			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate("login")}
			>
				<CRText style={styles.buttonText}>Continue</CRText>
			</TouchableOpacity>
		</SafeAreaView>
	);
}
const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.5;
const CARD_HEIGHT = height * 0.23;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
		alignItems: "center",
		backgroundColor: "#fff",
		justifyContent: "space-between",
		paddingBottom: 40,
	},
	title: {
		fontSize: 20,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		color: "#333",
		marginTop: 4,
		textAlign: "center",
	},
	cardStack: {
		alignItems: "center",
		justifyContent: "center",
		height: 300,
		position: "relative",
	},
	card: {
		position: "absolute",
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		borderRadius: 16,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 10,
		elevation: 5,
		overflow: "hidden",
		padding: 10,
	},
	cardImage: {
		width: "100%",
		height: 120,
		borderRadius: 20,
	},
	cardLabel: {
		padding: 10,
		fontSize: 14,
		textAlign: "left",
	},
	button: {
		backgroundColor: "#008080",
		paddingVertical: 14,
		paddingHorizontal: 80,
		borderRadius: 30,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
});
