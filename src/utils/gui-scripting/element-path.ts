import type {
	ElementPathPart,
	ElementReference,
} from '~/types/element-path.js';

export function createElementReference(
	elementPathString: string
): ElementReference {
	const pathPartStrings: string[] = [];

	let curIndex = 0;
	let curPathPartIndex = 0;
	let isQuotationOpen = false;
	while (elementPathString[curIndex] !== undefined) {
		const curChar = elementPathString[curIndex];

		if (curChar === '\\') {
			// Skip the escape character
			curIndex += 2;
			continue;
		}

		if (curChar === '"') {
			isQuotationOpen = !isQuotationOpen;
		}

		if (
			!isQuotationOpen &&
			curChar === ' ' &&
			elementPathString.slice(curIndex, curIndex + 4) === ' of '
		) {
			pathPartStrings.push(elementPathString.slice(curPathPartIndex, curIndex));
			curIndex += 4;
			curPathPartIndex = curIndex;
			continue;
		}

		curIndex += 1;
	}

	pathPartStrings.push(elementPathString.slice(curPathPartIndex));

	console.log(pathPartStrings);

	const pathParts: ElementPathPart[] = pathPartStrings.map((pathPartString) => {
		// If the name is a string
		if (pathPartString.endsWith('"')) {
			const stringStart = pathPartString.indexOf('"');
			// Don't include the `"` characters
			return {
				name: pathPartString.slice(stringStart + 1, -1),
				type: pathPartString.slice(0, stringStart - 1),
				fullName: pathPartString,
			};
		}
		// Otherwise, the name of the element is a number
		else {
			const lastSpaceIndex = pathPartString.lastIndexOf(' ');
			return {
				name: pathPartString.slice(lastSpaceIndex + 1),
				type: pathPartString.slice(0, lastSpaceIndex),
				fullName: pathPartString,
			};
		}
	});

	console.log('path', pathParts);

	return {
		application: pathParts.find((part) => part.type === 'application')!.name,
		applicationProcess: pathParts.find(
			(part) => part.type === 'application process'
		)!.name,
		path: pathParts,
		pathString: elementPathString,
	};
}

export function createElementReferences(elementPathStrings: string[]) {
	return elementPathStrings.map((elementPathString) =>
		createElementReference(elementPathString)
	);
}
