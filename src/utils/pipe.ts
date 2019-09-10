/**
 * Takes in an array of functions, pipes their result
 *
 * @example
 *
 * pipe('ts boilerplate', onCapital, onRemoveSpaces); // TSBOILERPLATE
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pipe = <T>(value: T, ...func: ((val: any) => any)[]): any => func.reduce((result, cf): any => cf(result), value);

export default pipe;
