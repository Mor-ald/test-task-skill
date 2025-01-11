import { DatesInterval } from "../../ts/DatesInterval.ts";

/**
 * DataPicker props
 */
export interface IDatePicker {
	value: DatesInterval;
	onChangeValue(value: DatesInterval): void;
}
