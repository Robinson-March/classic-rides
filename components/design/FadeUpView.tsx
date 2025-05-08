// FadeUpView.tsx
import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle, StyleProp } from "react-native";

type FadeUpViewProps = {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	delay?: number;
};

export const FadeUpView: React.FC<FadeUpViewProps> = ({
	children,
	style,
	delay = 800,
}) => {
	const opacity = useRef(new Animated.Value(0)).current;
	const translateY = useRef(new Animated.Value(20)).current;

	useEffect(() => {
		Animated.parallel([
			Animated.timing(opacity, {
				toValue: 1,
				duration: 400,
				useNativeDriver: true,
				delay,
			}),
			Animated.timing(translateY, {
				toValue: 0,
				duration: 400,
				useNativeDriver: true,
				delay,
			}),
		]).start();
	}, [delay,opacity,translateY]);

	return (
		<Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
			{children}
		</Animated.View>
	);
};
