'use strict'

listgrid.checked = settings.historyListView;
/* Elements */
let hul = gebid("history");
let listbutton = gebid("listgrid");

listbutton.addEventListener('click', () => {
	gebid("recents").classList.toggle('gridmode');
})

gebid("pop").addEventListener('click', () => {
	for (let i = 0; i < prevSongs.length; i++) {
		let tHI = prevSongs[i]; // this history item
		
		tHI.id = Math.floor(Math.random()*1000000); // placeholder for now

		tHI.elems = {}
		tHI.elems.main = document.createElement('li');
		tHI.elems.main.classList.add('hI'); //historyItem
		tHI.elems.img = document.createElement('img');
		tHI.elems.img.src = prevSongs[i].cover;

		let a = tHI.name.split(' ');
		let b = "";
		a.forEach((e) => {
			b += e[0].toUpperCase() + ' ';
		})
		tHI.elems.img.alt = b;

		tHI.elems.main.appendChild(tHI.elems.img);
		tHI.elems.containerOne = document.createElement('div');
		tHI.elems.containerOne.classList.add('historyAaa'); // class name is a product of me being tired and coding
		tHI.elems.main.appendChild(tHI.elems.containerOne);
		tHI.elems.historyName = document.createElement('span');
		tHI.elems.historyName.innerText = tHI.name;
		tHI.elems.historyName.classList.add('historyName');
		tHI.elems.containerOne.appendChild(tHI.elems.historyName);
		tHI.elems.albumName = document.createElement('span');
		tHI.elems.albumName.innerText = tHI.album;
		tHI.elems.containerOne.appendChild(tHI.elems.albumName);
		tHI.elems.artist = document.createElement('span');
		tHI.elems.artist.innerText = tHI.artist;
		tHI.elems.containerOne.appendChild(tHI.elems.artist);
		tHI.elems.containerTwo = document.createElement('div');
		tHI.elems.containerTwo.classList.add('historyButtons'); //yea
		tHI.elems.containerOne.appendChild(tHI.elems.containerTwo);
		tHI.elems.like =  document.createElement('button');
		tHI.elems.like.classList.add('bx');
		tHI.elems.like.classList.add(tHI.rating == 'liked'?'bxs-like':'bx-like');
		tHI.elems.containerTwo.appendChild(tHI.elems.like);
		tHI.elems.like.addEventListener('click', () => {
			if (tHI.rating == 'liked') {
				updateRating(tHI.id, 'unrated');
				tHI.rating = 'unrated';
				tHI.elems.like.classList.remove('bxs-like');
				tHI.elems.dislike.classList.remove('bxs-dislike');
				tHI.elems.like.classList.add('bx-like');
				tHI.elems.dislike.classList.add('bx-dislike');
				return;
			};
			updateRating(tHI.id, 'liked')

			//because updateRating is a placeholder right now I'm just going to
			tHI.rating = 'liked';

			tHI.elems.dislike.classList.remove('bxs-dislike'); // won't throw an error if its not there so really might as well
			tHI.elems.dislike.classList.add('bx-dislike');
			tHI.elems.like.classList.remove('bx-like');
			tHI.elems.like.classList.add('bxs-like');
		})
		tHI.elems.download = document.createElement('button');
		tHI.elems.download.classList.add('bx');
		tHI.elems.download.classList.add('bxs-download');
		tHI.elems.containerTwo.appendChild(tHI.elems.download);
		tHI.elems.download.addEventListener('click', () => {
			alert('insert download placeholder here');
		})
		tHI.elems.dislike = document.createElement('button');
		tHI.elems.dislike.classList.add('bx');
		tHI.elems.dislike.classList.add(tHI.rating == 'disliked'?'bxs-dislike':'bx-dislike');
		tHI.elems.containerTwo.appendChild(tHI.elems.dislike);
		tHI.elems.dislike.addEventListener('click', () => {
			
			if (tHI.rating == 'disliked') {
				updateRating(tHI.id, 'unrated');
				tHI.rating = 'unrated';
				tHI.elems.like.classList.remove('bxs-like');
				tHI.elems.dislike.classList.remove('bxs-dislike');
				tHI.elems.like.classList.add('bx-like');
				tHI.elems.dislike.classList.add('bx-dislike');
				return;
			};

			updateRating(tHI.id, 'disliked')

			// TODO: Make this irrelevant and then delete it
			tHI.rating = 'disliked';

			tHI.elems.dislike.classList.remove('bx-dislike');
			tHI.elems.dislike.classList.add('bxs-dislike');
			tHI.elems.like.classList.remove('bxs-like');
			tHI.elems.like.classList.add('bx-like');
		})
		hul.appendChild(tHI.elems.main);
	}
})
if (!inDev) {
	gebid("devtools").style.display = "none";
} else {
	// To test responsive design :chinfish:
	let varyWidth = false,
		varyHeight = false,
		vwamount = 150,
		vhamount = 150,
		vwdir = 1,
		vhdir = 1;
	gebid("vw").addEventListener('click', () => {
		varyWidth = !varyWidth;
		gebid("vw").innerText = (varyWidth?"Stop varying width":"Vary width");
		slideElem.style.transition = (varyWidth?"unset":"");
	})
	gebid("vh").addEventListener('click', () => {
		varyHeight = !varyHeight;
		gebid("vh").innerText = (varyHeight?"Stop varying height":"Vary height");
	})
	setInterval(() => {
		if (varyHeight) {
			if (vhdir == 1 && vhamount > 800) {
				vhdir = 0;
			} 
			if (vhdir == 0 && vhamount < 150) {
				vhdir = 1;
			}
			vhamount += (vhdir==1?1:-1);
			document.documentElement.style.setProperty("--height", vhamount + "px");
		}
		if (varyWidth) {
			if (vwdir == 1 && vwamount > 800) {
				vwdir = 0;
			} 
			if (vwdir == 0 && vwamount < 150) {
				vwdir = 1;
			}
			vwamount += (vwdir==1?1:-1);
			document.documentElement.style.setProperty("--width", vwamount + "px");
		}
	})
}

gebid("loginButton").addEventListener('click',(e) => {
	e.preventDefault();
	if (inDev) {
		alert('yea im just going to assume thats correct');
		loggedIn = true;
		goleft.click();
		goleft.click();
		return;
	}
	return false;
})

gebid("butwhytho").addEventListener('click', (e) => {
	e.preventDefault();
	gebid('loginExplanation').style.bottom = "0px";
});

gebid('closeExp').addEventListener('click', (e) => {
	e.preventDefault(e);
	gebid('loginExplanation').style.bottom = "var(--height)";
})