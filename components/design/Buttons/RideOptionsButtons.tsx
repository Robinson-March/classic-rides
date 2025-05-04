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
		borderRadius: 16,
		borderColor: "#D3D3D3",
		borderWidth: 1,
		paddingVertical: 18,
		paddingHorizontal: 20,
		marginVertical: 10,
		alignItems: "center",
		backgroundColor: "#fff",
		elevation: 2,
	},
	text: {
		fontSize: 16,
		fontFamily: "Karla",
		color: "#000",
	},
});
