let inDev = true;
let loggedIn = true;
let pageOn = (loggedIn?1:3);
let settings = {
	historyListView: true
}

function updateRating(songId, newRating) { // placeholder function for now

	return;
}

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