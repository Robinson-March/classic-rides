const tourSitesStatic: LocationSearchItem[] = [
	{
		location_id: "1",
		name: "Botanical Garden",
		address_obj: { address_string: "Atlanta, GA", country: "USA" },
		image:
			"https://media-cdn.tripadvisor.com/media/photo-m/1280/18/6c/00/18/vista-panoramica-de-parte.jpg",
	},
	{
		location_id: "2",
		name: "Atlanta History Center",
		address_obj: { address_string: "Atlanta, GA", country: "USA" },
		image:
			"https://media-cdn.tripadvisor.com/media/photo-o/0f/9f/6c/fd/photo9jpg.jpg",
	},
	{
		location_id: "3",
		name: "Zoo Atlanta",
		address_obj: { address_string: "Atlanta, GA", country: "USA" },
		image:
			"https://media-cdn.tripadvisor.com/media/photo-o/07/41/24/45/zoo-atlanta.jpg",
	},
	{
		location_id: "4",
		name: "Centennial Park",
		address_obj: { address_string: "Atlanta, GA", country: "USA" },
		image:
			"https://media-cdn.tripadvisor.com/media/photo-o/0e/f2/6a/4d/beautiful-view-from-centennial.jpg",
	},
];
interface ChatItem {
	id: string;
	from: string;
	role: string;
	message: string;
	photoUrl: string;
	seen: boolean;
}
import { create } from "zustand";
import type {
	LocationSearchItem,
	LocationSearchResponse,
	TourPackage,
} from "./components/utils/types/tripadvisors";
import {
	getLocationImages,
	type TripadvisorImage,
} from "./components/apifunctions/tripadvisor/getLocationImages";
import { searchTripadvisorLocation } from "./components/apifunctions/tripadvisor/searchTripadvisorLocation";

interface AppState {
	tourHistory: TourPackage & { date: string }[];
	tripSearchResults: LocationSearchItem[];
	tripSearchLoading: boolean;
	tripSearchError: string | null;
	searchCache: Record<string, LocationSearchItem[]>;
	tourPackage: TourPackage | null;
	locationImages: TripadvisorImage[];
	locationImagesLoading: boolean;
	locationImagesError: string | null;
	imageCache: Record<string, TripadvisorImage[]>;
	tourSchedule: ScheduleItem | null;
	currentChat: ChatItem | null;
	setCurrentChat: (chat: ChatItem | null) => void;
	addSchedule: (schedule: ScheduleItem) => void;
	removeSchedule: (date: string, time: string) => void;
	clearSchedule: () => void;
	searchTripadvisor: (query: string) => Promise<void>;
	fetchLocationImages: (locationId: string) => Promise<void>;
	setTourPackage: (tour: TourPackage) => Promise<void>;
}
interface ScheduleItem {
	date?: string; // ISO format: YYYY-MM-DD
	time?: string; // Format: HH:mm (24hr)
}

export const useCRStore = create<AppState>((set, get) => ({
	// Search state
	tripSearchResults: [],
	tripSearchLoading: false,
	tripSearchError: null,
	searchCache: {},
	tourPackage: {
		tourCar: "",
		reminder: "Email",
		tourExperience: [],
		tourlength: null,
		tourtype: "Book Now",
	},
	tourSchedule: null,
	// Image state
	locationImages: [],
	locationImagesLoading: false,
	locationImagesError: null,
	imageCache: {},
	tourHistory: [],
	currentChat: null,
	setCurrentChat: (chat) => set({ currentChat: chat }),
	searchTripadvisor: async (query: string) => {
		const { searchCache } = get();

		// Return cached results if available
		if (searchCache[query]) {
			set({ tripSearchResults: searchCache[query], tripSearchLoading: false });
			return;
		}

		set({ tripSearchLoading: true, tripSearchError: null });

		try {
			const response: LocationSearchResponse = await searchTripadvisorLocation(
				query,
				process.env.EXPO_PUBLIC_TRIP_API,
			);

			const results: LocationSearchItem[] =
				response.data?.map((item: any) => ({
					location_id: item.location_id,
					name: item.name,
					address_obj: item.address_obj,
					image: item.image || item.photo?.images?.original?.url || undefined,
					description: item.description,
				})) || [];

			set((state) => ({
				tripSearchResults: results,
				searchCache: {
					...state.searchCache,
					[query]: results,
				},
				tripSearchLoading: false,
			}));
		} catch (error) {
			console.error("Search Error:", error);
			set({
				tripSearchError: "Failed to search TripAdvisor locations.",
				tripSearchResults: tourSitesStatic,
				tripSearchLoading: false,
			});
		}
	},

	// Fetch Location Images
	fetchLocationImages: async (locationId: string) => {
		const { imageCache } = get();

		// Return cached images if available
		if (imageCache[locationId]) {
			set({
				locationImages: imageCache[locationId],
				locationImagesLoading: false,
			});
			return;
		}

		set({ locationImagesLoading: true, locationImagesError: null });

		try {
			const images = await getLocationImages(
				locationId,
				process.env.EXPO_PUBLIC_TRIP_API,
			);

			set((state) => ({
				locationImages: images,
				imageCache: {
					...state.imageCache,
					[locationId]: images,
				},
				locationImagesLoading: false,
			}));
		} catch (error) {
			console.error("Image Fetch Error:", error);
			set({
				locationImagesError: `Failed to load images for location ${locationId}.`,
				locationImages: [],
				locationImagesLoading: false,
			});
		}
	},
	setTourPackage: async (tour) => {
		const currentTourPackage = get().tourPackage;
		set({ tourPackage: { ...currentTourPackage, ...tour } });
	},
	addTourToHistory: (tour: TourPackage) => {
		const newTour = {
			...tour,
			date: new Date().toISOString(),
		};
		set((state) => ({
			tourHistory: [...state.tourHistory, newTour],
		}));
	},

	addSchedule: (schedule) => {
		set((state) => ({
			tourSchedule: {
				...state.tourSchedule,
				...schedule, // merge in new date or time
			},
		}));
	},

	removeSchedule: (keyToRemove, value) => {
		set((state) => {
			if (!state.tourSchedule) return { tourSchedule: null };

			const updatedSchedule = { ...state.tourSchedule };
			if (keyToRemove === "date" || keyToRemove === "time") {
				if (updatedSchedule[keyToRemove] === value) {
					delete updatedSchedule[keyToRemove];
				}
			}
			const isEmpty = !updatedSchedule.date && !updatedSchedule.time;
			return { tourSchedule: isEmpty ? null : updatedSchedule };
		});
	},

	clearSchedule: () => {
		set({ tourSchedule: null });
	},
}));
