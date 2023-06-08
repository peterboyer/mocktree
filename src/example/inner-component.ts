import { mt } from "@/mocktree/apollo";
import { dom } from "@/ui";
import { useGetCitiesQuery } from "./get-cities.graphql.generated";
import { useGetWeatherByCityQuery } from "./get-weather-by-city.graphql.generated";

const $ = {
	useGetCitiesQuery: mt.hook<"GetCities">()(useGetCitiesQuery),
	useGetWeatherByCityQuery: mt.hook<"GetWeatherByCity">()(
		useGetWeatherByCityQuery
	),
};

type Props = {
	children?: unknown[];
};

export const InnerComponent = mt.component<typeof $>()((props: Props) => {
	void props;
	const cities = $.useGetCitiesQuery();
	const currentCityId = cities.data?.cities[0]?.id ?? "";
	const weatherByCity = $.useGetWeatherByCityQuery({
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
