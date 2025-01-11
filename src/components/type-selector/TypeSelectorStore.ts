import { makeAutoObservable } from "mobx";

/**
 * Store of TypeSelector component
 */
class TypeSelectorStore {
	private _options = {
		all: "Все типы",
		incoming: "Входящие",
		outgoing: "Исходящие",
	};

	private _isFocused = false;

	constructor() {
		makeAutoObservable(this);
	}

	onChangeFocus = (focus: boolean) => (this._isFocused = focus);

	get options(): { all: string; incoming: string; outgoing: string } {
		return this._options;
	}

	get isFocused(): boolean {
		return this._isFocused;
	}
}

export default new TypeSelectorStore();
