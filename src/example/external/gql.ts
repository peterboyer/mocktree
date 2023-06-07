export type QueryDocument = string;

export const gql = (
	strings: TemplateStringsArray,
	...args: string[]
): QueryDocument => {
	void args;
	return strings.join("");
};
