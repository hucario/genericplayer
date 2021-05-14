import React, {
	useState
} from 'react'

import sty from './stations.module.css'
import Accordion from '../../components/accordion/'
import Station from '../../components/album/'

import {
	Album,
	Extension,
	Artist
} from '../../ext/Extension'
import { Helmet } from 'react-helmet'

const ytExt = new Extension({
	colors: {
		normal: '#630a0a',
		hover: '#ad2727'
	},
	icon: '/yt.png'
});
const spotExt = new Extension({
	colors: {
		normal: '#234d2d',
		hover: '#2a8349'
	},
	icon: '/spotify.png'
})
const appleExt = new Extension({
	colors: {
		normal: '#862331',
		hover: '#9c3140'
	},
	icon: '/apple.svg'
})
const pandoraExt = new Extension({
	colors: {
		normal: '#342ac0',
		hover: '#1659a5'
	},
	icon: '/pandora.png'
})
const sampleData = [
	{
		name: 'Recents',
		items: [
			new Album({
				extension: ytExt,
				artist: new Artist({
					name: "Jack Johnson"
				}),
				title: 'In Between Dreams',
				url: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
				icon: 'https://i.scdn.co/image/ab67616d00001e0206b42768ebe736eec21336ea'
			}),
			new Album({
				extension: spotExt,
				artist: new Artist({
					name: "Jack Johnson"
				}),
				title: 'Curious George',
				url: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
				icon: 'https://i.scdn.co/image/ab67616d00001e021e0232d637e8313d3ef4923e'
			}),
			new Album({
				extension: appleExt,
				artist: new Artist({
					name: "Jack Johnson"
				}),
				title: 'On And On',
				url: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
				icon: 'https://i.scdn.co/image/ab67616d00001e024a25251f8c645064ebdec45b'
			}),
			new Album({
				extension: pandoraExt,
				artist: new Artist({
					name: "Jack Johnson"
				}),
				title: 'Breakdown Radio',
				url: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
				icon: 'https://i.scdn.co/image/ab67616d00001e0206b42768ebe736eec21336ea'
			})
		]
	},
	{
		name: 'Another Mockup Category',
		items: [
			new Album({
				extension: spotExt,
				artist: new Artist({
					name: "Jack Johnson"
				}),
				title: 'Curious George',
				url: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
				icon: 'https://i.scdn.co/image/ab67616d00001e021e0232d637e8313d3ef4923e'
			}),
			new Album({
				extension: pandoraExt,
				artist: new Artist({
					name: "Jack Johnson"
				}),
				title: 'Breakdown Radio',
				url: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
				icon: 'https://i.scdn.co/image/ab67616d00001e0206b42768ebe736eec21336ea'
			}),
			new Album({
				extension: appleExt,
				artist: new Artist({
					name: "Jack Johnson"
				}),
				title: 'On And On',
				url: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
				icon: 'https://i.scdn.co/image/ab67616d00001e024a25251f8c645064ebdec45b'
			}),
			new Album({
				extension: ytExt,
				artist: new Artist({
					name: "Jack Johnson"
				}),
				title: 'In Between Dreams',
				url: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
				icon: 'https://i.scdn.co/image/ab67616d00001e0206b42768ebe736eec21336ea'
			})
		]
	}
]

export default function StationsPage() {
	// eslint-disable-next-line
	const [data, setData] = useState(sampleData)
	let elems = []
	data.forEach((station, i) => {
		let tElems = [];
		station.items.forEach((item,ii) => {
			tElems.push(
				<Station sauce={item} key={ii} />
			)
		})
		elems.push(
			<Accordion
				header={<span className={sty.grouphead}>{station.name}</span>}
				openLevel={1}
				key={i}
			>{tElems}</Accordion>
		)
	})
	return (<>
		<Helmet>
			<title>My Stations - GenericPlayer</title>
			<style>{`#main {
				padding: 2rem;
			}`}</style>
		</Helmet>
		{elems}
	</>)
}