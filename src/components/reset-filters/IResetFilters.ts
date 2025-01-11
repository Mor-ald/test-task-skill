import { CallTypes } from "../../ts/CallTypes.ts";

/**
 * ResetFilters component props
 */
export interface IResetFilters {
	value: CallTypes;
	onChangeValue(value: CallTypes): void;
}
