import { View, Text } from "react-native";
import React from "react";
import { CRText } from "./components/design/CRText";

export default function Home() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<CRText>Home</CRText>
		</View>
	);
}
