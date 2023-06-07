import { io, createQuery } from "@/querydeps";
import { dom } from "@/ui";
import { gql } from "@/gql";
import type {
	GetCitiesData,
	GetWeatherByCityData,
	GetWeatherByCityVariables,
} from "./inner-component.generated";

export const getCities = createQuery<"GetCities", GetCitiesData>(gql`
	query GetCities {
		cities {
			id
			name
			location {
				lat
				lng
			}
		}
	}
`);

export const getWeatherByCity = createQuery<
	"GetWeatherByCity",
	GetWeatherByCityData,
	GetWeatherByCityVariables
>(gql`
	query GetWeatherByCity($cityId: ID!) {
		weather(cityId: $cityId) {
			city {
				id
			}
			currentTemperature {
				celsius
				fahrenheit
			}
		}
	}
`);

const $ = {
	getCities,
	getWeatherByCity,
};

type Props = {
	children?: unknown[];
};

export const InnerComponent = io($, (props: Props) => {
	void props;
	const cities = $.getCities.useQuery();
	const currentCityId = cities.data?.cities[0]?.id ?? "";
	const weatherByCity = $.getWeatherByCity.useQuery({
		skip: !currentCityId,
		variables: { cityId: currentCityId },
	});
	return dom("div", [
		"Cities:",
		dom(
			"ul",
			cities.data?.cities.map((city) => dom("li", [city.name]))
		),
		"Currently selected city: ",
		cities.data?.cities.find((city) => city.id === currentCityId)?.name ?? "-",
		" with local temperature: ",
		weatherByCity.data?.weather.currentTemperature.celsius ?? "-",
		"*C",
	]);
});
