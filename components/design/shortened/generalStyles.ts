import { StyleSheet } from "react-native";
import { CRColors } from "./CRColours";

export const generalStyles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: CRColors.white,
	},
	image: {
		width: "100%",
		height: 100,
		resizeMode: "cover",
		borderRadius: 20,
	},
});
