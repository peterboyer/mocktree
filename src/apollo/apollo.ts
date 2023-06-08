import { query } from "../query";

export const hook =
	<TKey extends string>() =>
	<
		THook extends Hook<TData, TVariables>,
		TData = ReturnType<THook>["data"],
		TVariables = NonNullable<Parameters<THook>[0]>["variables"]
	>(
		hook: THook
	) =>
		query<TKey, NonNullable<TData>, TVariables>()(hook);

type Hook<TData, TVariables> = (
	options: TVariables extends undefined
		? { variables?: never }
		: { variables: TVariables }
) => { data: TData };
