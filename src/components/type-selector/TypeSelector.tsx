import styles from "./TypeSelector.module.css";

import { observer } from "mobx-react-lite";
import { ITypeSelector } from "./ITypeSelector.ts";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import TypeSelectorStore from "./TypeSelectorStore.ts";
import { toJS } from "mobx";
import { CallTypes } from "../../ts/CallTypes.ts";
import ActionButton from "../action-button/ActionButton.tsx";

/**
 * TypeSelector component
 */
const TypeSelector: FC<ITypeSelector> = observer(({ value, onChangeValue }) => {
	const [store] = useState(() => TypeSelectorStore);
	const titleRef = useRef<HTMLSpanElement>(null);

	// Disable focus when calls reset filters
	useEffect(() => {
		if (value === "all") store.onChangeFocus(false);
	}, [store, value]);

	// On select value
	const onSelect = useCallback(
		(value: CallTypes) => {
			onChangeValue(value);
			store.onChangeFocus(false);
		},
		[onChangeValue, store],
	);

	// Current text of selector title
	const SelectTitleText = useCallback(() => {
		return <span className={styles[value === "all" ? "select-selected" : "select-selected-active"]}>{toJS(store.options)[value]}</span>;
	}, [store, value]);

	// Title of selector
	const SelectTitle = useCallback(() => {
		return (
			<span ref={titleRef} onClick={() => store.onChangeFocus(!toJS(store.isFocused))}>
				<div>
					<ActionButton active={toJS(store.isFocused)}>
						<SelectTitleText />
					</ActionButton>
				</div>
			</span>
		);
	}, [SelectTitleText, store]);

	// DropDown of selector
	const SelectDropDown = useCallback(() => {
		return (
			<>
				{toJS(store.isFocused) && (
					<div className={styles["select-dropdown"]}>
						<div className={styles[value === "all" ? "active" : ""]} onClick={() => onSelect("all")}>
							Все типы
						</div>
						<div className={styles[value === "incoming" ? "active" : ""]} onClick={() => onSelect("incoming")}>
							Входящие
						</div>
						<div className={styles[value === "outgoing" ? "active" : ""]} onClick={() => onSelect("outgoing")}>
							Исходящие
						</div>
					</div>
				)}
			</>
		);
	}, [onSelect, store.isFocused, value]);

	return (
		<div className={styles["select"]}>
			<SelectTitle />
			<SelectDropDown />
		</div>
	);
});

export default TypeSelector;
