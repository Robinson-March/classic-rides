export interface Address {
	street1?: string;
	street2?: string;
	city?: string;
	state?: string;
	country: string;
	postalcode?: string;
	address_string: string;
}

export interface LocationSearchItem {
	location_id: string;
	name: string;
	address_obj: Address;
	image?: string; // 👈 Added optional image field
}

export interface LocationSearchResponse {
	data: LocationSearchItem[];
}

export interface TripadvisorLocationDetails {
	location_id: string;
	name: string;
	web_url: string;
	description: string;
	address_obj: {
		street1: string;
		city: string;
		state: string;
		country: string;
		postalcode: string;
		address_string: string;
	};
	ancestors: {
		level: string;
		name: string;
		location_id: string;
		abbrv?: string;
	}[];
	latitude: string;
	longitude: string;
	timezone: string;
	email: string;
	phone: string;
	website: string;
	write_review: string;
	ranking_data: {
		geo_location_id: string;
		ranking_string: string;
		geo_location_name: string;
		ranking_out_of: string;
		ranking: string;
	};
	rating: string;
	rating_image_url: string;
	num_reviews: string;
	review_rating_count: {
		[key: string]: string;
	};
	photo_count: string;
	see_all_photos: string;
	category: {
		name: string;
		localized_name: string;
	};
	subcategory: {
		name: string;
		localized_name: string;
	}[];
	groups: {
		name: string;
		localized_name: string;
		categories: {
			name: string;
			localized_name: string;
		}[];
	}[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	neighborhood_info: any[];
	trip_types: {
		name: string;
		localized_name: string;
		value: string;
	}[];
	awards: {
		award_type: string;
		year: string;
		images: {
			tiny: string;
			small: string;
			large: string;
		};
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		categories: any[];
		display_name: string;
	}[];
}
