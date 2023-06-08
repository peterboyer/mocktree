import { type UseQuery, type UseLazyQuery } from "@/apollo";

export type GetCitiesQuery = {
	cities: {
		id: string;
		name: string;
		location: { lat: string; lng: string };
	}[];
};

export const useGetCitiesQuery = {} as UseQuery<GetCitiesQuery>;
export const useGetCitiesLazyQuery = {} as UseLazyQuery<GetCitiesQuery>;
