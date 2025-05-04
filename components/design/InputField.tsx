import type React from "react";
import { useState } from "react";
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	TouchableOpacity,
	type KeyboardTypeOptions,
	type NativeSyntheticEvent,
	type TextInputFocusEventData,
} from "react-native";

interface InputFieldProps {
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	secureTextEntry?: boolean;
	keyboardType?: KeyboardTypeOptions;
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
	errorText?: string;
	rightIcon?: React.ReactNode;
	onRightIconPress?: () => void;
	autoComplete?: string;
	testID?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	placeholder,
	value,
	onChangeText,
	secureTextEntry = false,
	keyboardType = "default",
	autoCapitalize = "none",
	onBlur,
	onFocus,
	errorText,
	rightIcon,
	onRightIconPress,
	autoComplete,
	testID,
}) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(true);
		onFocus && onFocus(e);
	};

	const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setIsFocused(false);
		onBlur && onBlur(e);
	};

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.inputContainer,
					isFocused && styles.inputContainerFocused,
					errorText ? styles.inputContainerError : null,
				]}
			>
				<TextInput
					style={styles.input}
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType}
					autoCapitalize={autoCapitalize}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholderTextColor="#8E8E93"
					autoComplete={autoComplete as any}
					testID={testID}
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
		borderColor: "#007AFF",
		backgroundColor: "#FFFFFF",
	},
	inputContainerError: {
		borderColor: "#FF3B30",
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
