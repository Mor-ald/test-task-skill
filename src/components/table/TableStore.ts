import { makeAutoObservable } from "mobx";
import { TableData } from "../../ts/TableData";

/**
 * Store of table component
 */
class TableStore {
	private _data: TableData = [];

	constructor() {
		makeAutoObservable(this);
	}

	onChangeData = (data: TableData) => (this._data = data);

	get data(): TableData {
		return this._data;
	}
}

export default new TableStore();
