import styles from "./DatePicker.module.css";

import { observer } from "mobx-react-lite";
import { IDatePicker } from "./IDatePicker.ts";
import React, { FC, useCallback, useRef, useState } from "react";
import DatePickerStore from "./DatePickerStore.ts";
import { toJS } from "mobx";
import { DatesInterval } from "../../ts/DatesInterval.ts";

/**
 * DataPicker component
 */
const DatePicker: FC<IDatePicker> = observer(({ value, onChangeValue }) => {
	const [store] = useState(() => DatePickerStore);
	const titleRef = useRef<HTMLSpanElement>(null);

	// On select value
	const onSelect = useCallback(
		(value: DatesInterval) => {
			onChangeValue(value);
			store.onChangeFocus(false);
		},
		[onChangeValue, store],
	);

	// Format date value
	const formatDateValue = useCallback((value: string) => {
		return value
			.replace(/[^0-9]/g, "") // Удаляем все нецифровые символы
			.replace(/(\d{2})(\d)/, "$1.$2") // Добавляем точку после дня
			.replace(/(\d{2})\.(\d{2})(\d)/, "$1.$2.$3") // Добавляем точку после месяца
			.substring(0, 8); // Ограничиваем ввод до 10 символов (dd.mm.yy)
	}, []);

	// On change start date value
	const onChangeStartDateValue = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			store.onChangeDateStart(formatDateValue(value));
		},
		[formatDateValue, store],
	);

	// On change end date value
	const onChangeEndDateValue = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			store.onChangeDateEnd(formatDateValue(value));
		},
		[formatDateValue, store],
	);

	// Title text of date picker
	const DatePickerTitleText = useCallback(() => {
		let title: string;

		if (typeof value === "string") title = toJS(store.options)[value];
		else title = value.join("-");

		return <span className={styles["date-picker-selected"]}>{title}</span>;
	}, [store, value]);

	return (
		<div className={styles["date-picker"]}>
			{/* Title */}
			<span ref={titleRef}>
				<div className={styles["date-picker-title"]}>
					{/* Left arrow */}
					<svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0_9028_1441)">
							<path d="M6.175 15.825L2.35833 12L6.175 8.175L5 7L0 12L5 17L6.175 15.825Z" fill="#ADBFDF" />
						</g>
						<defs>
							<clipPath id="clip0_9028_1441">
								<rect width="16" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>

					<div className={styles["date-picker-date"]} onClick={() => store.onChangeFocus(!toJS(store.isFocused))}>
						{/* Calendar */}
						<svg className={styles["date-picker-icon"]} width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z"
								fill="#ADBFDF"
							/>
						</svg>
						<DatePickerTitleText />
					</div>

					{/* Right arrow	*/}
					<svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0_9028_1447)">
							<path d="M9.58997 15.825L13.4066 12L9.58997 8.175L10.765 7L15.765 12L10.765 17L9.58997 15.825Z" fill="#ADBFDF" />
						</g>
						<defs>
							<clipPath id="clip0_9028_1447">
								<rect width="17" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</div>
			</span>

			{/* DropDown */}
			{toJS(store.isFocused) && (
				<div className={styles["date-picker-dropdown"]}>
					<div className={styles[value === "3 days" ? "active" : ""]} onClick={() => onSelect("3 days")}>
						3 дня
					</div>
					<div className={styles[value === "weak" ? "active" : ""]} onClick={() => onSelect("weak")}>
						Неделя
					</div>
					<div className={styles["disable"]}>Месяц</div>
					<div className={styles["disable"]}>Год</div>
					<span className={styles["date-picker-inputs-container"]}>
						<span>Указать даты</span>
						<div className={styles["date-picker-inputs"]}>
							<div>
								<input
									className={styles["date-picker-input"]}
									type="text"
									placeholder="__.__.__"
									value={toJS(store.dateStart)}
									onChange={onChangeStartDateValue}
								/>
								-
								<input
									className={styles["date-picker-input"]}
									type="text"
									placeholder="__.__.__"
									value={toJS(store.dateEnd)}
									onChange={onChangeEndDateValue}
								/>
							</div>
							<div>
								<svg
									className={styles["date-picker-icon"]}
									width="16"
									height="18"
									viewBox="0 0 16 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z"
										fill="#ADBFDF"
									/>
								</svg>
							</div>
						</div>
					</span>
				</div>
			)}
		</div>
	);
});

export default DatePicker;
