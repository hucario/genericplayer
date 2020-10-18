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

function whyprompt() {
    alert(`Ultimately you can't really, I could probably stuff "TIPS AND TRICKS" in there to steal your info.
However, there are several reasons why it would be less probable that I'd try to steal your stuff:
1. Extensions go through a """thorough""" and """completely secure""" (not thorough, barely does anything, wildly inconsistent) vetting process before they go on the Chrome Web Store / Firefox Addons Store. Nothing bad could P O S S I B L Y get through that impassable filter.
2. Because the code is open-source, you can see everywhere I handle your login details.
3. Why would I care about collecting Pandora credentials lmao, they're literally useless unless you have Pandora One or something, and even then who cares. (I mean I could try password stuffing in which case the credentials would be pretty useful but I'm not in the game for that, I made this because I wanted to make this)
4. Yeah I don't have another point but I wanted it to look like I have more than three points`);
}