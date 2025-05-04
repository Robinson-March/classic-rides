// components/OutlineButton.tsx
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

export const OutlineButton: React.FC<Props> = ({ title, onPress, style }) => (
	<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
		<Text style={styles.text}>{title}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		borderColor: "#007F7F",
		borderRadius: 25,
		paddingVertical: 14,
		alignItems: "center",
		marginVertical: 8,
	},
	text: {
		color: "#007F7F",
		fontFamily: "Karla",
		fontSize: 16,
	},
});
