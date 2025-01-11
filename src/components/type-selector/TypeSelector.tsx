import styles from "./TypeSelector.module.css";

import { observer } from "mobx-react-lite";
import { ITypeSelector } from "./ITypeSelector.ts";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import TypeSelectorStore from "./TypeSelectorStore.ts";
import { toJS } from "mobx";
import { CallTypes } from "../../ts/CallTypes.ts";

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
		return (
			<span
				className={styles[value === "all" ? "select-selected" : "select-selected-active"]}
				onClick={() => store.onChangeFocus(!toJS(store.isFocused))}
			>
				{toJS(store.options)[value]}
			</span>
		);
	}, [store, value]);

	// Current arrow of selector
	const SelectArrow = useCallback(() => {
		return store.isFocused ? (
			<div className={styles["select-arrow"]} onClick={() => store.onChangeFocus(!toJS(store.isFocused))}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_1_866)">
						<path d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z" fill="#002CFB" />
					</g>
					<defs>
						<clipPath id="clip0_1_866">
							<rect width="24" height="24" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</div>
		) : (
			<div className={styles["select-arrow"]} onClick={() => store.onChangeFocus(!toJS(store.isFocused))}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_1_863)">
						<path opacity="0.8" d="M7.41 8.58997L12 13.17L16.59 8.58997L18 9.99997L12 16L6 9.99997L7.41 8.58997Z" fill="#ADBFDF" />
					</g>
					<defs>
						<clipPath id="clip0_1_863">
							<rect width="24" height="24" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</div>
		);
	}, [store]);

	// Title of selector
	const SelectTitle = useCallback(() => {
		return (
			<span ref={titleRef}>
				<div className={styles["select-title"]}>
					<SelectTitleText />
					<SelectArrow />
				</div>
			</span>
		);
	}, [SelectArrow, SelectTitleText]);

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
