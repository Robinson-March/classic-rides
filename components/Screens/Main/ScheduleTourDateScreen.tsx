import { View, Text } from "react-native";
import React from "react";
import CustomCalendar from "../../design/CustomCalendar";
import { FadeUpView } from "../../design/FadeUpView";
import { CRText } from "../../design/CRText";
import { CRColors } from "../../design/shortened/CRColours";

export default function ScheduleDateTourScreen() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: CRColors.white,
			}}
		>
			<FadeUpView
				delay={800}
				style={{
					alignItems: "center",
					gap: 10,
					flex: 1,
					width: "100%",
					padding: 20,
				}}
			>
				<View style={{ width: "100%" }}>
					<CRText size={24} font="bold">
						Schedule Tour
					</CRText>
					<View
						style={{
							marginTop: 50,
						}}
					>
						<CustomCalendar />
					</View>
				</View>
			</FadeUpView>
		</View>
	);
}
