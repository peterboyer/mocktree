import { type Component, type Queries, type Deps } from "./component";

export const mock = <TComponent extends Component>(
	component: TComponent,
	queries: Required<Collect<TComponent>>
) => {
	void component;
	void queries;
	return {} as Collect<TComponent>;
};

type MapMockQueries<TQueries extends Queries> = {
	[K in keyof TQueries]:
		| QueryResponse<TQueries[K]["data"]>
		| ((
				variables: TQueries[K]["variables"]
		  ) => QueryResponse<TQueries[K]["data"]>);
};

type QueryResponse<TData> = { data: TData } | { error: string };

// collect can work on any key, e.g. "queries"
type Collect<T extends Component> = (T["queries"] extends Queries
	? MapMockQueries<T["queries"]>
	: Empty) &
	(T["deps"] extends Deps
		? Intersect<
				{
					[K in keyof T["deps"]]: Collect<T["deps"][K]>;
				}[keyof T["deps"]]
		  >
		: Empty);

const Empty = {};
type Empty = typeof Empty;

type Intersect<T> = (T extends unknown ? (t: T) => void : never) extends (
	t: infer R
) => void
	? R
	: never;
