import React from 'react';
import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
import { Button } from '@material-ui/core';

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
