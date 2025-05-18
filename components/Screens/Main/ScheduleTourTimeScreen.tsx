import { View, StyleSheet } from "react-native";
import React from "react";
import { CRText } from "../../design/CRText";
import { OutlineButton } from "../../design/Buttons/OutlineButton";
import { crWidth } from "../../design/shortened/Dimensions";
import { FadeUpView } from "../../design/FadeUpView";
import { useCRStore } from "../../../store";
import dayjs from "dayjs";
import { tourLength } from "../../utils/static/tourLength";
import { CRColors } from "../../design/shortened/CRColours";

// Array of available time slots
const tourTimes = [
	"9:00am - 10:30am",
	"10:40am - 11:15am",
	"12:00pm - 1:30pm",
	"2:00pm - 3:30pm",
];

export default function ScheduleTourTimeScreen({ navigation }) {
	const { addSchedule, tourPackage, tourSchedule } = useCRStore();

	const handleSelect = (time: string) => {
		addSchedule({ time: time });
		navigation.navigate("toursiteslist");
	};

	return (
		<View style={styles.container}>
			<FadeUpView delay={800} style={{ justifyContent: "center", gap: 20 }}>
				<CRText size={24} font="Jura" weight="bold">
					Schedule Tour
				</CRText>

				<View style={{ gap: 5, marginTop: 50 }}>
					<CRText size={20} font="Karla">
						Available Times on{" "}
						{dayjs(tourSchedule?.date).format("Do MMMM, YYYY")}.
					</CRText>
					<CRText font="Jura" size={24} weight="bold">
						{tourLength[tourPackage?.tourlength].name}
					</CRText>
				</View>

				<View style={{ gap: 20 }}>
					{tourTimes.map((time, index) => (
						<OutlineButton
							style={styles.button}
							onPress={() => handleSelect(time)}
							key={index}
						>
							<CRText font="Jura" size={18}>
								{time}
							</CRText>
						</OutlineButton>
					))}
				</View>
			</FadeUpView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: "flex-start",
		backgroundColor: "#fff",
	},
	button: {
		borderWidth: 1.5,
		borderColor: CRColors.accent,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 14,
		paddingHorizontal: 24,
		//width: crWidth * 0.8,
		borderRadius: 15,
	},
});
