import { Query } from "./query";

export const component =
	<TChildren extends ComponentChildren>() =>
	<TTarget>(target: TTarget) => {
		return target as TTarget & { $children: TChildren };
	};

export type Component = {
	$queries?: ComponentQueries;
	$children?: ComponentChildren;
};

export type ComponentQueries = Record<string, Query>;

export type ComponentChildren = Record<string, Component>;
