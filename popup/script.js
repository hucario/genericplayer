'use strict'

listgrid.checked = settings('historyListView');
/* Elements */
let hul = gebid("history");
let listbutton = gebid("listgrid");

listbutton.addEventListener('click', () => {
	gebid("recents").classList.toggle('gridmode');
	settings('historyListView', !settings('historyListView'));
})

gebid("pop").addEventListener('click', () => {
	
let prevSongs = [
	{
		name: "No Cover Bois",
		album: "No Cover Bois (Single)",
		artist: "a No Cover boi",
		cover: "",
		rating: "unrated"
	},
	{
		name: 'Under Pressure',
		album: 'Best of Bowie',
		artist: 'David Bowie',
		cover: './sample/best_of_bowie.jpg',
		rating: 'liked'
	},
	{
		name: 'Linus & Lucy',
		album: 'A Charlie Brown Christmas',
		artist: 'Vince Geraldi Trio',
		cover: './sample/charlie_brown.jpg',
		rating: 'liked',
	},
	{
		name: 'September',
		album: 'Greatest Hits',
		artist: 'Earth, Wind & Fire',
		cover: './sample/greatest_hits.jpg',
		rating: 'unrated'
	},
	{
		name: 'Johnny B. Goode',
		album: 'Johnny B. Goode Sessions',
		artist: 'Chuck Berry',
		cover: './sample/johnny_b_goode.jpg',
		rating: 'disliked' // I'm sorry johnny b goode but I need samples
	},
	{
		name: 'Paradise',
		album: 'Paradise (Single)',
		artist: 'Coldplay',
		cover: './sample/paradise.jpg',
		rating: 'disliked'
	},
	{
		name: 'What I Like About You',
		album: 'What I Like About You (And Other Romantic Hits)',
		artist: 'The Romantics',
		cover: './sample/romantics.jpg',
		rating: 'unrated',
	},
	{
		name: 'All Star',
		album: 'All Star Smash Hits',
		artist: 'Smash Mouth',
		cover: './sample/smash_hits.jpg',
		rating: 'liked'
	},
	{
		name: 'Step Out',
		album: 'Step Out (From the Secret Life of Walter Mitty)',
		artist: 'Jose Gonzales',
		cover: './sample/step_out.jpg',
		rating: 'unrated'
	},
	{
		name: 'You Are The Sunshine of My Life',
		album: 'Number Ones',
		artist: 'Stevie Wonder',
		cover: './sample/stevie_wonder.jpg',
		rating: 'liked'
	},
	{
		name: 'Stars',
		album: 'say i am you',
		artist: 'The Weepies',
		cover: './sample/the_weepies.jpg',
		rating: 'unrated'
	},
	{
		name: 'RE: Your Brains',
		album: 'Thing A Week Two',
		artist: 'Jonathan Coulton',
		cover: './sample/thing_a_week_two.jpg',
		rating: 'disliked'
	},
	{
		name: 'Something or idk im tired',
		album: 'Hello San Fransisco',
		artist: 'Train',
		cover: './sample/train.jpg',
		rating: 'disliked'
	},
	{
		name: 'Viva La Vida',
		album: 'Viva La Vida',
		artist: 'Coldplay',
		cover: './sample/viva_la_vida.jpg',
		rating: 'unrated'
	}
]

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
if (!settings('inDev')) {
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

gebid("loginButton").addEventListener('click', (e) => {
	e.preventDefault();
	if (settings('inDev')) {
		alert('yea im just going to assume thats correct');
		settings('loggedIn', true)
		goleft.click();
		goleft.click();
		return;
	}
	// @ts-expect-error (doesn't like .value)
	let worked = settings('activeExtension').login(gebid('email').value, gebid('pw').value);
	if (worked) {
		settings('activeExtension').getStations();
		settings('loggedIn', true);
		pageOn = 2;
		goleft.click();

	}
	return false;
})

if (settings('loggedIn')) {

}

gebid("butwhytho").addEventListener('click', (e) => {
	e.preventDefault();
	gebid('loginExplanation').style.bottom = "0px";
});

gebid('closeExp').addEventListener('click', (e) => {
	e.preventDefault();
	gebid('loginExplanation').style.bottom = "var(--height)";
})