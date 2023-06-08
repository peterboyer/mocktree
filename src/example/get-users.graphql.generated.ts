import { type UseQuery, type UseLazyQuery } from "@/apollo";

export type GetUsersQuery = {
	users: {
		id: string;
		name: string;
	}[];
};

export type GetUsersQueryVariables = {
	filters?: {
		name: {
			startsWith: string;
		};
	};
};

export const useGetUsersQuery = {} as UseQuery<
	GetUsersQuery,
	GetUsersQueryVariables
>;
export const useGetUsersLazyQuery = {} as UseLazyQuery<
	GetUsersQuery,
	GetUsersQueryVariables
>;
