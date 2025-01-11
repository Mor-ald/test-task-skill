import { makeAutoObservable } from "mobx";

/**
 * Store of DatePicker component
 */
class DatePickerStore {
	private _options = {
		"3 days": "3 дня",
		weak: "Неделя",
		month: "Месяц",
		year: "Год",
	};

	private _isFocused = false;

	private _dateStart = "";
	private _dateEnd = "";

	constructor() {
		makeAutoObservable(this);
	}

	onChangeFocus = (focus: boolean) => (this._isFocused = focus);
	onChangeDateStart = (date: string) => (this._dateStart = date);
	onChangeDateEnd = (date: string) => (this._dateEnd = date);

	get options(): { month: string; year: string; "3 days": string; weak: string } {
		return this._options;
	}
	get isFocused(): boolean {
		return this._isFocused;
	}

	get dateStart(): string {
		return this._dateStart;
	}

	get dateEnd(): string {
		return this._dateEnd;
	}
}

export default new DatePickerStore();
