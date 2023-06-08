import { type UseQuery, type UseLazyQuery } from "@/apollo";

export type GetWeatherByCityQuery = {
	weather: {
		city: { id: string };
		currentTemperature: { celsius: number; fahrenheit: number };
	};
};

export type GetWeatherByCityQueryVariables = {
	cityId: string;
};

export const useGetWeatherByCityQuery = {} as UseQuery<
	GetWeatherByCityQuery,
	GetWeatherByCityQueryVariables
>;
export const useGetWeatherByCityLazyQuery = {} as UseLazyQuery<
	GetWeatherByCityQuery,
	GetWeatherByCityQueryVariables
>;
