import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import { CRText } from "../../design/CRText";
import { OutlineButton } from "../../design/Buttons/OutlineButton";
import { crWidth } from "../../design/shortened/Dimensions";
import { FadeUpView } from "../../design/FadeUpView";
import { useCRStore } from "../../../store";
import { tourLength } from "../../utils/static/tourLength";
import { CRColors } from "../../design/shortened/CRColours";

export default function TourPackageScreen({ navigation }) {
	const { setTourPackage } = useCRStore();
	const handleSelect = (length: number) => {
		setTourPackage({ tourlength: length });
		navigation.navigate("tourtype");
	};
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<FadeUpView
				delay={800}
				style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
			>
				<CRText>Please Select length of tour</CRText>

				<View style={{ gap: 20 }}>
					{tourLength.map((tour, index) => (
						<OutlineButton
							style={styles.button}
							onPress={() => handleSelect(index)}
							key={index}
						>
							<CRText font="Jura" size={18}>
								{tour.name}
							</CRText>
							<CRText font="Karla">accommodates {tour.accommodates}</CRText>
							<CRText
								style={{ color: CRColors.accent }}
								font="Karla"
								weight="bold"
							>
								${tour.price}
							</CRText>
						</OutlineButton>
					))}
				</View>
			</FadeUpView>
		</View>
	);
}
const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		borderColor: "#404040",
		alignItems: "flex-start",
		justifyContent: "center",
		textAlign: "center",
		paddingVertical: 10,
		paddingHorizontal: 20,
		width: crWidth * 0.8,
		borderRadius: 30,
	},
});
