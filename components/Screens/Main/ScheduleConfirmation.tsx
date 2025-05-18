import { View, Text, ImageSourcePropType } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { generalStyles } from "../../design/shortened/generalStyles";
import { FadeUpView } from "../../design/FadeUpView";
import { TealButton } from "../../design/Buttons/TealButton";

import dayjs from "dayjs";
import { CardStack } from "../../design/Cards/CardStacl";
import { useCRStore } from "../../../store";
import { CRText } from "../../design/CRText";
import { CRColors } from "../../design/shortened/CRColours";
const IMAGES: { src: ImageSourcePropType; name: string }[] = [
	{
		src: require("../../../assets/images/places/mercedes.png"),
		name: "Mercedes Stadium",
	},
	{
		src: require("../../../assets/images/places/cola.png"),
		name: "World of Coca-Cola",
	},
	{
		src: require("../../../assets/images/places/botanical.png"),
		name: "Botanical Garden",
	},
	{
		src: require("../../../assets/images/places/aquarium.png"),
		name: "Georgia Aquarium",
	},
	{
		src: require("../../../assets/images/places/centennial.png"),
		name: "Centennial Park",
	},
	{
		src: require("../../../assets/images/places/mercedes.png"),
		name: "Another Ride",
	},
];
export default function ScheduleConfirmation({ navigation }) {
	const { tourSchedule } = useCRStore();
	return (
		<SafeAreaView
			style={generalStyles.safeArea}
			edges={["right", "left", "bottom"]}
		>
			<View
				style={{
					flex: 1,
					//justifyContent: "center",
					alignItems: "center",
				}}
			>
				<FadeUpView delay={300}>
					<View
						style={{
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							gap: 20,
						}}
					>
						<CRText size={20} weight="bold" font="Jura">
							Booking Confirmed
						</CRText>
						<CardStack data={IMAGES} />
						<View style={{ width: "100%", gap: 20 }}>
							<View
								style={{
									alignItems: "center",
									justifyContent: "space-between",
									flexDirection: "row",
								}}
							>
								<CRText size={20} weight="bold" font="Karla">
									Date:
								</CRText>
								<CRText size={20} weight="bold" font="Jura">
									{dayjs(tourSchedule?.date).format("D, MMMM, YYYY")}.
								</CRText>
							</View>
							<View
								style={{
									alignItems: "center",
									justifyContent: "space-between",
									flexDirection: "row",
								}}
							>
								<CRText size={20} weight="bold" font="Karla">
									Time:
								</CRText>
								<CRText size={20} weight="bold" font="Jura">
									{tourSchedule?.time}.
								</CRText>
							</View>
						</View>
						<View
							style={{
								backgroundColor: CRColors.tintYellow,
								padding: 10,
								borderRadius: 50,
							}}
						>
							<CRText font="Jura" weight="medium">
								Please arrive 10 minutes before ride time
							</CRText>
						</View>
						<TealButton
							style={generalStyles.generalBottom}
							title="Finish"
							onPress={() => navigation.navigate("home")}
						/>
					</View>
				</FadeUpView>
			</View>
		</SafeAreaView>
	);
}
