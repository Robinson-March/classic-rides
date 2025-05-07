import type {
	LocationSearchItem,
	LocationSearchResponse,
} from "../../utils/types/tripadvisors";
import { getTripadvisorLocationDetails } from "./getTripadvisorLocationDetails";

export async function searchTripadvisorLocation(
	query: string,
	apiKey: string,
): Promise<LocationSearchResponse> {
	const url = `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${encodeURIComponent(
		query,
	)}&language=en&category=attractions&key=${apiKey}`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
		},
	};

	try {
		console.log("Fetching search results from TripAdvisor...");
		const response = await fetch(url, options);
		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

		const data: LocationSearchResponse = await response.json();
	

		const enhancedData: LocationSearchItem[] = await Promise.all(
			data.data.map(async (item) => {
			

				const [photoData, details] = await Promise.all([
					getTripadvisorPhoto(item.location_id, apiKey),
					getTripadvisorLocationDetails(item.location_id, apiKey),
				]);


				return {
					...item,
					image: photoData.image,
					description: details.description || "",
				};
			}),
		);

	

		return { data: enhancedData };
	} catch (error) {

		throw error;
	}
}

async function getTripadvisorPhoto(
	locationId: string,
	apiKey: string,
): Promise<{ image?: string }> {
	const url = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?language=en&limit=1&key=${apiKey}`;
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
		},
	};

	try {
	
		const response = await fetch(url, options);
		if (!response.ok) throw new Error(`Photo fetch failed for ID: ${locationId}`);

		const json = await response.json();
		const image = json?.data?.[0]?.images?.original?.url || undefined;

		return { image };
	} catch (error) {
		console.error(`Error fetching photo for location ${locationId}:`, error);
		return { image: undefined };
	}
}
