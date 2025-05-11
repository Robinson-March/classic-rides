import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import { CRColors } from "../../design/shortened/CRColours";
import { CRText } from "../../design/CRText";
import { Ionicons } from "@expo/vector-icons";
import { tourLength } from "../../utils/static/tourLength";
import { useCRStore } from "../../../store";
import { cars } from "../../utils/static/cars";
import { TealButton } from "../../design/Buttons/TealButton";
import { generalStyles } from "../../design/shortened/generalStyles";

export default function PaymentsScreen({ navigation }) {
	const [paymentConfirmed, setPaymentConfirmed] = useState(false);
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
	// Sample payment data - in a real app this would come from props or context
	const paymentData = {
		package: tourLength[tourPackage?.tourlength].name,
		addOns: tourPackage?.tourExperience,
		car: {
			model: cars[tourPackage?.tourCar].name,
			image: cars[tourPackage?.tourCar].image, // You'll need to add this image to your assets
		},
		pickupLocation: "Classic Rides Head Quarters\n23 madeup address,\nAtlanta.",
		dateTime: {
			date: dateString,
			time: timeString,
		},
	};

	// Initial screen - Payment button
	const InitialScreen = () => (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<View
				style={{
					padding: 20,
					borderRadius: 16,
					backgroundColor: CRColors.tintAccent,
					alignItems: "center",
					width: "80%",
				}}
			>
				<CRText size={18} weight="bold" font="Karla">
					Payment SDK will load here
				</CRText>

				<TouchableOpacity
					style={styles.payButton}
					onPress={() => setPaymentConfirmed(true)}
				>
					<CRText size={16} weight="bold" color="white">
						Simulate Payment
					</CRText>
				</TouchableOpacity>
			</View>
		</View>
	);

	// Payment confirmation screen
	const PaymentConfirmationScreen = () => (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{/* Confirmation card */}
				<View style={styles.card}>
					<CRText size={18} weight="bold" style={styles.confirmationTitle}>
						Payment Confirmed
					</CRText>

					{/* Package */}
					<View style={styles.infoRow}>
						<CRText size={16} weight="medium">
							Package:
						</CRText>
						<CRText size={16} color={CRColors.accent}>
							{paymentData.package}
						</CRText>
					</View>

					{/* Add-ons */}
					<View style={styles.infoRow}>
						<CRText size={16} weight="medium">
							Ride Add-ons
						</CRText>
						<View style={styles.addonsContainer}>
							{paymentData.addOns.map((addon, index) => (
								<CRText
									key={index}
									size={16}
									color={CRColors.accent}
									style={styles.addonText}
								>
									{addon}
								</CRText>
							))}
						</View>
					</View>

					{/* Car */}
					<View style={styles.infoRow}>
						<CRText size={16} weight="medium">
							Car
						</CRText>
						<View style={styles.carContainer}>
							<Image
								source={{ uri: paymentData.car.image }}
								style={styles.carImage}
							/>
							<CRText size={14} style={styles.carModel}>
								{paymentData.car.model}
							</CRText>
						</View>
					</View>

					{/* Pickup Location */}
					<View style={styles.infoRow}>
						<CRText size={16} weight="medium">
							Pickup Location
						</CRText>
						<CRText size={14} style={styles.locationText}>
							{paymentData.pickupLocation}
						</CRText>
					</View>

					{/* Time and Date */}
					<View style={styles.infoRow}>
						<CRText size={16} weight="medium">
							Time and Date
						</CRText>
						<View style={styles.dateTimeContainer}>
							<CRText size={16}>{paymentData.dateTime.date}</CRText>
							<CRText size={16}>{paymentData.dateTime.time}</CRText>
						</View>
					</View>
				</View>
			</ScrollView>
			<View
				style={[
					generalStyles.generalBottom,
					{ bottom: 50, justifyContent: "center", width: "100%" },
				]}
			>
				<TealButton
					title="Proceed"
					onPress={() => {
						// Navigate to the next screen or close the flow
						// For now, just reset to initial screen
						navigation.navigate("ubernav");
					}}
				/>
			</View>
		</SafeAreaView>
	);

	return paymentConfirmed ? <PaymentConfirmationScreen /> : <InitialScreen />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},
	scrollContainer: {
		flexGrow: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	backButton: {
		marginTop: 10,
		marginBottom: 20,
		alignSelf: "flex-start",
	},
	card: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.3,
		shadowRadius: 40,
		elevation: 30,
		width: "90%",
		gap: 20,
	},
	confirmationTitle: {
		textAlign: "center",
		marginBottom: 20,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#F0F0F0",
	},
	addonsContainer: {
		alignItems: "flex-end",
	},
	addonText: {
		marginBottom: 4,
	},
	carContainer: {
		alignItems: "flex-end",
	},
	carImage: {
		width: 120,
		height: 80,
		resizeMode: "contain",
		marginBottom: 8,
		borderRadius: 5,
	},
	carModel: {
		textAlign: "center",
	},
	locationText: {
		textAlign: "right",
		maxWidth: "60%",
	},
	dateTimeContainer: {
		alignItems: "flex-end",
	},
	proceedButton: {
		backgroundColor: "#009688",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 40,
	},
	payButton: {
		backgroundColor: CRColors.accent,
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 20,
		width: "80%",
	},
});
