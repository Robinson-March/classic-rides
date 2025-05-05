import type React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { CRText } from "./CRText";
import { CRColors } from "./shortened/CRColours";

type LoadingIndicatorProps = {
	loading: boolean;
	error?: string | null;
	message?: string;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
	loading,
	error,
	message = "Loading...",
}) => {
	if (loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#666" />
				<CRText>{message}</CRText>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.container}>
				<CRText style={styles.errorText}>Error: {error}</CRText>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<CRText>No data available.</CRText>
		</View>
	);
};

export default LoadingIndicator;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		marginTop: 10,
		fontSize: 14,
		color: "#555",
	},
	errorText: {
		//fontSize: 14,
		color: CRColors.red,
		//textAlign: "center",
	},
});
