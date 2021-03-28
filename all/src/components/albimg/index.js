/* eslint-disable jsx-a11y/alt-text */
import sty from'./albimg.module.css'
import React from 'react'

export default React.forwardRef(function AlbumImage(props, ref) {
	const [err, errored] = React.useState(false);

	const { src, innerClassName, className } = props;
	const restProps = Object.assign({}, props);
	for (let key in restProps) {
		if (['className', 'onLoad', 'innerClassName', 'src', 'onError'].includes(key)) {
			delete restProps[key];
		}
	}

	return (<div className={sty.wrap + (err?' '+sty.failed:'') + (className ? ' ' + className : '')}>
		<img
			ref={ref}
			className={sty.inner + (innerClassName ? ' ' + innerClassName : '')}
			src={src} 
			onError={(e) => {
				props.onError && props.onError(e);
				errored(true);
			}}
			onLoad={(e) => {
				props.onLoad && props.onLoad(e);
				errored(false);
			}}


			{...restProps}
			
		/>
		<img className={sty.fallback} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=' />
	</div>)
});