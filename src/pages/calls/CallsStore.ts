import { CallsApiData } from "../../ts/ApiData.ts";
import { makeAutoObservable } from "mobx";
import { CallTypes } from "../../ts/CallTypes.ts";
import { DatesInterval } from "../../ts/DatesInterval.ts";

/**
 * Store of call's page
 */
class CallsStore {
	private _callsAPIData: CallsApiData | null = null;
	private _selectedCallType: CallTypes = "all";
	private _selectedDatesInterval: DatesInterval = "3 days";
	private _sortByDate = false;
	private _sortByDuration = false;

	constructor() {
		makeAutoObservable(this);
	}

	onChangeData = (data: CallsApiData | null) => (this._callsAPIData = data);
	onChangeCallType = (type: CallTypes) => (this._selectedCallType = type);
	onChangeDatesInterval = (interval: DatesInterval) => (this._selectedDatesInterval = interval);

	onToggleSortByDate = () => (this._sortByDate = !this._sortByDate);
	onToggleSortByDuration = () => (this._sortByDuration = !this._sortByDuration);

	get callsAPIData(): CallsApiData | null {
		return this._callsAPIData;
	}

	get selectedCallType(): CallTypes {
		return this._selectedCallType;
	}

	get selectedDatesInterval(): DatesInterval {
		return this._selectedDatesInterval;
	}

	get sortByDate(): boolean {
		return this._sortByDate;
	}

	get sortByDuration(): boolean {
		return this._sortByDuration;
	}
}

export default new CallsStore();
