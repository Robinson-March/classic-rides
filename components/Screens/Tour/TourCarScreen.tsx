import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeUpView } from "../../design/FadeUpView";
import { FlatList } from "react-native-gesture-handler";
import { CRText } from "../../design/CRText";
import { cars } from "../../utils/static/cars";
import CarCard from "../../design/Cards/CarCard";
import { crHeight, crWidth } from "../../design/shortened/Dimensions";
import LoadingIndicator from "../../design/LoadingIndicator";
import { generalStyles } from "../../design/shortened/generalStyles";
import { TealButton } from "../../design/Buttons/TealButton";

export default function TourCarScreen({ navigation }) {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<FadeUpView style={{ flex: 1, alignItems: "center" }}>
				<FlatList
					style={{ width: "100%" }}
					ListHeaderComponent={
						<View style={{ gap: 10, marginBottom: 5, alignItems: "center" }}>
							<CRText font="Karla" weight="bold" size={20}>
								Pick the car that suits you
							</CRText>
						</View>
					}
					data={cars}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{
						gap: 20,
						paddingBottom: 100, // to prevent bottom button overlap
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
					}}
					renderItem={({ item }) => (
						<CarCard
							image={item.image}
							name={item.name}
							width={crWidth * 0.85}
							height={crHeight * 0.2}
							onPress={() =>
								navigation.navigate("cardetails", {
									id: item.id,
								})
							}
						/>
					)}
					// ListEmptyComponent={
					//     <ActivityIndicator
					//     />
					// }
					showsVerticalScrollIndicator={false}
				/>

				{/* <View style={[generalStyles.generalBottom, { bottom: 10 }]}>
                <TealButton title="Proceed with tour" />
            </View> */}
			</FadeUpView>
		</SafeAreaView>
	);
}
