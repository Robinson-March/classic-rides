// components/PrimaryButton.tsx
import type React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	type ViewStyle,
} from "react-native";
import { crWidth } from "../shortened/Dimensions";

interface Props {
	title: string;
	onPress: () => void;
	style?: ViewStyle;
}

export const TealButton: React.FC<Props> = ({ title, onPress, style }) => (
	<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
		<Text style={styles.text}>{title}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#008080",
		borderRadius: 50,
		alignItems: "center",
		padding: 15,
		maxWidth: crWidth * 0.9,
		alignSelf: "center",
		width: crWidth * 0.9,
	},
	text: {
		color: "#fff",
		fontFamily: "Jura-Bold",
		fontSize: 16,
	},
});
