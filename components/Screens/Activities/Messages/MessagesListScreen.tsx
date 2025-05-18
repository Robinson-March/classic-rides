import { View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { generalStyles } from "../../../design/shortened/generalStyles";
import { FadeUpView } from "../../../design/FadeUpView";
import { Avatar } from "../../../design/Avatar";
import { CRText } from "../../../design/CRText";
import Divider from "../../../design/Divider";
import { Entypo } from "@expo/vector-icons";
import { CRColors } from "../../../design/shortened/CRColours";
import { useCRStore } from "../../../../store";

const messagesList = [
	{
		id: "1", // Added unique ID for FlatList key
		from: "Daniel White",
		role: "Driver",
		message: "Are you ready for the tour",
		photoUrl:
			"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
		seen: false,
	},
	{
		id: "2", // Added unique ID for FlatList key
		from: "Matthew Knight",
		role: "Admin",
		message: "Reminder: Almost time for your booked tour",
		photoUrl:
			"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
		seen: true,
	},
];

export default function MessagesList({ navigation }) {
	// Render separator between items
	const renderSeparator = () => <Divider style={{ marginVertical: 5 }} />;
	const { setCurrentChat } = useCRStore();
	const goToMessages = (chat) => {
		setCurrentChat(chat);
		navigation.navigate("messages");
	};
	// Render each message item
	const renderItem = ({ item }) => <MessageCard message={item} />;

	// Extract key from item
	const keyExtractor = (item) => item.id;

	// Empty list placeholder
	const renderEmptyList = () => (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				paddingTop: 50,
			}}
		>
			<CRText font="Jura" style={{ textAlign: "center" }}>
				No messages yet
			</CRText>
		</View>
	);
	const MessageCard = ({ message }) => {
		return (
			<TouchableOpacity onPress={() => goToMessages(message)}>
				<View
					style={{
						width: "100%",
						paddingHorizontal: 16,
						paddingVertical: 10,
						alignItems: "center",
						justifyContent: "space-between",
						flexDirection: "row",
					}}
				>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
						<Avatar source={message.photoUrl} />
						<View>
							<CRText font="Jura">{`${message.from} (${message.role})`}</CRText>
							<CRText font="Karla" weight={!message.seen ? "bold" : "regular"}>
								{message.message}
							</CRText>
						</View>
					</View>
					{!message.seen && (
						<Entypo name="dot-single" size={24} color={CRColors.red} />
					)}
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<SafeAreaView
			style={generalStyles.safeArea}
			edges={["right", "left", "bottom"]}
		>
			<FadeUpView delay={300} style={{ flex: 1, width: "100%" }}>
				<FlatList
					data={messagesList}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					ItemSeparatorComponent={renderSeparator}
					ListEmptyComponent={renderEmptyList}
					contentContainerStyle={{
						flexGrow: 1,
						width: "100%",
						paddingBottom: 20,
					}}
					showsVerticalScrollIndicator={false}
				/>
			</FadeUpView>
		</SafeAreaView>
	);
}
