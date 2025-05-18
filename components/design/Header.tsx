import type React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	type ImageSourcePropType,
	StatusBar,
} from "react-native";
import { CRText } from "./CRText";
import { crWidth } from "./shortened/Dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CRColors } from "./shortened/CRColours";

interface HeaderProps {
	username: string;
	avatarSource: ImageSourcePropType;
	onMenuPress?: () => void;
	onAvatarPress?: () => void;
	onMessageListPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
	username,
	avatarSource,
	onMenuPress,
	onAvatarPress,
	onMessageListPress,
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.menuButton}
				onPress={onMenuPress}
				hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
			>
				<View style={styles.menuIcon}>
					<View style={styles.menuLine} />
					<View style={styles.menuLine} />
					<View style={[styles.menuLine, { width: "50%" }]} />
				</View>
			</TouchableOpacity>

			<CRText>Welcome, {username}</CRText>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
				<TouchableOpacity onPress={onMessageListPress}>
					<MaterialCommunityIcons
						name="message-badge-outline"
						size={24}
						color={CRColors.red}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.avatarContainer}
					onPress={onAvatarPress}
				>
					<Image source={avatarSource} style={styles.avatar} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		alignSelf: "center",
		width: crWidth * 0.9,
		paddingVertical: 20,
	},
	menuButton: {
		padding: 4,
	},
	menuIcon: {
		width: 24,
		height: 24,
		justifyContent: "space-around",
	},
	menuLine: {
		width: "100%",
		height: 2,
		backgroundColor: "#333333",
		borderRadius: 1,
	},
	welcomeText: {
		fontSize: 18,
		color: "#333333",
		flex: 1,
		textAlign: "center",
	},
	avatarContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		overflow: "hidden",
		borderWidth: 2,
		borderColor: "#009688",
	},
	avatar: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
});

export default Header;
