import type React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	type ImageSourcePropType,
	Dimensions,
} from "react-native";
import { CRText } from "../CRText";

// Get screen width for responsive sizing
const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 16px padding on each side and 16px between cards

interface TourCardProps {
	image: ImageSourcePropType;
	title: string;
	description?: string;
	time?: string;
	price?: string;
	onPress?: () => void;
}

const TourCard: React.FC<TourCardProps> = ({
	image,
	title,
	description,
	time,
	price,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}
			activeOpacity={0.9}
		>
			<View style={styles.imageContainer}>
				<Image source={{ uri: image }} style={styles.image} />
				<CRText font="Karla" weight="light" style={styles.title}>
					{title}
				</CRText>
				{description && (
					<CRText style={styles.description}>{description}</CRText>
				)}
				{time && price && (
					<View style={styles.detailsContainer}>
						{time && <CRText style={styles.time}>{time}</CRText>}
						{price && <CRText style={styles.price}>{price}</CRText>}
					</View>
				)}
			</View>
			{/* <View style={styles.contentContainer}>
				<CRText font="Karla" weight="light" style={styles.title}>
					{title}
				</CRText>
				{description && (
					<CRText style={styles.description}>{description}</CRText>
				)}
				{time && price && (
					<View style={styles.detailsContainer}>
						{time && <CRText style={styles.time}>{time}</CRText>}
						{price && <CRText style={styles.price}>{price}</CRText>}
					</View>
				)}
			</View> */}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: cardWidth,
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 50,
		elevation: 20,
		gap: 5,
	},
	imageContainer: {
		width: "100%",
		height: "auto", // Aspect ratio 5:3
		padding: 10,
		gap: 5,
	},
	image: {
		width: "100%",
		height: 100,
		resizeMode: "cover",
		borderRadius: 20,
	},
	contentContainer: {
		padding: 12,
	},
	title: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333333",
	},
	description: {
		fontSize: 12,
		color: "#666666",
	},
	detailsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	time: {
		fontSize: 12,
		color: "#888888",
	},
	price: {
		fontSize: 14,
		fontWeight: "600",
		color: "#009688",
	},
});

export default TourCard;
