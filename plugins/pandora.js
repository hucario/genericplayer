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
	partnerID = ""
	syncTime = undefined
	userID = ""
	partnerAuthToken = ""
	userAuthToken = ""

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
			"loginType": "user",
			"username": username,
			"password": pw,
			"partnerAuthToken": this.partnerAuthToken
		}, true))

	}
	getStations() {

	}
	getHistory() {

	}
	async partnerLogin(level=0) {

		this.syncStart = Math.floor(Date.now()/1000)
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
		let c = a.result;
		let d = decrypt(c.syncTime).toString().substring(4);

		this.syncTime = parseInt(d);
		this.partnerID = c.partnerId;
		this.partnerAuthToken = c.partnerAuthToken;
	}
	async sendReq(method, data, encryptthis=false) {
		if (this.userAuthToken) {
			data.auth_token = data.auth_token || this.userAuthToken;
		}
		if (typeof this.syncTime !== "undefined") {
			data.syncTime = this.syncTime + (Math.floor(Date.now() / 1000) - this.syncStart);
		}
		let queryString = '' 
		if (this.userAuthToken || this.partnerAuthToken) {
			queryString += '&auth_token=';
			if (this.userAuthToken) {
				queryString += encodeURIComponent(this.userAuthToken);
			} else {
				queryString += encodeURIComponent(this.partnerAuthToken);
			}
		}
		if (this.partnerID) {
			queryString += '&partner_id=' + encodeURIComponent(this.partnerID);
		}
		if (this.userID) {
			queryString += '&user_id=' + encodeURIComponent(this.userID);
		}
		console.log(data, method + queryString);
		
		if (encryptthis) {
			data = encrypt(JSON.stringify(data));
		}
		console.log(data);
		let req = await fetch(
			'https://tuner.pandora.com/services/json/?method=' + method + queryString, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': (encryptthis?'text/plain':'application/json')
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

let a = new PandoraExtension();