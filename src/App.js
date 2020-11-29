import React from 'react';
import logo from './logo.svg';
import { Button, AppBar, Toolbar } from '@material-ui/core';

import { OnboardingForm } from './features/onboardingForm/OnboardingForm';
import { HomePage } from './features/homePage/HomePage';
import { Dashboard } from './features/dashboard/Dashboard';

import { 
	BrowserRouter as Router,
	Link as RouterLink,
	Switch,
	Route,
} from 'react-router-dom';
import './App.css';

function App() {
  return (
	  <Router>
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<Button component={RouterLink} to="/onboarding" color="inherit">Sign up</Button>
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

		</div>
	  </Router>
  );
}

export default App;
