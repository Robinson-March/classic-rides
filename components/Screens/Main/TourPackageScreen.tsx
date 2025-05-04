import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import { CRText } from "../../design/CRText";
import { OutlineButton } from "../../design/Buttons/OutlineButton";
import { crWidth } from "../../design/shortened/Dimensions";

export default function TourPackageScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Animated.View
				style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
				entering={FadeInUp.duration(500).delay(100)}
			>
				<CRText>Please Select length of tour</CRText>
				<View style={{ gap: 20 }}>
					<OutlineButton style={styles.button} onPress={() => {}}>
						<CRText>90 miuntues Alanta Tour</CRText>
					</OutlineButton>
					<OutlineButton style={styles.button} onPress={() => {}}>
						<CRText>3 hours Experience Tour</CRText>
					</OutlineButton>
					<OutlineButton style={styles.button} onPress={() => {}}>
						<CRText style={{ textAlign: "center" }}>
							6 hours Key To The City {"\n"}Experience Tour
						</CRText>
					</OutlineButton>
					<OutlineButton style={styles.button} onPress={() => {}}>
						<CRText>Gift a ride</CRText>
					</OutlineButton>
				</View>
			</Animated.View>
		</View>
	);
}
const styles = StyleSheet.create({
	button: {
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
