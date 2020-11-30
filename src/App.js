import React from 'react';
import logo from './logo.svg';
import { Button, AppBar, Toolbar } from '@material-ui/core';

import { OnboardingForm } from './features/onboardingForm/OnboardingForm';
import { HomePage } from './features/homePage/HomePage';
import { Dashboard } from './features/dashboard/Dashboard';

import { makeStyles } from '@material-ui/core/styles';

import { 
	BrowserRouter as Router,
	Link as RouterLink,
	Switch,
	Route,
} from 'react-router-dom';
import './App.css';

const useStyles = makeStyles({
	root: {
		background: 'rgb(40, 40, 40)',
	},
});

function App() {

	const navClasses = useStyles();

  	return (
		<Router>
			<div className="App">
				<AppBar
					classes={{
						root: navClasses.root,
					}}
					position="static">
					<Toolbar>
						{/*Need to update navbar to create a dashboard link if user is "logged in". Need to update redux store to account for user state. Also need home link. See if you have time to add that.*/}
						<Button 
							component={RouterLink} 
							to="/onboarding" 
							color="inherit">Sign up</Button>
					</Toolbar>
				</AppBar>
				<Switch>
					<Route path="/onboarding">
						<OnboardingForm />
					</Route>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>

			{/*Move the footer from the home page component and put it here. No reason not to have it across all pages.*/}
		</div>
	  </Router>
  );
}

export default App;
