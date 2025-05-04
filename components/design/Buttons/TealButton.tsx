// components/PrimaryButton.tsx
import type React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	type ViewStyle,
} from "react-native";

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
	},
	text: {
		color: "#fff",
		fontFamily: "Jura-Bold",
		fontSize: 16,
	},
});
