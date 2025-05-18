import React from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons, Entypo, FontAwesome5, Feather } from "@expo/vector-icons";
import { CRColors } from "../../design/shortened/CRColours";
import { CRText } from "../../design/CRText";
import { Avatar } from "../../design/Avatar";
import Divider from "../../design/Divider";

export default function ProfileScreen({ navigation }) {
	// Mock data for the profile
	const profileData = {
		name: "Donna Liech",
		photoUrl:
			"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
		rideHistory: [
			{
				id: "1",
				type: "90 minutes tour",
				date: "March 27, 2025",
				time: "08:09 am",
			},
		],
	};

	const menuItems = [
		{
			id: "rewards",
			icon: <Ionicons name="gift" size={24} color={CRColors.text} />,
			title: "Rewards",
		},
		{
			id: "refer",
			icon: <Ionicons name="happy-outline" size={24} color={CRColors.text} />,
			title: "Refer a friend",
		},
		{
			id: "club",
			icon: <FontAwesome5 name="shield-alt" size={22} color={CRColors.text} />,
			title: "Vintage Riders Club",
		},
		{
			id: "settings",
			icon: (
				<Ionicons name="settings-outline" size={24} color={CRColors.text} />
			),
			title: "Settings",
		},
		{
			id: "notifications",
			icon: (
				<Ionicons
					name="notifications-outline"
					size={24}
					color={CRColors.text}
				/>
			),
			title: "Notifactions", // This typo is intentionally kept to match the image
		},
		{
			id: "payments",
			icon: <Feather name="credit-card" size={22} color={CRColors.text} />,
			title: "Payments",
		},
		{
			id: "help",
			icon: (
				<Ionicons name="help-circle-outline" size={24} color={CRColors.text} />
			),
			title: "Help",
		},
	];

	const RideHistoryCard = ({ ride }) => (
		<View style={styles.rideCard}>
			<View style={styles.rideCardContent}>
				<CRText font="Karla" weight="bold" style={styles.rideType}>
					{ride.type}
				</CRText>
				<CRText font="Karla" style={styles.rideDate}>
					{ride.date}
				</CRText>
				<CRText font="Karla" style={styles.rideTime}>
					{ride.time}
				</CRText>
			</View>
		</View>
	);

	const MenuItem = ({ item }) => (
		<TouchableOpacity style={styles.menuItem}>
			<View style={styles.menuItemIcon}>{item.icon}</View>
			<CRText font="Karla" weight="medium" style={styles.menuItemTitle}>
				{item.title}
			</CRText>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView edges={["right", "left", "top"]} style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{/* Header with back button */}

				{/* Profile Section */}
				<View style={styles.profileSection}>
					<Avatar
						source={profileData.photoUrl}
						containerStyle={styles.profileAvatar}
					/>
					<CRText font="Jura" weight="medium" style={styles.profileName}>
						{profileData.name}
					</CRText>
				</View>

				{/* Ride History Section */}
				<View style={styles.sectionContainer}>
					<View style={styles.sectionHeader}>
						<CRText font="Jura" weight="bold" style={styles.sectionTitle}>
							Ride History
						</CRText>
						<TouchableOpacity>
							<CRText font="Karla" style={styles.historyLink}>
								History
							</CRText>
						</TouchableOpacity>
					</View>

					{profileData.rideHistory.map((ride) => (
						<RideHistoryCard key={ride.id} ride={ride} />
					))}
				</View>

				{/* Divider */}
				<View style={styles.divider} />

				{/* Menu Items */}
				<View style={styles.menuContainer}>
					{menuItems.map((item, index) => (
						<View key={item.id}>
							<MenuItem item={item} />
							{index + 1 === 3 && <Divider />}
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F8F8",
	},
	scrollContainer: {
		flexGrow: 1,
		paddingBottom: 20,
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 10,
		paddingBottom: 5,
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: "center",
	},
	profileSection: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	profileAvatar: {
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: CRColors.accent,
	},
	profileName: {
		fontSize: 28,
		marginLeft: 15,
	},
	sectionContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	sectionTitle: {
		fontSize: 22,
	},
	historyLink: {
		color: CRColors.accent,
		fontSize: 16,
	},
	rideCard: {
		backgroundColor: CRColors.white,
		borderRadius: 10,
		padding: 16,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 3,
		elevation: 2,
	},
	rideCardContent: {
		gap: 3,
	},
	rideType: {
		fontSize: 18,
	},
	rideDate: {
		fontSize: 16,
		color: "#555",
	},
	rideTime: {
		fontSize: 16,
		color: "#555",
	},
	divider: {
		height: 1,
		backgroundColor: "#E5E5E5",
		marginVertical: 10,
	},
	menuContainer: {
		paddingHorizontal: 20,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 16,
	},
	menuItemIcon: {
		width: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	menuItemTitle: {
		fontSize: 18,
		marginLeft: 10,
	},
	bottomIndicator: {
		width: 80,
		height: 4,
		backgroundColor: "#000",
		borderRadius: 2,
		alignSelf: "center",
		marginTop: 20,
	},
});
