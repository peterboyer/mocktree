export const query =
	<TKey extends string, TData, TVariables = undefined>() =>
	<TTarget>(target: TTarget) =>
		target as TTarget & {
			$queries: { [Key in TKey]: Query<TKey, TData, TVariables> };
		};

export type Query<
	TKey extends string = string,
	TData = unknown,
	TVariables = unknown
> = {
	key: TKey;
	data: TData;
	variables: TVariables;
};
