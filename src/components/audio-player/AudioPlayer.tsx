import styles from "./AudioPlayer.module.css";

import IAudioPlayer from "./IAudioPlayer.ts";
import { FC, useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import AudioStore from "./AudioPlayerStore.ts";
import { toJS } from "mobx";
import formatTime from "../../utils/FormatTime.ts";
import { fetchRecord } from "../../services/FetchData.ts";

/**
 * AudioPlayer component
 */
const AudioPlayer: FC<IAudioPlayer> = observer(({ recordId, partnershipId, time }) => {
	const [store] = useState(() => new AudioStore());

	// Initialization audio object
	const initAudio = useCallback(() => {
		const newAudio = new Audio(toJS(store.url));

		newAudio.onloadedmetadata = () => store.onChangeProgress(0);

		newAudio.ontimeupdate = () => {
			store.onChangeCurrentTime(newAudio.currentTime);
			store.onChangeProgress((newAudio.currentTime / newAudio.duration) * 100);
		};

		newAudio.onended = () => {
			store.onChangePlaying(false);
			store.onChangeCurrentTime(time);
			store.onChangeProgress(0);
		};

		store.onChangeAudioElement(newAudio);
	}, [store, time]);

	// Play audio
	const onPlay = useCallback(() => {
		const audio = toJS(store.audioElement);
		if (audio && !toJS(store.isPlaying)) {
			store.onChangePlaying(true);
			audio.play().then();
		}
	}, [store]);

	// Pause audio
	const onPause = useCallback(() => {
		const audio = toJS(store.audioElement);
		if (audio && toJS(store.isPlaying)) {
			store.onChangePlaying(false);
			audio.pause();
		}
	}, [store]);

	// Reset what listened
	const onReset = useCallback(() => {
		const audio = toJS(store.audioElement);
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
			store.onChangePlaying(false);
			store.onChangeProgress(0);
			store.onChangeCurrentTime(time);
		}
	}, [store, time]);

	// Load record from api
	const loadRecord = useCallback(async () => {
		const record = await fetchRecord(recordId, partnershipId);
		if (record) {
			const url = URL.createObjectURL(record);

			store.onSetUrl(url);
			store.onChangeCurrentTime(time);
			initAudio();
		}
	}, [initAudio, partnershipId, recordId, store, time]);

	useEffect(() => {
		loadRecord().then();
	}, [loadRecord]);

	// AudioTime component
	const AudioTime = useCallback(() => {
		const lTime = formatTime(toJS(store.currentTime)).split(".")[0];
		return <span className={styles["audio-player-time"]}>{lTime}</span>;
	}, [store.currentTime]);

	// Play icon component
	const PlayIcon = useCallback(() => {
		return (
			<svg onClick={onPlay} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="24" height="24" rx="12" fill="white" />
				<path
					d="M9.28742 7.06938C9.3761 7.02316 9.47535 7 9.57475 7C9.67389 7 9.77311 7.02316 9.86218 7.06938L16.7125 11.5519C16.8901 11.6442 17 11.8152 17 12.0001C17 12.1849 16.8904 12.3559 16.7125 12.4481L9.86218 16.9308C9.68439 17.0231 9.46523 17.0231 9.28757 16.9308C9.10976 16.8382 9 16.6672 9 16.4825V7.51755C9 7.33278 9.10958 7.16182 9.28742 7.06938Z"
					fill="#002CFB"
				/>
			</svg>
		);
	}, [onPlay]);

	// Pause icon component
	const PauseIcon = useCallback(() => {
		return (
			<svg onClick={onPause} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="24" height="24" rx="12" fill="white" />
				<path d="M8 16H10.6667V8H8V16ZM13.3333 8V16H16V8H13.3333Z" fill="#002CFB" />
			</svg>
		);
	}, [onPause]);

	// AudioIcon component
	const AudioIcon = useCallback(() => {
		return toJS(store.isPlaying) ? <PauseIcon /> : <PlayIcon />;
	}, [PauseIcon, PlayIcon, store.isPlaying]);

	// Progress component
	const Progress = useCallback(() => {
		return (
			<div className={styles["audio-player-progress"]}>
				<div className={styles["audio-player-progress-indicator"]} style={{ width: `${toJS(store.progress)}%` }}></div>
			</div>
		);
	}, [store.progress]);

	// SaveIcon component
	const SaveIcon = useCallback(() => {
		return (
			<svg className={styles["audio-player-save"]} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6 20H19V18.1176H6V20ZM19 9.64706H15.2857V4H9.71429V9.64706H6L12.5 16.2353L19 9.64706Z" fill="#ADBFDF" />
			</svg>
		);
	}, []);

	// ResetIcon component
	const ResetIcon = useCallback(() => {
		return (
			<svg
				className={styles["audio-player-reset"]}
				onClick={onReset}
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clipPath="url(#clip0_1_258)">
					<path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#ADBFDF" />
				</g>
				<defs>
					<clipPath id="clip0_1_258">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		);
	}, [onReset]);

	return (
		<div className={styles["audio-player"]}>
			<AudioTime />
			<AudioIcon />
			<Progress />
			<SaveIcon />
			<ResetIcon />
		</div>
	);
});

export default AudioPlayer;
