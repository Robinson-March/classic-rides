import React, { useState } from "react";
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	TouchableOpacity,
	type TextInputProps,
	type NativeSyntheticEvent,
	type TextInputFocusEventData,
	type StyleProp,
	type ViewStyle,
} from "react-native";
import { CRColors } from "./shortened/CRColours";

interface InputFieldProps extends TextInputProps {
	errorText?: string;
	rightIcon?: React.ReactNode;
	onRightIconPress?: () => void;
	style?: StyleProp<ViewStyle>; // for container styling
}

const InputField: React.FC<InputFieldProps> = ({
	errorText,
	rightIcon,
	onRightIconPress,
	style,
	onFocus,
	onBlur,
	...rest
}) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(true);
		if (onFocus) onFocus(e);
	};

	const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(false);
		if (onBlur) onBlur(e);
	};

	return (
		<View style={[styles.container, style]}>
			<View
				style={[
					styles.inputContainer,
					isFocused && styles.inputContainerFocused,
					errorText ? styles.inputContainerError : null,
				]}
			>
				<TextInput
					style={styles.input}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholderTextColor="#8E8E93"
					{...rest} // forward all other TextInput props here
				/>
				{rightIcon && (
					<TouchableOpacity
						onPress={onRightIconPress}
						style={styles.iconContainer}
						disabled={!onRightIconPress}
					>
						{rightIcon}
					</TouchableOpacity>
				)}
			</View>
			{errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: 16,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F2F2F7",
		borderRadius: 8,
		paddingHorizontal: 16,
		height: 56,
		borderWidth: 1,
		borderColor: "transparent",
	},
	inputContainerFocused: {
		borderColor: CRColors.accent,
		backgroundColor: "#FFFFFF",
	},
	inputContainerError: {
		borderColor: CRColors.red,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: "#000000",
	},
	iconContainer: {
		marginLeft: 8,
	},
	errorText: {
		color: "#FF3B30",
		fontSize: 12,
		marginTop: 4,
		marginLeft: 8,
	},
});

export default InputField;
