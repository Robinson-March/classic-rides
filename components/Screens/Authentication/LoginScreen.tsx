import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import InputField from "../../design/InputField";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import { TealButton } from "../../design/Buttons/TealButton";
import { OutlineButton } from "../../design/Buttons/OutlineButton";
import { CRText } from "../../design/CRText";

const LoginScreen: React.FC = ({ navigation }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleShowConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const handleRegister = () => {
		navigation.navigate("home");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					keyboardShouldPersistTaps="handled"
				>
					<CRText style={styles.title}>Get Started</CRText>

					<InputField
						placeholder="Firstname"
						value={firstName}
						onChangeText={setFirstName}
						autoCapitalize="words"
						testID="first-name-input"
					/>

					<InputField
						placeholder="Lastname"
						value={lastName}
						onChangeText={setLastName}
						autoCapitalize="words"
						testID="last-name-input"
					/>

					<InputField
						placeholder="Email"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						testID="email-input"
					/>

					<InputField
						placeholder="Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry={!showPassword}
						rightIcon={
							<Ionicons
								name={showPassword ? "eye-off" : "eye"}
								size={24}
								color="#8E8E93"
							/>
						}
						onRightIconPress={toggleShowPassword}
						testID="password-input"
					/>

					<InputField
						placeholder="Confirm Password"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry={!showConfirmPassword}
						rightIcon={
							<Ionicons
								name={showConfirmPassword ? "eye-off" : "eye"}
								size={24}
								color="#8E8E93"
							/>
						}
						onRightIconPress={toggleShowConfirmPassword}
						testID="confirm-password-input"
					/>

					<TouchableOpacity style={styles.forgotPassword}>
						<CRText style={styles.forgotPasswordText}>Forgot Password?</CRText>
					</TouchableOpacity>

					<TealButton title="Register" onPress={() => handleRegister()} />

					<OutlineButton style={styles.googleButton} onPress={() => {}}>
						<Image
							source={{
								uri: "https://developers.google.com/identity/images/g-logo.png",
							}}
							style={styles.googleIcon}
						/>
						<CRText style={styles.googleButtonText}>
							continue with google
						</CRText>
					</OutlineButton>

					<View style={styles.loginContainer}>
						<CRText style={styles.loginText}>Already have an account? </CRText>
						<TouchableOpacity>
							<CRText style={styles.loginLink}>Sign in</CRText>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	container: {
		flex: 1,
	},
	scrollContainer: {
		padding: 20,
		flexGrow: 1,
		justifyContent: "center",
	},
	title: {
		fontSize: 28,
		color: "#000000",
		textAlign: "center",
		marginBottom: 32,
	},
	forgotPassword: {
		alignSelf: "flex-start",
		marginBottom: 24,
	},
	forgotPasswordText: {
		color: "#009688",
		fontSize: 16,
	},
	registerButton: {
		backgroundColor: "#009688",
		borderRadius: 28,
		height: 56,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 16,
	},
	registerButtonText: {
		color: "#FFFFFF",
		fontSize: 18,
	},
	googleButton: {
		flexDirection: "row",
		backgroundColor: "#F5F5F5",

		justifyContent: "center",
		alignItems: "center",
		marginBottom: 32,
	},
	googleIcon: {
		width: 24,
		height: 24,
		marginRight: 12,
	},
	googleButtonText: {
		color: "#000000",
		fontSize: 16,
	},
	loginContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	loginText: {
		color: "#000000",
		fontSize: 16,
	},
	loginLink: {
		color: "#009688",
		fontSize: 16,
	},
});

export default LoginScreen;
