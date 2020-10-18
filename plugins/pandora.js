 /*
 * Pandora extension.
 *
 */



class PandoraExtension extends Extension {
	allowsRatings = true
	logo = "https://1.gravatar.com/avatar/ab748872b9461554f80c9f1326727984?s=128"
	name = "Pandora"
	isLoggedIn = false
	ok = true
	partnerAuthToken = ""
	authToken = ""
	partnerID = ""
	syncTime = undefined
	userID = ""

	constructor(...a) {
		super();
		if (!this.partnerAuthToken || !this.partnerID) {
			this.partnerLogin();
		}
	}
	async login(username, pw) {
		if (!this.partnerAuthToken || !this.partnerID) {
			await this.partnerLogin();
		}
		console.log(await this.sendReq('auth.userLogin', {
			loginType: "user",
			username: username,
			password: pw,	
			partnerAuthToken: this.partnerAuthToken,
			includeStationArtUrl: true,
			returnStationList: true,
			returnGenreStations: true,
			includePandoraOneInfo: true,
			includeAdAttributes: true
		}, true))

	}
	getStations() {

	}
	getHistory() {

	}
	async partnerLogin(level=0) {

		let a = await this.sendReq('auth.partnerLogin', {
			'username': 'android',
			'password': 'AC7IBG09A3DTSYM4R41UJWL07VLN8JI7',
			'deviceModel': 'android-generic',
			'version': '5'
		});
		if (a.stat !== "ok") {
			this.ok = false;
			if (level<3) {
				this.partnerLogin(level+1);
			} else {
				throw "After three retries, authentication request has failed."
			}
			return;
		}
		// @ts-ignore
		if (!blowfish) {
			this.ok = false;
			throw "Blowfish library not loaded.";
		}
		let c = a.result;
		// @ts-ignore
		let d = blowfish.decrypt(c.syncTime, 'R=U!LH$O2B#', {cipherMode: 0, outputType: 1});

		this.syncTime = Date.now() - Number(d * 1000);
		this.partnerID = c.partnerId;
		this.partnerAuthToken = c.partnerAuthToken;
	}
	async sendReq(method, data, encrypt=false) {
		if (this.authToken) {
			data.userAuthToken = data.auth_token || this.authToken;
		}
		if (this.syncTime) {
			data.syncTime = Date.now() + this.syncTime;
		}
		
		if (encrypt) {
			//@ts-ignore
			data = blowfish.encrypt(JSON.stringify(data),
			'6#26FRL$ZWD',
			{cipherMode: 0, outputType: 1});
		}
		let req = await fetch(
			'https://tuner.pandora.com/services/json/?method=' + method +
			(this.authToken?"&auth_token="+this.authToken:"") +
			(this.partnerID?"&partner_id="+this.partnerID:"") +
			(this.userID?"&user_Id="+this.userID:""), {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		let b = await req.json();
		return b;
	}
}

class PandoraSong  extends Song {
	rating = "unrated"
	albumCover = undefined
	title = ""
	albumTitle = ""
	artist = ""
	songUrl = ""


	constructor() {
		super();
	}
	like() {

	}
	dislike() {

	}
	download() {

	}
}

class PandoraStation extends Station {
	latestCover = undefined;

	constructor() {
		super();
	}
	play() {

	}
}