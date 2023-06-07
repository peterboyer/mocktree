import { io } from "@/querydeps";
import { MyComponent } from "./my-component";

const $ = { MyComponent };

type Props = Record<never, never>;

export const App = io($, (props?: Props) => {
	void props;

	return $.MyComponent();
});
