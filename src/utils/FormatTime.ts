/**
 * Function to format time from number to string (min:sec)
 * @param time - Time in number
 */
export default function formatTime(time: number) {
	const min = `${Math.floor(time / 60)}`;
	const sec = time % 60 < 10 ? `0${time % 60}` : `${time % 60}`;

	return `${min}:${sec}`;
}
