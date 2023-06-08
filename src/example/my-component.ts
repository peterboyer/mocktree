import { mt } from "@/mocktree/apollo";
import { dom } from "@/ui";
import { useGetUsersQuery } from "./get-users.graphql.generated";
import { InnerComponent } from "./inner-component";

const $ = {
	useGetUsersQuery: mt.hook<"GetUsers">()(useGetUsersQuery),
	InnerComponent,
};

type Props = {
	key?: string;
	disabled?: boolean;
};

export const MyComponent = mt.component<typeof $>()((props?: Props) => {
	void props;

	const { data } = $.useGetUsersQuery({ variables: {} });
	return $.InnerComponent({
		children: [
			dom("ul", data?.users.map((user) => dom("li", [user.name])).join()),
		],
	});
});
