import { makeAutoObservable } from "mobx";

class AudioPlayerStore {
	private _url = "";
	private _isPlaying = false;
	private _progress = 0;
	private _currentTime = 0;
	private _audioElement: HTMLAudioElement | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	onSetUrl = (url: string) => (this._url = url);
	onChangePlaying = (playing: boolean) => (this._isPlaying = playing);
	onChangeProgress = (progress: number) => (this._progress = progress);
	onChangeCurrentTime = (currentTime: number) => (this._currentTime = currentTime);
	onChangeAudioElement = (audioElement: HTMLAudioElement | null) => (this._audioElement = audioElement);

	get url(): string {
		return this._url;
	}

	get isPlaying(): boolean {
		return this._isPlaying;
	}

	get progress(): number {
		return this._progress;
	}

	get currentTime(): number {
		return this._currentTime;
	}

	get audioElement(): HTMLAudioElement | null {
		return this._audioElement;
	}
}

export default AudioPlayerStore;
