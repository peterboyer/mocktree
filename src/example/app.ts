import { mt } from "@/mocktree/apollo";
import { MyComponent } from "./my-component";

const $ = {
	MyComponent,
};

type Props = Record<never, never>;

export const App = mt.component<typeof $>()((props?: Props) => {
	void props;

	return $.MyComponent();
});
