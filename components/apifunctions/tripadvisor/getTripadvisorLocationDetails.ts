// src/api/getTripadvisorLocationDetails.ts

import type { TripadvisorLocationDetails } from "../../types/tripadvisors";

export const getTripadvisorLocationDetails = async (
	locationId: string,
	apiKey: string,
): Promise<TripadvisorLocationDetails> => {
	const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?language=en&currency=USD&key=${apiKey}`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
		},
	};

	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			console.log(JSON.stringify(response, null, 2));
			throw new Error(`Failed to fetch: ${response.statusText}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching TripAdvisor data:", error);
		throw error;
	}
};
