// BounceView.tsx
import React, { useEffect, useRef } from "react";
import { Animated, ViewStyle, StyleProp } from "react-native";

type BounceViewProps = {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
	delay?: number;
};

export const BounceView: React.FC<BounceViewProps> = ({
	children,
	style,
	delay = 0,
}) => {
	const scale = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.spring(scale, {
			toValue: 1,
			friction: 4,
			tension: 100,
			useNativeDriver: true,
			delay,
		}).start();
	}, [delay,scale]);

	return (
		<Animated.View style={[{ transform: [{ scale }] }, style]}>
			{children}
		</Animated.View>
	);
};
