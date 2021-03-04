import React, {
	useEffect,
	useState
} from 'react'

import sty from './stations.module.css'
import Accordion from '../../components/accordion/accordion'

const sampleData = [
	{
		name: 'Recents',
		items: [{
			sauce: {
				color: {
//					normal: '#ff000024',
//					hover: '#ff00004d'
					normal: '#630a0a',
					hover: '#ad2727'
				},
				icon: '/yt.png'
			},
//			name: 'Uploads',
			name: 'In Between Dreams',
			sub: 'Jack Johnson',
			link: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
//			thumb: 'https://i.ytimg.com/vi/NvcasLaeB_s/hqdefault.jpg'
			thumb: 'https://i.scdn.co/image/ab67616d00001e0206b42768ebe736eec21336ea'
		},
		{
			sauce: {
				color: {
					normal: '#234d2d',
					hover: '#2a8349'
				},
				icon: '/spotify.png'
			},
			name: 'Curious George',
			sub: 'Jack Johnson',
			link: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
			thumb: 'https://i.scdn.co/image/ab67616d00001e021e0232d637e8313d3ef4923e'
		},
		{
			sauce: {
				color: {
					normal: '#862331',
					hover: '#9c3140'
				},
				icon: '/apple.svg'
			},
			name: 'On And On',
			sub: 'Jack Johnson',
			link: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
			thumb: 'https://i.scdn.co/image/ab67616d00001e024a25251f8c645064ebdec45b'
		},
		{
			sauce: {
				color: {
					normal: '#342ac0',
					hover: '#1659a5'
				},
				icon: '/pandora.png'
			},
			name: 'Breakdown Radio',
			sub: 'Jack Johnson',
			link: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
			thumb: 'https://i.scdn.co/image/ab67616d00001e0206b42768ebe736eec21336ea'
		}
		]
	},
	{
		name: 'Another Mockup Category',
		items: [
		{
			sauce: {
				color: {
					normal: '#234d2d',
					hover: '#2a8349'
				},
				icon: '/spotify.png'
			},
			name: 'Curious George',
			sub: 'Jack Johnson',
			link: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
			thumb: 'https://i.scdn.co/image/ab67616d00001e021e0232d637e8313d3ef4923e'
		},{
			sauce: {
				color: {
//					normal: '#ff000024',
//					hover: '#ff00004d'
					normal: '#630a0a',
					hover: '#ad2727'
				},
				icon: '/yt.png'
			},
//			name: 'Uploads',
			name: 'In Between Dreams',
			sub: 'Jack Johnson',
			link: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
//			thumb: 'https://i.ytimg.com/vi/NvcasLaeB_s/hqdefault.jpg'
			thumb: 'https://i.scdn.co/image/ab67616d00001e0206b42768ebe736eec21336ea'
		},
		{
			sauce: {
				color: {
					normal: '#342ac0',
					hover: '#1659a5'
				},
				icon: '/pandora.png'
			},
			name: 'Breakdown Radio',
			sub: 'Jack Johnson',
			link: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
			thumb: 'https://i.scdn.co/image/ab67616d00001e0206b42768ebe736eec21336ea'
		},
		{
			sauce: {
				color: {
					normal: '#862331',
					hover: '#9c3140'
				},
				icon: '/apple.svg'
			},
			name: 'On And On',
			sub: 'Jack Johnson',
			link: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
			thumb: 'https://i.scdn.co/image/ab67616d00001e024a25251f8c645064ebdec45b'
		}
		]
	}
]

export default function StationsPage() {
	// eslint-disable-next-line
	const [data, setData] = useState(sampleData)
	let elems = []
	data.forEach(station => {
		let tElems = [];
		station.items.forEach(item => {
			tElems.push(<>
				<div className={sty.station} style={{
					"--bg": item.sauce.color.normal ?? 'black',
					"--bghover": item.sauce.color.hover ?? item.sauce.color.normal ?? 'black'
				}}>
					<div className={sty.stationInner}>
						<div className={sty.imgHolder}>
							<img src={item.sauce.icon} alt="" className={sty.sauceindicator} />
							<img src={item.thumb} className={sty.staticon} alt=""/>
							<button className={'bx bx-play '+sty.play} />
						</div>
						<div class={sty.infoHolder}>
							<a className={sty.h1} title={item.name} href=".">{item.name}</a>
							<a className={sty.sub} title={item.sub} href=".">{item.sub}</a>
						</div>
					</div>
				</div>
			</>)
		})
		elems.push(<>
		<Accordion
			header={<span className={sty.grouphead}>{station.name}</span>}
			openLevel={0}
		>{tElems}</Accordion>
		</>)
	})
	useEffect(() => {
		document.getElementById('main')?.classList.add(sty.main);
	});
	return (<>
		{elems}
	</>)
}