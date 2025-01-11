import { CallTypes } from "../../ts/CallTypes.ts";

/**
 * TypeSelector props
 */
export interface ITypeSelector {
	value: CallTypes;
	onChangeValue(value: CallTypes): void;
}
