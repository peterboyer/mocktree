import { type Query } from "./component";

export type QueryModule<TKey extends string, TData, TVariables> = {
	query: string;
	useQuery: UseQuery<TData, TVariables>;
	queries: Queries<TKey, TData, TVariables>;
};

export const createQueryModule = <
	TKey extends string,
	TData,
	TVariables = undefined
>(
	query: string
): QueryModule<TKey, TData, TVariables> => {
	const useQuery: UseQuery<TData, TVariables> = (...args) => {
		const [options] = args;
		void options;
		return {
			data: undefined,
			loading: true,
		};
	};

	const queries = {} as Queries<TKey, TData, TVariables>;

	return {
		query,
		useQuery,
		queries,
	};
};

// UseQuery

type UseQuery<TData, TVariables> = (
	...args: UseQueryArgs<TVariables>
) => UseQueryReturn<TData>;

type UseQueryArgs<TVariables> = TVariables extends undefined
	? [options?: UseQueryOptions<TVariables>]
	: [options: UseQueryOptions<TVariables>];

type UseQueryOptions<TVariables> = {
	skip?: boolean;
} & (TVariables extends undefined
	? Record<never, never>
	: { variables: TVariables });

type UseQueryReturn<TData> = {
	data: TData | undefined;
	loading: boolean;
};

// Queries

type Queries<TKey extends string, TData, TVariables> = {
	[Key in TKey]: Query<TKey, TData, TVariables>;
};
