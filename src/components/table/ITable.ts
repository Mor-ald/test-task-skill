import { CallsApiData } from "../../ts/ApiData";
import { CallTypes } from "../../ts/CallTypes";

/**
 * Table component props
 */
export interface ITable {
	callsApiData: CallsApiData;
	callType: CallTypes;
	sortByDate: boolean;
	sortByDuration: boolean;
	onToggleSortByDate(): void;
	onToggleSortByDuration(): void;
}
