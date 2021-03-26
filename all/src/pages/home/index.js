import React, {
} from 'react'
import { Helmet } from 'react-helmet'

import Accordion from '../../components/accordion/'
export default function HomePage() {
	return (<>
		<Helmet>
			<title>Home - GenericPlayer</title>
		</Helmet>
		<Accordion
			header="Live reload test 2"
			children={[<h2>or something<br /></h2>]}
		/>
		</>)
}