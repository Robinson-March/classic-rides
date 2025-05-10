import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	Pressable,
} from "react-native";
import React, { useState } from "react";
import { generalStyles } from "../../design/shortened/generalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeUpView } from "../../design/FadeUpView";
import { TealButton } from "../../design/Buttons/TealButton";
import { CRText } from "../../design/CRText";
import { cars } from "../../utils/static/cars";
import { useCRStore } from "../../../store";
import { CRColors } from "../../design/shortened/CRColours";
import { crHeight, crWidth } from "../../design/shortened/Dimensions";

export default function TourOptionsScreen({ navigation }) {
	const { tourPackage, setTourPackage } = useCRStore();
	const addons = ["Photographer comes along", "Flowers", "Custom music"];
	const [selectedReminder, setSelectedReminder] = useState<string | null>(null);

	const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
	const now = new Date();
	now.setHours(now.getHours() + 1); // add 1 hour
	now.setMinutes(0); // round to sharp o'clock

	const dateString = now.toDateString(); // e.g., "Tue Apr 08 2025"
	const timeString = now.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	}); // e.g., "4:00 PM"

	const toggleAddon = (addon: string) => {
		if (selectedAddons.includes(addon)) {
			setSelectedAddons(selectedAddons.filter((item) => item !== addon));
			setTourPackage({
				tourExperience: selectedAddons.filter((item) => item !== addon),
			});
		} else {
			setSelectedAddons([...selectedAddons, addon]);
			setTourPackage({ tourExperience: [...selectedAddons, addon] });
		}
	};

	return (
		<SafeAreaView
			style={generalStyles.safeArea}
			edges={["right", "left", "bottom"]}
		>
			<View style={styles.container}>
				<FadeUpView delay={300}>
					{/* Main Image */}
					<ScrollView
						stickyHeaderIndices={[0]}
						showsVerticalScrollIndicator={false}
						style={{ height: crHeight * 0.8, width: crWidth * 0.85 }}
						contentContainerStyle={{ paddingBottom: 100, width: "100%" }}
					>
						{/* Sticky Header at index 0 */}
						<View style={styles.imageContainer}>
							<Image
								source={{ uri: cars[tourPackage?.tourCar]?.image }}
								style={styles.headerImage}
							/>
						</View>

						<View style={{ gap: 30, width: "100%" }}>
							<View style={styles.headerInfo}>
								<CRText font="Jura" weight="bold">
									{cars[tourPackage?.tourCar]?.name}
								</CRText>
							</View>

							<View
								style={{
									backgroundColor: "#f0f0f0",
									padding: 20,
									borderRadius: 20,
									gap: 30,
								}}
							>
								<View style={{ gap: 5 }}>
									<CRText font="Jura" weight="medium">
										Pickup Location
									</CRText>
									<CRText weight="bold">Classic Cars HeadQuaters</CRText>
									<CRText>23 madeup address,Atlanta</CRText>
								</View>
								<View style={{ gap: 5 }}>
									<CRText font="Jura" weight="medium">
										Time and Date
									</CRText>
									<CRText weight="bold">{dateString}</CRText>
									<CRText>{timeString}</CRText>
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
							</View>

							<View style={{ gap: 5 }}>
								<CRText font="Jura" size={18}>
									Enhance your experience
								</CRText>
								<CRText weight="medium" font="Karla">
									Select what you want along with this ride
								</CRText>
								<View style={{ gap: 10, marginTop: 10 }}>
									{addons.map((addon, index) => (
										<Pressable
											key={index}
											onPress={() => toggleAddon(addon)}
											style={{
												flexDirection: "row",
												alignItems: "center",
											}}
										>
											<View
												style={{
													height: 20,
													width: 20,
													borderRadius: 100,
													borderWidth: 2,
													borderColor: CRColors.text,
													justifyContent: "center",
													alignItems: "center",
													marginRight: 10,
												}}
											>
												{selectedAddons.includes(addon) && (
													<View
														style={{
															width: 12,
															height: 12,
															backgroundColor: CRColors.accent,
															borderRadius: 100,
														}}
													/>
												)}
											</View>
											<CRText font="Karla">{addon}</CRText>
										</Pressable>
									))}
								</View>
							</View>
							<View style={{ gap: 10 }}>
								<CRText font="Jura" size={18}>
									Reminder
								</CRText>

								{["Email Reminder", "SMS Reminder"].map((reminder, idx) => (
									<Pressable
										key={idx}
										onPress={() => setSelectedReminder(reminder)}
										style={{
											flexDirection: "row",
											alignItems: "center",
											marginTop: 5,
										}}
									>
										<View
											style={{
												height: 20,
												width: 20,
												borderRadius: 100,
												borderWidth: 2,
												borderColor: CRColors.text,
												justifyContent: "center",
												alignItems: "center",
												marginRight: 10,
											}}
										>
											{selectedReminder === reminder && (
												<View
													style={{
														width: 12,
														height: 12,
														backgroundColor: CRColors.accent,
														borderRadius: 100,
													}}
												/>
											)}
										</View>
										<CRText font="Karla">{reminder}</CRText>
									</Pressable>
								))}
							</View>
						</View>
					</ScrollView>
				</FadeUpView>
				<View style={[generalStyles.generalBottom, { gap: 10 }]}>
					<TealButton
						title="Continue"
						onPress={() => navigation.navigate("tourbooking")}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: "center",
		alignItems: "center",
	},
	backButton: {
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 10,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 8,
	},
	imageContainer: {
		borderRadius: 12,
		overflow: "hidden",

		marginTop: 10,
		width: "100%",
	},
	headerImage: {
		width: "100%",
		height: 200,
		borderRadius: 5,
	},
	headerInfo: {
		marginHorizontal: 16,
		marginTop: 16,
	},
});
