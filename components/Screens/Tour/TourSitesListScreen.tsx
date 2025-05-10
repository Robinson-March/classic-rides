import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { FadeUpView } from "../../design/FadeUpView";
import { useCRStore } from "../../../store";
import { CRText } from "../../design/CRText";
import { TealButton } from "../../design/Buttons/TealButton";
import { crHeight } from "../../design/shortened/Dimensions";
import TourCard from "../../design/Cards/TourCard";
import LoadingIndicator from "../../design/LoadingIndicator";
import { generalStyles } from "../../design/shortened/generalStyles";
import { tourLength } from "../../utils/static/tourLength";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TourSitesList({ navigation }) {
	const {
		tourPackage,
		setTourPackage,
		tripSearchResults,
		tripSearchLoading,
		tripSearchError,
	} = useCRStore();
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
	const handleNavigation = () => {
		navigation.navigate("tourcars");
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FadeUpView style={{ flex: 1, alignItems: "center" }}>
				<FlatList
					style={{ width: "90%" }}
					ListHeaderComponent={
						<View style={{ gap: 10, marginBottom: 20 }}>
							<CRText size={24}>
								{"For " + tourLength[tourPackage?.tourlength].name}
							</CRText>
							<CRText font="Karla" size={18}>
								Sites you will see
							</CRText>
						</View>
					}
					data={filteredResults}
					keyExtractor={(item) => item.location_id}
					contentContainerStyle={{
						gap: 20,
						paddingBottom: 100, // to prevent bottom button overlap
					}}
					renderItem={({ item }) => (
						<TourCard
							image={item.image}
							title={item.name}
							description={item.description}
							width={"100%"}
							height={crHeight * 0.2}
							onPress={() =>
								navigation.navigate("toursiteinfo", {
									location_id: item.location_id,
									name: item.name,
								})
							}
						/>
					)}
					ListEmptyComponent={
						<LoadingIndicator
							loading={tripSearchLoading}
							error={tripSearchError}
							message="Finding interesting sites near you..."
						/>
					}
					showsVerticalScrollIndicator={false}
				/>

				<View style={[generalStyles.generalBottom, { bottom: 10 }]}>
					<TealButton title="Proceed with tour" onPress={handleNavigation} />
				</View>
			</FadeUpView>
		</SafeAreaView>
	);
}
