# `mock(tree)`

Dependency-aware, type-safe response mocks for TypeScript.

```ts
import { mt, mock } from "mocktree";

* App ................................. (mt.component)
|---* MyComponent ..................... (mt.component)
    |---* useGetUsersQuery ............ (mt.query)
    |---* InnerComponent .............. (mt.component)
        |---* useGetCitiesQuery ....... (mt.query)
        |---* useGetWeatherByCityQuery  (mt.query)

mock(InnerComponent, {
    GetCities: { data: { ... } },
});
^ Error: "GetWeatherByCity" is missing.

mock(MyComponent, {
    GetCities: { data: { ... } },
    GetWeatherByCity: { data: { ... } },
});
^ Error: "GetUsers" is missing.

mock(App, {
    GetUsers: { data: { users: { id: 123 } } },
                        ^ Error: not assignable to array { id: number }[].
    GetCities: { error: "..." },
    GetWeatherByCity: ({ cityId }) => ({ data: ... }),
});
```

## Primitives

### `mt.query`

A framework-agnostic primitive that anotates an object or function with a
network query that it may emit and should be mocked when testing.

Instead of using `mt.query` directly, consider using:

- React Apollo: `mt.hook` from "mocktree/apollo"

```ts
import { mt } from "mocktree";

const getUsersFn = () => fetch(/* ... */);

export const getUsers = mt.query<
	"GetUsers",
	GetUsersQuery,
	GetUsersQueryVariables
>()(getUsersFn);
```

### `mt.component`

A framework-agnostic primitive that anotates an object or function with any
`mt.query` or `mt.component` dependencies that are used in it's implementation.

This makes it possible to recursively infer all network queries that a
component needs to mock based on its children and its' childrens' children etc.

```ts
import { mt } from "mocktree";

const $ = {
	getUsersFn,
};

const MyComponent = mt.component<typeof $>()(() => {
	const onClick = async () => {
		const { data } = await $.getUsersFn();
		/* ... */
	};
	/* ... */
});
```

### `mock`

TODO: Will probably have to be a framework-dependent untility:

- Given a `mt.component`:
  - map the queries to Mock Service Worker handlers;
  - map the queries to a `mocks` object for Apollo's MockedProvider;
  - etc...

```ts
import { mock } from "mocktree";
import { MyComponent } from "./my-component";

it("should show an empty state if no users", () => {
	mock(MyComponent, {
		GetUsers: { data: { users: [] } },
	});
	render(MyComponent);
	/* ... */
});

it("should show an error and retry on click", () => {
	mock(MyComponent, {
		GetUsers: { error: "Internal Service Error" },
	});
	render(MyComponent);
	/* ... */
});
```

And if a new query dependency is added/updated/removed, all tests affected
mocks will report type errors.

```ts
it("...", () => {
    // Incomplete mock.
	mock(MyComponent, {});
                      ^ Error: "GetUsers" is missing.
	render(MyComponent);
	/* ... */
})
```

## React Apollo

## `mt.hook` (`"mocktree/apollo"`)

```ts
import { mt } from "mocktree/apollo";
import { useGetUsersQuery } from "./get-users.generated.ts";

const $ = {
	useGetUsersQuery: mt.hook<"GetUsers">()(useGetUsersQuery),
};

const MyComponent = mt.component<typeof $>()(() => {
	const { data } = $.useGetUsersQuery();
	/* ... */
});
```
