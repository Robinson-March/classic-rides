// components/Divider.tsx

import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = () => {
	return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
	divider: {
		height: StyleSheet.hairlineWidth, // very thin
		width: "100%",
		backgroundColor: "#D1D5DB", // light gray (Tailwind's gray-300)
		marginVertical: 8,
	},
});

export default Divider;
