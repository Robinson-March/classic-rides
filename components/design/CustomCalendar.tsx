import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { CRText } from "./CRText";
import { CRColors } from "./shortened/CRColours";
import { useCRStore } from "../../store";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";

// Get today's date in YYYY-MM-DD
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const todayString = `${yyyy}-${mm}-${dd}`;
type RootStackParamList = {
	scheduletimetour: undefined;
	// add other routes here if needed
};

export default function CustomCalendar() {
	const [selectedDate, setSelectedDate] = useState(todayString);
	const [visibleMonth, setVisibleMonth] = useState(
		dayjs(today).startOf("month"),
	);
	const { addSchedule } = useCRStore();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	// Generate available weekend dates for visible month
	const generateAvailableDates = () => {
		const dates: string[] = [];
		const year = visibleMonth.year();
		const month = visibleMonth.month(); // 0-based

		const daysInMonth = new Date(year, month + 1, 0).getDate();

		for (let i = 1; i <= daysInMonth; i++) {
			const date = new Date(year, month, i);
			const day = date.getDay();

			// Only today or future weekends
			if (date >= today && (day === 0 || day === 6)) {
				const formatted = dayjs(date).format("YYYY-MM-DD");
				dates.push(formatted);
			}
		}

		return dates.slice(0, 4); // Optional: limit to 4
	};

	const availableDates = useMemo(
		() => generateAvailableDates(),
		[visibleMonth],
	);

	const getMarkedDates = () => {
		const marked: Record<string, any> = {};

		// Mark available dates
		for (const date of availableDates) {
			marked[date] = {
				customStyles: {
					container: {
						borderWidth: 2,
						borderColor: CRColors.accent,
						borderRadius: 5,
					},
					text: {
						color: "#000",
					},
				},
			};
		}

		// Mark selected date
		if (selectedDate) {
			marked[selectedDate] = {
				customStyles: {
					container: {
						backgroundColor: CRColors.accent,
						borderRadius: 5,
					},
					text: {
						color: "#fff",
					},
				},
			};
		}

		return marked;
	};

	const navigateToTime = (day: any) => {
		const selected = day.dateString;
		console.log(selected);
		// Only allow navigation if selected date is one of the availableDates
		if (!availableDates.includes(selected)) return;

		setSelectedDate(selected);
		addSchedule({ date: selected });
		navigation.navigate("scheduletimetour");
	};

	return (
		<View style={(styles.container, { paddingHorizontal: 0, gap: 10 })}>
			<CRText size={20} weight="bold">
				Please select date
			</CRText>
			<CRText>Available dates have a green ring</CRText>
			<Calendar
				markingType={"custom"}
				current={todayString}
				onDayPress={(day) => navigateToTime(day)}
				markedDates={getMarkedDates()}
				onMonthChange={(date) => {
					setVisibleMonth(dayjs(`${date.year}-${date.month}-01`));
				}}
				firstDay={1}
				hideExtraDays={false}
				style={{
					borderRadius: 8,
					paddingBottom: 10,
					marginTop: 50,
				}}
				renderArrow={(direction) => (
					<Text style={{ color: "#404040", fontSize: 18 }}>
						{direction === "left" ? "<" : ">"}
					</Text>
				)}
				renderHeader={(date) => {
					const formatted = dayjs(date).format("MMM, YYYY");
					return (
						<View
							style={{
								backgroundColor: CRColors.text,
								alignItems: "center",
								padding: 10,
								borderRadius: 10,
							}}
						>
							<CRText size={18} weight="bold" style={{ color: CRColors.white }}>
								{formatted}
							</CRText>
						</View>
					);
				}}
				theme={{
					textSectionTitleColor: "#bbb",
					textDayFontWeight: "400",
					textMonthFontWeight: "bold",
					textMonthFontSize: 20,
					textDayFontSize: 16,
					textDayHeaderFontSize: 14,
					todayTextColor: CRColors.accent,
					backgroundColor: "#000",
					calendarBackground: CRColors.white,
				}}
				dayComponent={({ date, state, marking }) => {
					const isPrevMonth = state === "disabled";
					const customStyle = marking?.customStyles || {};
					const dayOfWeek = new Date(date.dateString).getDay();
					const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
					const isToday = date.dateString === todayString;

					return (
						<TouchableOpacity onPress={() => navigateToTime(date)}>
							<View
								style={[
									styles.dayContainer,
									customStyle.container,
									isPrevMonth && styles.prevMonthDay,
								]}
							>
								<CRText
									style={[
										styles.dayText,
										customStyle.text,
										isPrevMonth && styles.prevMonthText,
										isWeekend && styles.weekendText,
										isToday && { color: CRColors.white },
									]}
								>
									{date ? date.day : ""}
								</CRText>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		paddingHorizontal: 16,
		backgroundColor: CRColors.white,
		gap: 20,
	},
	dayContainer: {
		width: 32,
		height: 32,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		margin: 10,
		backgroundColor: CRColors.white,
	},
	dayText: {
		fontSize: 16,
	},
	prevMonthDay: {
		backgroundColor: "#333",
		borderRadius: 5,
		opacity: 0.2,
	},
	prevMonthText: {
		color: "#fff",
	},
});
