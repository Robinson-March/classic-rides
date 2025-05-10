import { View, Text } from "react-native";
import React from "react";
import { FadeUpView } from "../../design/FadeUpView";
import { useCRStore } from "../../../store";
import { CRText } from "../../design/CRText";
import { OutlineButton } from "../../design/Buttons/OutlineButton";
import { generalStyles } from "../../design/shortened/generalStyles";
import { CRColors } from "../../design/shortened/CRColours";
import { tourLength } from "../../utils/static/tourLength";

export default function TourTypeScreen({ navigation }) {
	const { tourPackage, setTourPackage } = useCRStore();
	const handleSelect = (type: "Book Now" | "Schedule Later") => {
		setTourPackage({ tourtype: type });
		navigation.navigate("toursiteslist");
	};
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<FadeUpView
				delay={800}
				style={{ justifyContent: "center", alignItems: "center", gap: 10 }}
			>
				<CRText size={24}>
					{"For " + tourLength[tourPackage?.tourlength].name}
				</CRText>
				<View
					style={{
						gap: 20,
						backgroundColor: "#EAEAEA",
						borderRadius: 20,
						padding: 20,
					}}
				>
					<CRText weight="medium">Select your preference</CRText>
					<OutlineButton
						style={[
							generalStyles.outlineButton,
							{ borderColor: CRColors.accent, backgroundColor: "#fff" },
						]}
						onPress={() => handleSelect("Book Now")}
					>
						<CRText>Book Now</CRText>
					</OutlineButton>
					<OutlineButton
						style={[
							generalStyles.outlineButton,
							{ borderColor: CRColors.accent, backgroundColor: "#fff" },
						]}
						onPress={() => handleSelect("Schedule Later")}
					>
						<CRText>Schedule Later</CRText>
					</OutlineButton>
				</View>
			</FadeUpView>
		</View>
	);
}
