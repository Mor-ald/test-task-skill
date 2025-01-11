import styles from "./ResetFilters.module.css";

import { IResetFilters } from "./IResetFilters.ts";
import { observer } from "mobx-react-lite";

import { FC, useCallback } from "react";

/**
 * Reset filters for calls selector
 */
const ResetFilters: FC<IResetFilters> = observer(({ value, onChangeValue }) => {
	// On reset value
	const onReset = useCallback(() => {
		onChangeValue("all");
	}, [onChangeValue]);

	return (
		value !== "all" && (
			<div className={styles["disable-filters"]} onClick={onReset}>
				<span>Сбросить фильтры</span>
				<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_1_517)">
						<path
							className={styles["disable-filters-icon"]}
							d="M12.75 3.88125L11.8688 3L8.375 6.49375L4.88125 3L4 3.88125L7.49375 7.375L4 10.8688L4.88125 11.75L8.375 8.25625L11.8688 11.75L12.75 10.8688L9.25625 7.375L12.75 3.88125Z"
							fill="#ADBFDF"
						/>
					</g>
					<defs>
						<clipPath id="clip0_1_517">
							<rect width="15" height="15" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</div>
		)
	);
});

export default ResetFilters;
