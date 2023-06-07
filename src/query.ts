export type Query<
	TKey extends string = string,
	TData = unknown,
	TVariables = unknown
> = {
	key: TKey;
	data: TData;
	variables: TVariables;
};
