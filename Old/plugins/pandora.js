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
		if  (!localStorage.pandora) {
			localStorage.pandora = {};
		}
		if (localStorage.pandora.password && localStorage.pandora.username) {
			this.login(localStorage.pandora.username, localStorage.pandora.password);
		}
	}
	async login(username, pw) {
		if (!this.partnerAuthToken || !this.partnerID) {
			await this.partnerLogin();
		}
		let res = await this.sendReq('auth.userLogin', {
			"loginType": "user",
			"username": username,
			"password": pw,
			"partnerAuthToken": this.partnerAuthToken
		}, true)
		if (res.stat == "fail") {
			if (res.code == 1002) {
				if (localStorage.pandora.username == username && localStorage.pandora.password == pw) {
					localStorage.pandora.username = localStorage.pandora.password = "";
				}
				throw "Incorrect username or password."
			}
			throw "An unexpected error occurred.";
		}
		this.userAuthToken = res.result.userAuthToken;
		this.userID = res.result.userId;
		localStorage.pandoraUsername = username;
		localStorage.pandoraPassword = pw;
		return res.stat!=='fail';
	}
	async getStations() {
		if (!this.userAuthToken) {
			throw "User is not logged in.";
		}
		let res = await this.sendReq('user.getStationList', {
			includeExplanations: true,
			includeStationArtUrl: true,
			userAuthToken: this.userAuthToken
		}, true)
		return res;
	}
	getHistory() {

	}
	getSyncTime() {
		return this.syncTime + (Math.floor(Date.now() / 1000) - this.syncStart);
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
		// @ts-ignore
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
			// @ts-ignore
			data = encrypt(JSON.stringify(data));
		} else {
			data = JSON.stringify(data);
		}
		console.log(data);
		let req = await fetch(
			'https://tuner.pandora.com/services/json/?method=' + method + queryString, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': (encryptthis?'text/plain':'application/json'),
				"accept": "application/json, text/javascript, */*; q=0.01",
				"accept-language": "en-US,en;q=0.9",
				"referrerPolicy": "strict-origin-when-cross-origin",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "none"
			},
			body: data
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