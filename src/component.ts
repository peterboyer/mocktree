export type Component = {
	queries?: Queries;
	deps?: Deps;
};

export type Queries = Record<string, Query>;
export type Deps = Record<string, Component>;

export type Query<
	TKey extends string = string,
	TData = unknown,
	TVariables = unknown
> = {
	key: TKey;
	data: TData;
	variables: TVariables;
};

export const io = <T, TDeps extends Deps>(deps: TDeps, fn: T) => {
	void deps;
	return fn as T & { deps: TDeps };
};
