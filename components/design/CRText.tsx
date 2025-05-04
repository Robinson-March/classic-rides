// CRText.tsx
import type React from "react";
import { Text, type TextStyle, type StyleProp } from "react-native";

type FontFamily = "Jura" | "Karla";
type FontWeight = "light" | "regular" | "medium" | "bold";

interface CRTextProps {
	children: React.ReactNode;
	font?: FontFamily;
	weight?: FontWeight;
	size?: number;
	color?: string;
	align?: TextStyle["textAlign"];
	style?: StyleProp<TextStyle>;
}

export const CRText: React.FC<CRTextProps> = ({
	children,
	font = "Jura",
	weight = "regular",
	size = 16,
	color = "#404040",
	align = "left",
	style,
}) => {
	const getFontFamily = (): string => {
		const weightMap = {
			Jura: {
				light: "Jura-Light",
				regular: "Jura",
				medium: "Jura-Medium",
				bold: "Jura-Bold",
			},
			Karla: {
				light: "Karla-Light",
				regular: "Karla",
				medium: "Karla-Medium",
				bold: "Karla-Bold",
			},
		};

		return weightMap[font]?.[weight] ?? font;
	};

	return (
		<Text
			style={[
				{
					fontFamily: getFontFamily(),
					fontSize: size,
					color,
					textAlign: align,
				},
				style,
			]}
		>
			{children}
		</Text>
	);
};
