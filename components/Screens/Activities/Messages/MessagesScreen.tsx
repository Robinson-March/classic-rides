import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import {
	View,
	FlatList,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
} from "react-native";
import { useCRStore } from "../../../../store";
import { Avatar } from "../../../design/Avatar";
import { CRText } from "../../../design/CRText";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { CRColors } from "../../../design/shortened/CRColours";
import { SafeAreaView } from "react-native-safe-area-context";
import { FadeUpView } from "../../../design/FadeUpView";
import InputField from "../../../design/InputField";
import { generalStyles } from "../../../design/shortened/generalStyles";
import { useShallow } from "zustand/react/shallow";

export default function MessagesScreen({ navigation }) {
	const { currentChat } = useCRStore();
	type Message = {
		id: string;
		message: string;
		sender: string;
		timestamp: Date;
		delivered: boolean;
		seen: boolean;
	};

	// Initialize with an empty array - we'll load the initial message in useEffect
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputText, setInputText] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const flatListRef = useRef(null);

	// Set up header
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false, // Hide default header
		});
	}, [navigation]);

	// Initialize messages with currentChat.message
	useEffect(() => {
		if (currentChat?.message) {
			const initialMessage = {
				id: Date.now().toString(),
				message: currentChat.message,
				sender: "other",
				timestamp: new Date(),
				delivered: true,
				seen: true,
			};
			setMessages([initialMessage]);

			// Scroll to bottom after setting initial message
			setTimeout(() => {
				flatListRef.current?.scrollToEnd({ animated: false });
			}, 100);
		}
	}, [currentChat]);

	// Scroll to bottom on new messages
	useEffect(() => {
		if (messages.length > 0) {
			const timer = setTimeout(() => {
				flatListRef.current?.scrollToEnd({ animated: true });
			}, 100); // Timeout to ensure rendering is complete
			return () => clearTimeout(timer);
		}
	}, [messages]);

	const handleSendMessage = () => {
		if (inputText.trim() === "") return;

		// Create a new message object
		const newMessage = {
			id: Date.now().toString(),
			message: inputText,
			sender: "user",
			timestamp: new Date(),
			delivered: true,
			seen: false,
		};

		// Add message to state
		setMessages((prevMessages) => [...prevMessages, newMessage]);
		setInputText("");

		// After 3 seconds, mark message as seen and show typing indicator
		setTimeout(() => {
			setMessages((prevMessages) =>
				prevMessages.map((msg) =>
					msg.id === newMessage.id ? { ...msg, seen: true } : msg,
				),
			);

			// Show typing indicator
			setIsTyping(true);

			// After 2 more seconds, add automated reply
			setTimeout(() => {
				setIsTyping(false);

				// Add automated message
				setMessages((prevMessages) => [
					...prevMessages,
					{
						id: Date.now().toString(),
						message: "This is a test",
						sender: "other",
						timestamp: new Date(),
						delivered: true,
						seen: true,
					},
				]);
			}, 2000);
		}, 3000);
	};

	const UserMessageCard = ({ data }) => (
		<View style={styles.userMessageContainer}>
			<View style={styles.userMessageContent}>
				<View style={styles.userMessageBubble}>
					<CRText
						font="Karla"
						weight={!data.seen ? "bold" : "regular"}
						style={styles.userMessageText}
					>
						{data.message}
					</CRText>
				</View>
				<Avatar
					source={
						"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
					}
					containerStyle={styles.messageAvatar}
				/>
			</View>
			<View style={styles.messageMetadata}>
				<CRText font="Karla" style={styles.messageTime}>
					{new Date(data.timestamp).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</CRText>
				{data.delivered ? (
					<Ionicons
						name={
							data.seen
								? "checkmark-done-circle-sharp"
								: "checkmark-done-circle-outline"
						}
						size={14}
						color={data.seen ? CRColors.accent : "#888"}
					/>
				) : (
					<Entypo
						name="dots-three-horizontal"
						size={14}
						color={CRColors.text}
					/>
				)}
			</View>
		</View>
	);

	const OtherMessageCard = ({ data }) => (
		<View style={styles.otherMessageContainer}>
			<View style={styles.otherMessageContent}>
				<Avatar
					source={currentChat?.photoUrl}
					containerStyle={styles.messageAvatar}
				/>
				<View style={styles.otherMessageBubble}>
					<CRText
						font="Karla"
						weight={!data.seen ? "bold" : "regular"}
						style={styles.otherMessageText}
					>
						{data.message}
					</CRText>
				</View>
			</View>
			<View style={styles.otherMessageMetadata}>
				<CRText font="Karla" style={styles.messageTime}>
					{new Date(data.timestamp).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</CRText>
			</View>
		</View>
	);

	const renderItem = ({ item, index }) => {
		const isNewMessage = index === messages.length - 1;

		return (
			<FadeUpView
				delay={300}
				//	style={{ opacity: isNewMessage ? 0 : 1 }}
			>
				{item.sender === "user" ? (
					<UserMessageCard data={item} />
				) : (
					<OtherMessageCard data={item} />
				)}
			</FadeUpView>
		);
	};

	return (
		<SafeAreaView edges={["right", "left", "bottom"]} style={styles.container}>
			<SafeAreaView />
			<View style={styles.headerContainer}>
				<View style={styles.headerContent}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Ionicons name="arrow-back" size={24} color={CRColors.text} />
					</TouchableOpacity>
					<Avatar source={currentChat?.photoUrl} />
					<View>
						<CRText font="Jura">{`${currentChat?.from || "User"} ${
							currentChat?.role ? `(${currentChat?.role})` : ""
						}`}</CRText>
						{isTyping && (
							<CRText font="Karla" style={styles.typingIndicator}>
								typing...
							</CRText>
						)}
					</View>
				</View>
			</View>

			{/* Message List */}
			<KeyboardAvoidingView
				style={styles.keyboardAvoidingView}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			>
				<FlatList
					ref={flatListRef}
					data={messages}
					keyExtractor={(item) => item.id}
					renderItem={renderItem}
					contentContainerStyle={styles.flatListContent}
					onContentSizeChange={() => {
						flatListRef.current?.scrollToEnd({ animated: true });
					}}
					onLayout={() => {
						flatListRef.current?.scrollToEnd({ animated: false });
					}}
				/>

				{/* Message Input */}
				<View style={[styles.inputContainer]}>
					<InputField
						placeholder="Type a message"
						value={inputText}
						onChangeText={setInputText}
						onSubmitEditing={handleSendMessage}
						returnKeyType="send"
						multiline
						rightIcon={
							<TouchableOpacity
								onPress={handleSendMessage}
								disabled={inputText.trim() === ""}
							>
								<Ionicons
									name="send"
									size={28}
									color={inputText.trim() === "" ? "#999" : CRColors.accent}
								/>
							</TouchableOpacity>
						}
					/>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CRColors.white,
	},
	headerContainer: {
		width: "100%",
		borderBottomWidth: 1,
		borderColor: "#ddd",
		paddingBottom: 10,
	},
	headerContent: {
		height: 60,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		paddingHorizontal: 15,
	},
	typingIndicator: {
		fontSize: 12,
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	flatListContent: {
		paddingBottom: 10,
	},
	inputContainer: {
		paddingHorizontal: 15,
		paddingVertical: 8,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		borderTopWidth: 1,
		borderColor: "#ddd",
	},
	userMessageContainer: {
		width: "100%",
		paddingHorizontal: 16,
		paddingVertical: 10,
		alignItems: "flex-end",
	},
	userMessageContent: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 10,
		maxWidth: "80%",
	},
	userMessageBubble: {
		backgroundColor: CRColors.accent,
		padding: 10,
		borderRadius: 15,
	},
	userMessageText: {
		color: "#fff",
	},
	messageAvatar: {
		width: 20,
		height: 20,
	},
	messageMetadata: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
		marginRight: 10,
	},
	messageTime: {
		fontSize: 10,
		color: "#888",
		marginRight: 5,
	},
	otherMessageContainer: {
		width: "100%",
		paddingHorizontal: 16,
		paddingVertical: 10,
		alignItems: "flex-start",
	},
	otherMessageContent: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 10,
		maxWidth: "80%",
	},
	otherMessageBubble: {
		backgroundColor: CRColors.white,
		padding: 10,
		borderRadius: 15,
		borderColor: CRColors.accent,
		borderWidth: 1,
	},
	otherMessageText: {
		color: CRColors.text,
	},
	otherMessageMetadata: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
		marginLeft: 10,
	},
});
