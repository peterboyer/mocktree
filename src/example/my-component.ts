import { io, createQuery } from "@/querydeps";
import { dom } from "@/ui";
import { gql } from "@/gql";
import type { GetUsersData, GetUsersVariables } from "./my-component.generated";
import { InnerComponent } from "./inner-component";

export const getUsers = createQuery<
	"GetUsers",
	GetUsersData,
	GetUsersVariables
>(gql`
	query GetUsers($filters: GetUsersFilters) {
		users(filters: $filters) {
			id
			name
		}
	}
`);

const $ = {
	getUsers,
	InnerComponent,
};

type Props = {
	key?: string;
	disabled?: boolean;
};

export const MyComponent = io($, (props?: Props) => {
	void props;

	const query = $.getUsers.useQuery({ variables: {} });
	return $.InnerComponent({
		children: [
			dom("ul", query.data?.users.map((user) => dom("li", [user.name])).join()),
		],
	});
});
