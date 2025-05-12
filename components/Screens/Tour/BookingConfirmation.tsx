import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { generalStyles } from "../../design/shortened/generalStyles";
import { FadeUpView } from "../../design/FadeUpView";
import { crHeight, crWidth } from "../../design/shortened/Dimensions";
import { CRText } from "../../design/CRText";
import MapCard from "../../design/Cards/MapCard";
import { CRColors } from "../../design/shortened/CRColours";
import { useCRStore } from "../../../store";
import { tourLength } from "../../utils/static/tourLength";
import { cars } from "../../utils/static/cars";
import { TealButton } from "../../design/Buttons/TealButton";

export default function BookingConfirmation({ navigation }) {
	// Replace with your actual Google Maps API key
	const GOOGLE_MAPS_API_KEY = "AIzaSyC4eB1yTDBtJBvPb2g1kPjFn4deWKqsUdg";
	const { tourPackage, setTourPackage, tripSearchResults } = useCRStore();
	const now = new Date();
	now.setHours(now.getHours() + 1); // add 1 hour
	now.setMinutes(0); // round to sharp o'clock

	const dateString = now.toDateString(); // e.g., "Tue Apr 08 2025"
	const timeString = now.toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
	const [filteredResults, setFilteredResults] = useState(tripSearchResults);
	useEffect(() => {
		if (!tripSearchResults.length || tourPackage?.tourlength == null) return;

		const lengthPercentMap = {
			0: 0.3,
			1: 0.5,
			2: 0.75,
			3: 1,
		} as const;

		const percent =
			lengthPercentMap[tourPackage.tourlength as 0 | 1 | 2 | 3] ?? 1;
		const count = Math.ceil(tripSearchResults.length * percent);
		const slicedResults = tripSearchResults.slice(0, count);

		setFilteredResults(slicedResults); // 👈 store sliced results
	}, [tourPackage?.tourlength, tripSearchResults]);
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
					{/* Main Image */}
					<ScrollView
						stickyHeaderIndices={[0]}
						showsVerticalScrollIndicator={false}
						style={{ height: crHeight * 0.8, width: crWidth * 0.85 }}
						contentContainerStyle={{
							paddingBottom: 100,
							width: "100%",

							gap: 40,
						}}
					>
						<View style={{ backgroundColor: CRColors.white, padding: 10 }}>
							<CRText style={{ textAlign: "center" }} size={20}>
								Booking Confirmation
							</CRText>
						</View>

						<View style={{ width: "100%" }}>
							<MapCard
								title="Current location"
								hideText={true}
								width={"100%"}
								//onPress={handleMapPress}
								googleMapsApiKey={GOOGLE_MAPS_API_KEY}
							/>
						</View>
						<View>
							<CRText weight="bold" size={20}>
								{dateString}
							</CRText>
							<CRText weight="bold" size={20} color={CRColors.accent}>
								{timeString}
							</CRText>
						</View>
						<View>
							<View style={{ gap: 5 }}>
								<CRText font="Jura" weight="medium">
									Pickup Location
								</CRText>
								<CRText weight="bold">Classic Cars HeadQuaters</CRText>
								<CRText>23 madeup address,Atlanta</CRText>
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
						</View>
						<View style={{ gap: 20 }}>
							<CRText font="Jura" weight="medium" size={20}>
								{tourLength[tourPackage?.tourlength].name}
							</CRText>
							<View style={{ gap: 10 }}>
								{filteredResults.map((results) => (
									<CRText font="Karla" key={results.location_id}>
										-{results.name}
									</CRText>
								))}
							</View>
						</View>
						<View
							style={{
								backgroundColor: "#f0f0f0",
								padding: 20,
								borderRadius: 20,
								gap: 30,
							}}
						>
							<View style={{ gap: 20 }}>
								<CRText font="Jura" weight="medium" size={20}>
									Car Selected
								</CRText>
								<View
									style={{
										flexDirection: "row",
										gap: 10,
										alignItems: "center",
									}}
								>
									<Image
										source={{ uri: cars[tourPackage?.tourCar].image }}
										style={{ height: 100, width: 150, borderRadius: 10 }}
									/>
									<CRText style={{ width: "60%" }} weight="bold">
										{cars[tourPackage?.tourCar].name}
									</CRText>
								</View>
							</View>
							<View style={{ gap: 5 }}>
								<View
									style={{
										justifyContent: "space-between",
										flexDirection: "row",
									}}
								>
									<CRText
										size={18}
										color={CRColors.accent}
										font="Jura"
										weight="medium"
									>
										{tourLength[tourPackage?.tourlength].name}
									</CRText>
									<CRText
										size={18}
										color={CRColors.accent}
										font="Jura"
										weight="medium"
									>
										${tourLength[tourPackage?.tourlength].price}
									</CRText>
								</View>
								{tourPackage?.tourExperience?.map((exp, index) => (
									<View
										style={{
											justifyContent: "space-between",
											flexDirection: "row",
										}}
										key={index}
									>
										<CRText
											size={18}
											color={CRColors.accent}
											font="Jura"
											weight="medium"
										>
											{exp}
										</CRText>
										<CRText
											size={18}
											color={CRColors.accent}
											font="Jura"
											weight="medium"
										>
											${30}
										</CRText>
									</View>
								))}
							</View>
						</View>
						<View
							style={{
								padding: 10,
								borderRadius: 10,
								backgroundColor: CRColors.tintAccent,
							}}
						>
							<CRText size={18} weight="bold" font="Karla">
								You will received notification via: {tourPackage?.reminder}
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
							<CRText size={18} weight="light" font="Karla">
								Share your upcoming ride for a special discount on your next
								booking!
							</CRText>
						</View>
					</ScrollView>
				</FadeUpView>
				<View style={[generalStyles.generalBottom, { gap: 10 }]}>
					<TealButton
						title="Proceed to payments"
						onPress={() => navigation.navigate("payment")}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
