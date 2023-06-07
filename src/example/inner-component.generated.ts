export type GetCitiesData = {
	cities: {
		id: string;
		name: string;
		location: { lat: string; lng: string };
	}[];
};

export type GetWeatherByCityData = {
	weather: {
		city: { id: string };
		currentTemperature: { celsius: number; fahrenheit: number };
	};
};

export type GetWeatherByCityVariables = {
	cityId: string;
};
