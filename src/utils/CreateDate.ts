/**
 * Function to create string date (format YYYY-MM-DD) from date as string or from object new Date()
 * @param date - A optional string date
 * @return {string}
 */
const createDate = (date: Date): string => {
	const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
};

export default createDate;
