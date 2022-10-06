export function isObject(item: any): item is object {
	return item && typeof item === 'object' && !Array.isArray(item);
}

export function isUndefined(item: any): item is undefined {
	return typeof item === 'undefined';
}

export function attachISODateTime(name: string) {
	return name.concat(`.${new Date().toISOString().split('T')[0]}`);
}

export function isNegative(number: Number): boolean {
	return typeof number === 'number' && Math.sign(number) === -1 ? true : false;
}
