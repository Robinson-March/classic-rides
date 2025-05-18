// components/CardStack.tsx
import React, { useEffect, useRef } from "react";
import {
	Animated,
	StyleSheet,
	View,
	Image,
	Dimensions,
	type ImageSourcePropType,
} from "react-native";
import { CRText } from "../CRText";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.5;
const CARD_HEIGHT = height * 0.23;

export type CardItem = {
	src: ImageSourcePropType;
	name: string;
};

interface CardStackProps {
	data: CardItem[];
}

export const CardStack: React.FC<CardStackProps> = ({ data }) => {
	const animations = useRef(data.map(() => new Animated.Value(0))).current;

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
		<View style={styles.cardStack}>
			{data.map((item, index) => (
				<Animated.View
					key={index}
					style={[
						styles.card,
						getTiltStyle(index),
						{ zIndex: data.length - index },
					]}
				>
					<Image source={item.src} style={styles.cardImage} />
					<CRText style={styles.cardLabel}>{item.name}</CRText>
				</Animated.View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
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
});
