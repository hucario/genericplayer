/*
 * Default extension class definitions.
 *
 */




interface MostBasic {
	complete: boolean,
	id: string
}

interface PartialItem<Type> extends MostBasic {
	fetch: () => Type,
}


class BasicItem implements MostBasic {
	complete: boolean;
	id: string

	constructor(opts: BasicInfo) {
		this.complete = opts.complete;
		this.id = opts.id;
	}
}

interface BasicInfo extends MostBasic {
	url?: string,
	icon?: string,
	extension: Extension | PartialItem<Extension>
}

interface ArtistInterface extends BasicInfo {
	name: string
}

class Artist extends BasicItem implements ArtistInterface {
	name: string;
	url?: string;
	extension: Extension | PartialItem<Extension>
	icon?: string

	constructor(opts: ArtistInterface) {
		super(opts);
		this.name = opts.name;
		this.url = opts?.url;
		this.extension = opts.extension;
	}
}

interface AlbumInterface extends BasicInfo {
	title: string
}


class Album extends BasicItem implements AlbumInterface {
	title: string
	url?: string
	icon?: string
	extension: Extension | PartialItem<Extension>
	constructor(opts: AlbumInterface) {
		super(opts);
		this.title = opts.title;
		this.url = opts?.url;
		this.icon = opts?.icon;
		this.extension = opts.extension;
	}
	async getPlaylist() {
		
	}
}

interface ExtInterface extends MostBasic {
	isLoggedIn: boolean,
	name: string,
	icon: string,
	colors: {
		normal: string,
		hover: string
	}
}

class Extension implements ExtInterface {
	name: string
	icon: string
	isLoggedIn: boolean
	complete: boolean
	id: string
	colors: {
		normal: string,
		hover: string
	}

	constructor(opts: ExtInterface) {
		Object.assign(this, opts);
		this.name = opts.name;
		this.colors = opts.colors || {
			normal: '#630a0a',
			hover: '#ad2727'
		}
		this.isLoggedIn = opts.isLoggedIn;
		this.icon = opts?.icon || "";
		this.complete = true;
		this.id = opts.id;
	}
}

interface SongInterface extends BasicInfo {
	title: string,
	artist: Artist | PartialItem<Artist>
	album: Album | PartialItem<Album>
}

class Song extends BasicItem implements SongInterface{
	title: string
	artist: Artist | PartialItem<Artist>
	album: Album | PartialItem<Album>
	extension: Extension | PartialItem<Extension>
	complete: boolean


	constructor(opts: SongInterface) {
		super(opts);
		Object.assign(this, opts)
		this.complete = opts.complete;
		this.title = opts.title;
		this.artist = opts.artist;
		this.album = opts.album;
		this.extension = opts.extension;
	}
	async like() {

	}
	async dislike() {

	}
	async download() {

	}
}

interface StationInterface extends BasicInfo {
	title: string
}

class Station extends BasicItem implements StationInterface {
	title: string;
	extension: Extension | PartialItem<Extension>;

	constructor(opts: StationInterface) {
		super(opts);
		Object.assign(this, opts);
		this.title = opts.title;
		this.extension = opts.extension;
	}
	play() {

	}
}


export { 
	Extension,
	Song,
	Station,
	Artist,
	Album
}