import React, {
	useState
} from 'react'

import sty from './stations.module.css'

const sampleData = [
	{
		name: 'Recents',
		items: [{
			sauce: {
				color: {
					normal: '#ff000033',
					hover: '#ff00004d'
				},
				icon: '/yt.png'
			},
			name: 'Uploads',
			sub: 'Jack Johnson',
			link: 'https://www.youtube.com/playlist?list=UUGtoY2YzP_nP54-aRK8s7VA',
			thumb: 'https://i.ytimg.com/vi/NvcasLaeB_s/hqdefault.jpg'
		}]
	}
]

export default function StationsPage() {
	// eslint-disable-next-line
	const [data, setData] = useState(sampleData)
	let elems = []
	data.forEach(station => {
		station.items.forEach(item => {
			elems.push(<>
				<div className={sty.station} style={{
					"--bg": item.sauce.color.normal,
					"--bghover": item.sauce.color.hover
				}}>
					<div className={sty.imgHolder}>
						<img src={item.sauce.icon} alt="" className={sty.sauceindicator} />
						<img src={item.thumb} className={sty.staticon} alt=""/>
						<button className={'bx bx-play '+sty.play} />
					</div>
					<h1 className={sty.h1} title={item.name}>{item.name}</h1>
					<h2 className={sty.sub} title={item.sub}>{item.sub}</h2>
				</div>
			</>)
		})
	})
	return (<>
		{elems}
	</>)
}