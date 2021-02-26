import React, {
	useState
} from 'react';
import settingsProvider from '../../settingsProvider'
import sty from './bottombar.module.css'
export default function BottomBar() {
	const [state, setState] = useState({});
	return (
		<section className={sty.bar}>
			<img 
				src="https://is2-ssl.mzstatic.com/image/thumb/Music118/v4/24/46/97/24469731-f56f-29f6-67bd-53438f59ebcb/source/512x512bb.jpg"
				className={sty.albImg}
				alt="Album cover for Barenaked Ladies: Week One"
			/>
		</section>
	)
}