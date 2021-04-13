import React, {
	useState,
	useEffect
} from 'react'
import { Helmet } from 'react-helmet'
export default function NotFoundPage() {
	return (<>
			<Helmet>
				<title>GenericPlayer</title>
			</Helmet>
			<h1>Sorry, we couldn't find that page.</h1>
		</>)
}