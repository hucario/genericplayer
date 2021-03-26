import React, {
	useState
} from 'react'
import sty from './accordion.module.css'

export default function Accordion(props) {
	const [openLevel, setOpenLevel] = useState(props.openLevel ?? 1);

	const [isPeeking, setPeek] = useState(false);

	const [ref] = useState(React.createRef());
	const [outerRef] = useState(React.createRef());


	const direction = (props.direction && props.direction === 'horizontal'?'horizontal':'vertical')

	const asdf = {}
	for (let key in props) {
		if (!(key === "openLevel" || key === "className" || key === "children" || key === "header" || key === "direction")) {
			asdf[key] = props[key]
		}
	}

	return (<>
		<div ref={outerRef} className={
				(props.className?props.className:'') + 
				sty.accordion + ' ' + 
				sty[openLevel>0?'open':'closed'] + 
				(props.direction && props.direction === 'horizontal'?' ' + sty.horizontal:'')
			} {...asdf} >
			<div className={sty.accHeaderHolder}>
				<h1 className={sty.accHeader}>{props.header ?? 'What\'s the deal with airline food?'}</h1>
				<div className={sty.spacer} />
				<button className={'bx bxs-chevron-' + (direction === 'horizontal'?'left':'down')} onClick={() => {
					if (direction === 'vertical' && (ref.current.offsetHeight < ref.current.scrollHeight)) {
						setOpenLevel(Math.max(openLevel + 1, 0));
					}
					if (direction === 'horizontal' && (openLevel > 0)) {
						setOpenLevel(Math.max(openLevel - 1, 0))
					}
				}}
				onMouseOver={() => {
					setPeek(true);
				}}
				onMouseLeave={() => {
					setPeek(false);
				}}
				/>
				<button className={'bx bxs-chevron-' + (direction === 'horizontal'?'right':'up')} onClick={() => {
					if (direction === 'vertical' && (openLevel > 0)) {
						setOpenLevel(Math.max(openLevel - 1, 0))
					}
					if (direction === 'horizontal' && (outerRef.current.clientWidth < outerRef.current.scrollWidth)) {
						setOpenLevel(Math.max(openLevel + 1, 0));
					}
				}} />
			</div>
			<div ref={ref} className={sty.accInner + (isPeeking?' '+sty.peek:'')} style={{
				maxHeight: (direction === 'vertical'?'calc((' + (openLevel) + ' * (305px + 2rem)) - 2rem)' : undefined),
				transform: (direction === 'horizontal'? 'translateX(calc(-1 * (' + (openLevel) + ' * (226px + 2rem)))' : undefined)
			}}>
				{props.children}
			</div>
		</div>
	</>)
}