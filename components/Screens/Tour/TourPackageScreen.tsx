import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated, { FadeInUp } from "react-native-reanimated";
import { CRText } from "../../design/CRText";
import { OutlineButton } from "../../design/Buttons/OutlineButton";
import { crWidth } from "../../design/shortened/Dimensions";
import { FadeUpView } from "../../design/FadeUpView";
import { useCRStore } from "../../../store";
import { tourLength } from "../../utils/static/tourLength";

export default function TourPackageScreen({navigation}) {
	const {setTourPackage}=useCRStore()
	const handleSelect =(length:number)=>{
setTourPackage({tourlength:length})
navigation.navigate('tourtype')
	}
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<FadeUpView
				delay={800}
				style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
			>
				<CRText>Please Select length of tour</CRText>
				<View style={{ gap: 20 }}>
					<OutlineButton style={styles.button} onPress={() => handleSelect(0)}>
						<CRText>90 miuntues Alanta Tour</CRText>
					</OutlineButton>
					<OutlineButton style={styles.button} onPress={() => handleSelect(1)}>
						<CRText>3 hours Experience Tour</CRText>
					</OutlineButton>
					<OutlineButton style={styles.button} onPress={() => handleSelect(2)}>
						<CRText style={{ textAlign: "center" }}>
							6 hours Key To The City {"\n"}Experience Tour
						</CRText>
					</OutlineButton>
					<OutlineButton style={styles.button} onPress={() => handleSelect(3)}>
						<CRText>Gift a ride</CRText>
					</OutlineButton>
				</View>
			</FadeUpView>
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
