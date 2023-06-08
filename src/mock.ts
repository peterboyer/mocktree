import {
	type Component,
	type ComponentQueries,
	type ComponentChildren,
} from "./component";

export const mock = <TComponent extends Component>(
	component: TComponent,
	queries: Required<Collect<TComponent>>
) => {
	void component;
	void queries;
	return {} as Collect<TComponent>;
};

type Collect<T extends Component> = (T["$queries"] extends ComponentQueries
	? MapMockQueries<T["$queries"]>
	: Record<never, never>) &
	(T["$children"] extends ComponentChildren
		? Intersect<
				{
					[K in keyof T["$children"]]: Collect<T["$children"][K]>;
				}[keyof T["$children"]]
		  >
		: Record<never, never>);

type MapMockQueries<TQueries extends ComponentQueries> = {
	[K in keyof TQueries]:
		| QueryResponse<TQueries[K]["data"]>
		| ((
				variables: TQueries[K]["variables"]
		  ) => QueryResponse<TQueries[K]["data"]>);
};

type QueryResponse<TData> = { data: TData } | { error: string };

type Intersect<T> = (T extends unknown ? (t: T) => void : never) extends (
	t: infer R
) => void
	? R
	: never;
