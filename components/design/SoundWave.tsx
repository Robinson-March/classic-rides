// SoundWave.tsx
import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const BAR_COUNT = 7;

const SoundWave = ({ isSpeaking = false }) => {
	const animations = useRef(
		Array.from({ length: BAR_COUNT }, () => new Animated.Value(10)),
	).current;

	useEffect(() => {
		const animate = (bar: Animated.Value, delay: number) => {
			return Animated.loop(
				Animated.sequence([
					Animated.timing(bar, {
						toValue: 30,
						duration: 300,
						delay,
						useNativeDriver: false,
					}),
					Animated.timing(bar, {
						toValue: 10,
						duration: 300,
						delay,
						useNativeDriver: false,
					}),
				]),
			);
		};

		const loops = animations.map((bar, i) => animate(bar, i * 100));

		if (isSpeaking) {
			loops.forEach((loop) => loop.start());
		} else {
			animations.forEach((bar) => bar.setValue(10));
			loops.forEach((loop) => loop.stop?.());
		}

		return () => loops.forEach((loop) => loop.stop?.());
	}, [isSpeaking]);

	return (
		<View style={styles.container}>
			{animations.map((height, index) => (
				<Animated.View
					key={index}
					style={[
						styles.bar,
						{
							height,
							maxHeight: 20,
							marginHorizontal: 2,
							backgroundColor: "#333",
							opacity: 1 - Math.abs(index - Math.floor(BAR_COUNT / 2)) * 0.15,
						},
					]}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		height: 40,
	},
	bar: {
		width: 4,
		borderRadius: 10,
	},
});

export default SoundWave;
