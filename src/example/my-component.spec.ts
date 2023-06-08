import { mock } from "@/mocktree";
import { mt } from "@/mocktree/apollo";
import { describe, it, render, renderHook } from "@/test";
import { MyComponent } from "./my-component";
import { useGetUsersQuery } from "./get-users.graphql.generated";

describe("getUsers", () => {
	it("should have correct types", () => {
		const $ = mock(mt.hook<"GetUsers">()(useGetUsersQuery), {
			GetUsers: { data: { users: [] } },
		});
		type K$ = keyof typeof $;
		void $ as unknown as K$;

		renderHook(useGetUsersQuery);
	});
});

describe("MyComponent", () => {
	it("should have correct types", () => {
		const $ = mock(MyComponent, {
			GetUsers: ({ filters }) => ({
				data: {
					users: [{ id: "123", name: filters?.name.startsWith ?? "Foo" }],
				},
			}),
			GetCities: { error: "Something went wrong." },
			GetWeatherByCity: ({ cityId }) => ({
				data: {
					weather: {
						city: { id: cityId },
						currentTemperature: { celsius: 21, fahrenheit: 70 },
					},
				},
			}),
		});
		type K$ = keyof typeof $;
		void $ as unknown as K$;

		render(MyComponent);
	});
});
