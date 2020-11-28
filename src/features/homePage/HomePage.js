import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const HomePage = (props) => {
	return (
		<React.Fragment>
			<h1>home page</h1>
			<RouterLink to="/onboarding">Onboard!!!</RouterLink>
		</React.Fragment>
	)
}
