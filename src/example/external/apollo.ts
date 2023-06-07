import { type QueryDocument } from "./gql";

export const useQuery = <TData, TVariables>(
	query: QueryDocument,
	options: QueryOptions<TVariables>
): QueryState<TData> => {
	void query;
	void options;
	return {
		data: undefined,
		loading: true,
	};
};

type QueryOptions<TVariables> = {
	variables: TVariables;
	fetchPolicy?: "network-once" | "network-only";
};

type QueryState<TData> = {
	data: TData | undefined;
	loading: boolean;
};
