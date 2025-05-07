import { StyleSheet } from "react-native";
import { CRColors } from "./CRColours";
import { crWidth } from "./Dimensions";

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
	generalBottom: {
		position: "absolute",
		bottom: 10,
	},
	outlineButton: {
			borderWidth: 1,
			borderColor: "#404040",
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
			padding: 20,
			width: crWidth * 0.8,
			borderRadius: 20,
		},
});
