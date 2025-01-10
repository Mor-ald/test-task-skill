import axios from "axios";

/**
 * Fetch calls from API (from dateStart to dateEnd)
 * @param dateStart - Fetch from this date (YYYY-MM-DD)
 * @param dateEnd - Fetch to this date (YYYY-MM-DD)
 */
export async function fetchCallsData(dateStart: string, dateEnd: string): Promise<void> {
	const url = `${import.meta.env.VITE_APP_CALLS_API_PATH}?date_start=${dateStart}&date_end=${dateEnd}`;

	return await axios
		.post(`${url}`, null, {
			headers: {
				Authorization: import.meta.env.VITE_APP_TOKEN,
			},
		})
		.then((res) => res.data)
		.catch((e) => console.log(e));
}

/**
 * Fetch record of call
 * @param recordId - ID of record
 * @param partnershipId - ID of partnership
 */
export async function fetchRecord(recordId: string, partnershipId: string): Promise<void> {
	const url = `${import.meta.env.VITE_APP_RECORD_API_PATH}?record=${recordId}&partnership_id=${partnershipId}`;

	return await axios
		.post(`${url}`, null, {
			headers: {
				Authorization: import.meta.env.VITE_APP_TOKEN,
				"Content-type": "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3,audio/mpeg3",
				"Content-Transfer-Encoding": "binary",
				"Content-Disposition": "filename='record.mp3'",
			},
		})
		.then((res) => res.data)
		.catch((e) => console.log(e));
}
