import { call, put, takeEvery } from 'redux-saga/effects'
import { Song, Album, Artist } from '../../ext/Extension';
import ytsr from '../../ytsr'
import ytdl from 'ytdl-core';

async function playSong(payload: Song) {
	let newState: {
		playState: {
			audio?: HTMLAudioElement,
			loading: boolean,
			url?: string
		}
	} = {
		playState: {
			loading: false
		}
	}


	// @ts-ignore
	let b = await ytsr(payload.title + ' ' + payload.artist.name + ' audio')
	b = b.items;
	b = b.filter((e: {
		id: {
			kind: string
		}
	}) => {
		return e.id.kind === 'youtube#video';
	})
	const e = await ytdl.getInfo('https://www.youtube.com/watch?v=' + b[0].id.videoId);
	newState.playState.url = ytdl.chooseFormat(e.formats, { quality: 'highestaudio'}).url;
	newState.playState.audio = new Audio();
	newState.playState.audio.src = newState.playState.url;
	newState.playState.audio.addEventListener('canplay', () => {
		if (newState.playState.audio) {
			// i don't know how there wouldn't be but this makes tslint shut up so
			newState.playState.audio.play();
		}
		put({type: "NOT_LOADING", payload: {}})
	});
	return newState;
}

function* sCPlaying(action: any): any {
	const payload = action.payload;
	try {
		yield put({type: "ATTEMPTING_PLAYING_SONG", payload})
		const newState = yield call(playSong, action.payload);
		yield put({type: "PLAY_SONG_SUCCEEDED", payload: newState});
	} catch (e) {
		yield put({type: "PLAY_SONG_FAILED", message: e.message});
	}
}

function* mySaga() {
  yield takeEvery("SET_CURRENTLY_PLAYING", sCPlaying);
}

export default mySaga;