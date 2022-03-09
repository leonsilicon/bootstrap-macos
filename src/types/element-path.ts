export type ElementPathPart = {
	type: string;
	name: string;

	/**
	The type and name combined.
 	*/
	fullName: string;
};

export type ElementReference = {
	path: ElementPathPart[];
	pathString: string;
	applicationProcess: string;
	application: string;
};
