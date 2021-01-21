
// @ts-ignore
var settings = chrome.extension.getBackgroundPage().settings


function gebid(id) {
	return document.getElementById(id);
}
let pageOn = localStorage.pageOn || settings('pageOn') ||  (settings('loggedIn')?1:3);
settings('pageOn', pageOn)
let slideElem = gebid('slider');
slideElem.style.right = `calc(var(--width)*${pageOn})`;

if (!settings('loggedIn')) {
	gebid('goleft').style.display = 'none';
	gebid('goright').style.display = 'none';
}
let goleft = gebid('goleft'),
	goright = gebid('goright');

if (pageOn > 0) {
	goleft.style.display = "hidden";
} else if (pageOn < 2) {
	goright.style.display = "hidden";
}

goleft.addEventListener('click', (e) => {
	if (pageOn<1) return;
	if (pageOn<3) {
		goright.style.display = "block";
		goright.style.opacity = "1";
	}
	pageOn -= 1;
	slideElem.style.right = `calc(var(--width)*${pageOn})`
	if (pageOn == 0) {
		goleft.style.opacity = "0";
		setTimeout(() => {
			if (pageOn == 0) {
				goleft.style.display = "none";
			}
		}, 250);
	}
})
// 0: history, 1: player, 2: stations, 3: login
goright.addEventListener('click', (e) => {
	if (pageOn==2) return;
	pageOn += 1;
	if (pageOn>0) {
		goleft.style.display = "block";
		goleft.style.opacity = "1";
	}
	slideElem.style.right = `calc(var(--width)*${pageOn})`
	if (pageOn >= 2) {
		goright.style.opacity = "0";
		setTimeout(() => {
			if (pageOn == 2) {
				goright.style.display = "none";
			}
		}, 250);
	}
})