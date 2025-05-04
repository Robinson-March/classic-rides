// components/RideOptionButton.tsx
import type React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
	title: string;
	onPress: () => void;
}

export const RideOptionButton: React.FC<Props> = ({ title, onPress }) => (
	<TouchableOpacity style={styles.button} onPress={onPress}>
		<Text style={styles.text}>{title}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	button: {
		borderRadius: 50,
		alignItems: "center",
		padding: 15,
	},
	text: {
		fontSize: 16,
		fontFamily: "Karla",
		color: "#000",
	},
});
