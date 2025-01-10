import { DatesInterval } from "../ts/DatesInterval.ts";
import createDate from "./CreateDate.ts";

/**
 * Get start (YYYY-MM-DD) and end (YYYY-MM-DD) dates from interval
 * @param interval - Interval of dates ("3 days" | "weak" | "month" | "year" | [YYYY-MM-DD, YYYY-MM-DD])
 */
export default function getDatesByInterval(interval: DatesInterval) {
	let startDate = "";
	let endDate = "";
	const date = new Date();

	const getStartDate = (days: number) => {
		const newDate = new Date();
		newDate.setDate(newDate.getDate() - days);
		return newDate;
	};

	switch (interval) {
		case "3 days": {
			endDate = createDate(date);
			startDate = createDate(getStartDate(2));
			break;
		}
		case "weak": {
			endDate = createDate(date);
			startDate = createDate(getStartDate(6));
			break;
		}
		default: {
			endDate = createDate(new Date(interval[1]));
			startDate = createDate(new Date(interval[0]));
		}
	}

	return [startDate, endDate];
}
