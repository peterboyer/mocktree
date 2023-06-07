import { mock } from "@/querydeps";
import { it, render } from "@/test";
import { App } from "./app";

it("should render", () => {
	mock(App, {
		GetUsers: { data: { users: [] } },
		GetCities: { data: { cities: [] } },
		GetWeatherByCity: { error: "City doesn't exist." },
	});

	render(App());
});
