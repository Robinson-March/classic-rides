// components/OutlineButton.tsx
import type React from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	type ViewStyle,
} from "react-native";

interface Props {
	children: React.ReactNode;
	onPress: () => void;
	style?: ViewStyle;
}

export const OutlineButton: React.FC<Props> = ({
	children,
	onPress,
	style,
}) => (
	<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
		{children}
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	button: {
		borderRadius: 50,
		alignItems: "center",
		padding: 15,
	},
	text: {
		color: "#007F7F",
		fontFamily: "Karla",
		fontSize: 16,
	},
});
