import React, {
	useState
} from 'react'
import sty from './accordion.module.css'

export default function Accordion(props) {
	const [openLevel, setOpenLevel] = useState(props.openLevel ?? false);
	return (<>
		<div className={(props.className?props.className:'') + sty.accordion + ' ' + sty[openLevel>0?'open':'closed']}>
			<div className={sty.accHeaderHolder}>
				<h1 className={sty.accHeader}>{props.header ?? 'What\'s the deal with airline food?'}</h1>
				<div className={sty.spacer} />
				<button className={'bx bxs-chevron-down '+ sty.downButton} />
				<button className={'bx bxs-chevron-up ' + sty.upButton} />
			</div>
			<div className={sty.accInner}>
				{props.children}
			</div>
		</div>
	</>)
}