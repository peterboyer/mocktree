export type GetUsersData = {
	users: {
		id: string;
		name: string;
	}[];
};

export type GetUsersVariables = {
	filters?: {
		name: {
			startsWith: string;
		};
	};
};
