// utils/getLocationImages.ts
export type TripadvisorImage = {
	id: string;
	caption: string;
	url: string;
	width: number;
	height: number;
};

export async function getLocationImages(
	locationId: string,
	tripApiKey?: string,
): Promise<TripadvisorImage[]> {
	if (!tripApiKey) {
		throw new Error("TripAdvisor API key is required.");
	}

	const response = await fetch(
		`https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?language=en&key=${tripApiKey}`,
		{
			headers: {
				Accept: "application/json",
			},
		},
	);

	if (!response.ok) {
		console.log(JSON.stringify(response, null, 2));
		throw new Error(`Failed to fetch images for location ${locationId}`);
	}

	const data = await response.json();

	// Map only required image fields
	return (data?.data || []).map((img: any) => ({
		id: img.id,
		caption: img.caption,
		url: img.images?.original?.url ?? "",
		width: img.images?.original?.width,
		height: img.images?.original?.height,
	})) as TripadvisorImage[];
}
