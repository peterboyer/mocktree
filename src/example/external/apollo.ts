export type UseQuery<TData, TVariables = undefined> = (
	...args: UseQueryArgs<TVariables>
) => UseQueryState<TData>;

export type UseLazyQuery<TData, TVariables = undefined> = (
	...args: UseQueryArgs<TVariables>
) => [fn: UseLazyQueryFn<TData>, state: UseQueryState<TData>];

type UseQueryArgs<TVariables> = TVariables extends undefined
	? [options?: UseQueryOptions<TVariables>]
	: [options: UseQueryOptions<TVariables>];

type UseQueryOptions<TVariables> = {
	skip?: boolean;
	fetchPolicy?: "network-once" | "network-only";
} & (TVariables extends undefined
	? Record<never, never>
	: { variables: TVariables });

type UseQueryState<TData> = {
	data: TData | undefined;
	loading: boolean;
};

type UseLazyQueryFn<TData> = () => Promise<TData>;
