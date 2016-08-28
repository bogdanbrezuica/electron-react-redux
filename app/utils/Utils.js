import { any } from "underscore";

export function hasIllegalCharacters(str) {
	const illegalCharacters = ['/', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '\\'];
	return any(illegalCharacters, char => str.indexOf(char) !== -1);
}