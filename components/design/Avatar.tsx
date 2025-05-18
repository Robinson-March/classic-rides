import type React from "react";
import {
	Image,
	StyleSheet,
	TouchableOpacity,
	type ViewStyle,
	type ImageStyle,
	type ImageSourcePropType,
} from "react-native";

interface AvatarProps {
	source: ImageSourcePropType;
	onPress?: () => void;
	containerStyle?: ViewStyle;
	imageStyle?: ImageStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
	source,
	onPress,
	containerStyle,
	imageStyle,
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.container, containerStyle]}
		>
			<Image source={{ uri: source }} style={[styles.image, imageStyle]} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 40,
		height: 40,
		borderRadius: 20,
		overflow: "hidden",
		borderWidth: 2,
		borderColor: "#009688",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
});
